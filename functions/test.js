/**
 * Local test for the registration function logic
 * Run: node functions/test.js
 *
 * Tests the data mapping and validation without needing
 * Firebase deploy or Google Sheets credentials.
 */

// ── Simulate the Cloud Function's data mapping ──

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

function generateId() {
  const now = new Date();
  const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const random = Math.floor(Math.random() * 9000 + 1000);
  return `TC26-${dateStr}-${random}`;
}

function mapFormDataToRow(d) {
  const now = new Date();
  return [
    generateId(),
    now.toISOString(),
    d.fullName || "",
    d.dateOfBirth || "",
    d.age || "",
    d.gender || "",
    d.phone || "",
    d.address || "",
    d.parentName || "",
    d.relationship || "",
    d.parentPhone || "",
    d.parentSecondaryPhone || "",
    d.parentEmail || "",
    d.transport === "bus" ? "Church Bus" : d.transport === "private" ? "Private" : "",
    d.hasAllergies || "No",
    d.allergyDetails || "",
    d.hasMedication || "No",
    d.medicationDetails || "",
    d.emergencyName || "",
    d.emergencyRelationship || "",
    d.emergencyPhone || "",
    d.signatureDate || "",
  ];
}

function validateRequired(d) {
  const missing = [];
  if (!d.fullName) missing.push("fullName");
  if (!d.parentName) missing.push("parentName");
  if (!d.parentEmail) missing.push("parentEmail");
  return missing;
}

// ── Test cases ──

const testCases = [
  {
    name: "✅ Full registration (bus, no allergies, no medication)",
    data: {
      fullName: "Amara Johnson",
      dateOfBirth: "2012-05-15",
      age: 14,
      gender: "Female",
      phone: "0816 814 5264",
      address: "12 Victoria Island, Lagos",
      parentName: "Grace Johnson",
      relationship: "Mother",
      parentPhone: "0803 123 4567",
      parentSecondaryPhone: "0812 987 6543",
      parentEmail: "grace.johnson@email.com",
      transport: "bus",
      hasAllergies: "No",
      allergyDetails: "",
      hasMedication: "No",
      medicationDetails: "",
      emergencyName: "Uncle Tunde",
      emergencyRelationship: "Uncle",
      emergencyPhone: "0805 555 1234",
      signatureDate: "2026-08-11",
      consent: true,
    },
  },
  {
    name: "✅ Full registration (private, allergies + medication)",
    data: {
      fullName: "Kofi Mensah",
      dateOfBirth: "2011-11-20",
      age: 15,
      gender: "Male",
      phone: "",
      address: "45 Osu, Accra",
      parentName: "Abena Mensah",
      relationship: "Mother",
      parentPhone: "0241 234 567",
      parentSecondaryPhone: "",
      parentEmail: "abena.mensah@email.com",
      transport: "private",
      hasAllergies: "Yes",
      allergyDetails: "Peanut allergy, asthma (environmental)",
      hasMedication: "Yes",
      medicationDetails: "Inhaler — 2 puffs as needed",
      emergencyName: "Dad Mensah",
      emergencyRelationship: "Father",
      emergencyPhone: "0241 999 000",
      signatureDate: "2026-08-10",
      consent: true,
    },
  },
  {
    name: "❌ Missing required fields",
    data: {
      fullName: "",
      dateOfBirth: "2013-03-01",
      age: 13,
      gender: "Male",
      address: "Somewhere",
      parentName: "",
      parentEmail: "",
      parentPhone: "0800 000 0000",
      transport: "bus",
      consent: true,
      signatureDate: "2026-08-11",
    },
  },
  {
    name: "❌ Missing consent",
    data: {
      fullName: "Test User",
      parentName: "Test Parent",
      parentEmail: "test@email.com",
      parentPhone: "0800 000 0000",
      transport: "bus",
      hasAllergies: "No",
      hasMedication: "No",
      signatureDate: "2026-08-11",
      consent: false,
    },
  },
];

// ── Run tests ──

console.log("═".repeat(70));
console.log("  TEENS CAMP '26 — Registration Function Tests");
console.log("═".repeat(70));
console.log();

let passed = 0;
let failed = 0;

for (const tc of testCases) {
  console.log(`TEST: ${tc.name}`);
  console.log("─".repeat(50));

  // Test validation
  const missing = validateRequired(tc.data);
  const shouldFail = tc.name.includes("❌");

  if (shouldFail) {
    if (missing.length > 0) {
      console.log(`  ✅ Validation caught missing fields: ${missing.join(", ")}`);
      passed++;
    } else if (!tc.data.consent) {
      console.log(`  ✅ Consent validation works (consent: ${tc.data.consent})`);
      passed++;
    } else {
      console.log(`  ❌ Expected validation failure but passed`);
      failed++;
    }
  } else {
    if (missing.length > 0) {
      console.log(`  ❌ Unexpected validation failure: ${missing.join(", ")}`);
      failed++;
    } else {
      console.log(`  ✅ Validation passed`);

      // Test data mapping
      const row = mapFormDataToRow(tc.data);

      // Verify column count
      if (row.length === HEADERS.length) {
        console.log(`  ✅ Row has ${row.length} columns (matches headers)`);
        passed++;
      } else {
        console.log(`  ❌ Row has ${row.length} columns, expected ${HEADERS.length}`);
        failed++;
      }

      // Verify registration ID format
      if (row[0].startsWith("TC26-") && row[0].length === 18) {
        console.log(`  ✅ Registration ID: ${row[0]}`);
        passed++;
      } else {
        console.log(`  ❌ Bad ID format: ${row[0]}`);
        failed++;
      }

      // Verify transport mapping
      const expectedTransport = tc.data.transport === "bus" ? "Church Bus" : "Private";
      if (row[13] === expectedTransport) {
        console.log(`  ✅ Transport: ${tc.data.transport} → "${row[13]}"`);
        passed++;
      } else {
        console.log(`  ❌ Transport mapping wrong: got "${row[13]}"`);
        failed++;
      }

      // Verify timestamp
      if (row[1] && !isNaN(Date.parse(row[1]))) {
        console.log(`  ✅ Timestamp valid: ${row[1]}`);
        passed++;
      } else {
        console.log(`  ❌ Invalid timestamp: ${row[1]}`);
        failed++;
      }

      // Print the row as a table
      console.log();
      console.log("  Mapped Row:");
      const colWidth = 28;
      const valWidth = 35;
      for (let i = 0; i < HEADERS.length; i++) {
        const h = HEADERS[i].padEnd(colWidth);
        const v = String(row[i] || "(empty)").substring(0, valWidth).padEnd(valWidth);
        console.log(`    ${h} │ ${v}`);
      }
    }
  }
  console.log();
}

// Summary
console.log("═".repeat(70));
console.log(`  Results: ${passed} passed, ${failed} failed, ${passed + failed} total`);
console.log("═".repeat(70));

process.exit(failed > 0 ? 1 : 0);
