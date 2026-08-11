import { google } from "googleapis";

// Spreadsheet ID — set this after creating your Google Sheet
const SPREADSHEET_ID = process.env.SPREADSHEET_ID || "YOUR_SPREADSHEET_ID_HERE";

// Column headers matching the form fields
const HEADERS = [
  "Registration ID",
  "Timestamp",
  "Full Name",
  "Date of Birth",
  "Age",
  "Gender",
  "Phone Number",
  "Residential Address",
  "Parent/Guardian Name",
  "Relationship",
  "Primary Phone",
  "Secondary Phone/WhatsApp",
  "Email Address",
  "Transportation",
  "Has Allergies",
  "Allergy Details",
  "On Medication",
  "Medication Details",
  "Emergency Contact Name",
  "Emergency Contact Relationship",
  "Emergency Contact Phone",
  "Signature Date",
];

/**
 * Initialize the Google Sheets API client with service account credentials
 * @param {Object} credentials - Service account JSON key
 * @returns {Object} Google Sheets API instance
 */
export async function initSheets(credentials) {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

/**
 * Initialize the spreadsheet with headers if empty
 * @param {Object} sheets - Google Sheets API instance
 */
async function ensureHeaders(sheets) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "A1:V1",
    });

    // If headers don't exist, add them
    if (!response.data.values || response.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: "A1",
        valueInputOption: "RAW",
        resource: { values: [HEADERS] },
      });

      // Format header row (bold, frozen, green background)
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        resource: {
          requests: [
            {
              repeatCell: {
                range: { startRowIndex: 0, endRowIndex: 1 },
                cell: {
                  userEnteredFormat: {
                    textFormat: { bold: true, fontSize: 11 },
                    backgroundColor: { red: 0.3, green: 0.74, blue: 0.31 },
                    horizontalAlignment: "CENTER",
                  },
                },
                fields: "userEnteredFormat(textFormat,backgroundColor,horizontalAlignment)",
              },
            },
            {
              updateSheetProperties: {
                properties: {
                  sheetId: 0,
                  gridProperties: { frozenRowCount: 1 },
                },
                fields: "gridProperties.frozenRowCount",
              },
            },
          ],
        },
      });

      console.log("📋 Spreadsheet headers initialized");
    }
  } catch (error) {
    // If sheet doesn't exist, we'll handle it on first write
    console.log("ℹ️  First run — headers will be created on first submission");
  }
}

/**
 * Append a registration row to the spreadsheet
 * @param {Object} sheets - Google Sheets API instance
 * @param {Array} row - Row data array
 */
export async function appendToSheet(sheets, row) {
  // Ensure headers exist on first use
  await ensureHeaders(sheets);

  // Append the row
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "Registrations!A:V",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    resource: {
      values: [row],
    },
  });
}

export { HEADERS, SPREADSHEET_ID };
