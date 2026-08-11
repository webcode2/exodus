import express from 'express'
import cors from 'cors'
import { write, utils } from 'xlsx'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001
const DATA_DIR = join(__dirname, 'data')
const EXCEL_FILE = join(DATA_DIR, 'registrations.xlsx')

// Middleware
app.use(cors())
app.use(express.json())

// Ensure data directory exists
import { mkdirSync } from 'fs'
if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true })
}

// Excel column headers matching form fields
const HEADERS = [
  'Registration ID',
  'Timestamp',
  'Full Name',
  'Date of Birth',
  'Age',
  'Gender',
  'Phone Number',
  'Residential Address',
  'Parent/Guardian Name',
  'Relationship',
  'Primary Phone',
  'Secondary Phone/WhatsApp',
  'Email Address',
  'Transportation',
  'Has Allergies',
  'Allergy Details',
  'On Medication',
  'Medication Details',
  'Emergency Contact Name',
  'Emergency Contact Relationship',
  'Emergency Contact Phone',
  'Signature Date',
]

// Load or create workbook
function getWorkbook() {
  if (existsSync(EXCEL_FILE)) {
    const buf = readFileSync(EXCEL_FILE)
    return read(buf, { type: 'buffer' })
  }
  const wb = utils.book_new()
  const ws = utils.aoa_to_sheet([HEADERS])
  // Set column widths
  ws['!cols'] = HEADERS.map((h, i) => ({
    wch: i === 0 ? 18 : i === 1 ? 22 : i === 6 || i === 10 || i === 11 || i === 18 || i === 20 ? 20 : 25
  }))
  utils.book_append_sheet(wb, ws, 'Registrations')
  return wb
}

// Save workbook
function saveWorkbook(wb) {
  const buf = write(wb, { type: 'buffer', bookType: 'xlsx' })
  writeFileSync(EXCEL_FILE, buf)
}

// Generate registration ID
function generateId() {
  const date = new Date()
  const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`
  const random = Math.floor(Math.random() * 9000 + 1000)
  return `TC26-${dateStr}-${random}`
}

// POST /api/register — save registration to Excel
app.post('/api/register', (req, res) => {
  try {
    const d = req.body
    const row = [
      generateId(),
      new Date().toISOString(),
      d.fullName || '',
      d.dateOfBirth || '',
      d.age || '',
      d.gender || '',
      d.phone || '',
      d.address || '',
      d.parentName || '',
      d.relationship || '',
      d.parentPhone || '',
      d.parentSecondaryPhone || '',
      d.parentEmail || '',
      d.transport === 'bus' ? 'Church Bus' : d.transport === 'private' ? 'Private' : '',
      d.hasAllergies || 'No',
      d.allergyDetails || '',
      d.hasMedication || 'No',
      d.medicationDetails || '',
      d.emergencyName || '',
      d.emergencyRelationship || '',
      d.emergencyPhone || '',
      d.signatureDate || '',
    ]

    const wb = getWorkbook()
    const ws = wb.Sheets[wb.SheetNames[0]]
    const data = utils.sheet_to_json(ws)
    data.push(HEADERS.reduce((obj, h, i) => { obj[h] = row[i]; return obj }, {}))
    const newWs = utils.json_to_sheet(data)
    newWs['!cols'] = ws['!cols']
    wb.Sheets[wb.SheetNames[0]] = newWs
    saveWorkbook(wb)

    console.log(`✅ Registration saved: ${row[0]} — ${row[2]}`)
    res.json({
      success: true,
      registrationId: row[0],
      message: 'Registration saved successfully'
    })
  } catch (error) {
    console.error('❌ Error saving registration:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to save registration. Please try again.'
    })
  }
})

// GET /api/registrations — list all registrations
app.get('/api/registrations', (req, res) => {
  try {
    if (!existsSync(EXCEL_FILE)) {
      return res.json({ success: true, count: 0, data: [] })
    }
    const wb = getWorkbook()
    const ws = wb.Sheets[wb.SheetNames[0]]
    const data = utils.sheet_to_json(ws)
    res.json({ success: true, count: data.length, data })
  } catch (error) {
    console.error('❌ Error reading registrations:', error)
    res.status(500).json({ success: false, message: 'Failed to read registrations' })
  }
})

// GET /api/registrations/export — download Excel file
app.get('/api/registrations/export', (req, res) => {
  try {
    if (!existsSync(EXCEL_FILE)) {
      return res.status(404).json({ message: 'No registrations yet' })
    }
    res.download(EXCEL_FILE, `Teens_Camp_26_Registrations_${new Date().toISOString().split('T')[0]}.xlsx`)
  } catch (error) {
    res.status(500).json({ message: 'Export failed' })
  }
})

app.listen(PORT, () => {
  console.log(`\n🔥 Teens Camp '26 Registration Server`)
  console.log(`   API:       http://localhost:${PORT}/api/register`)
  console.log(`   View:      http://localhost:${PORT}/api/registrations`)
  console.log(`   Export:    http://localhost:${PORT}/api/registrations/export`)
  console.log(`   Excel:     ${EXCEL_FILE}\n`)
})
