import { onRequest } from "firebase-functions/v2/https";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { appendToSheet, initSheets } from "./sheets.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read credentials from the functions/credentials folder
const credentialsPath = path.join(__dirname, 'credentials', 'service-account.json');
let googleCredentials = null;
try {
  googleCredentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
} catch (error) {
  console.error("Could not load credentials from", credentialsPath);
}

// Spreadsheet ID from the user
const SPREADSHEET_ID = "1iipZsNmHUSnMpAwEsYhtfwdwwV9HgbXbvPffx7n_--g";

/**
 * POST /register — Append a registration row to Google Sheets
 *
 * Firebase Spark (free) plan:
 *   - 2M invocations/month
 *   - 40K GB-seconds compute/month
 *   - ~100 calls/day = well within free tier
 */
export const register = onRequest(
  {
    region: "us-central1",
    cors: true,
  },
  async (req, res) => {
    // Handle preflight
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      return res.status(204).send("");
    }

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const d = req.body;

      // Validate required fields
      if (!d.fullName || !d.parentName || !d.parentEmail) {
        return res.status(400).json({
          error: "Missing required fields",
          required: ["fullName", "parentName", "parentEmail"],
        });
      }

      // Generate registration ID
      const now = new Date();
      const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
      const random = Math.floor(Math.random() * 9000 + 1000);
      const registrationId = `TC26-${dateStr}-${random}`;

      // Map form data to spreadsheet row
      const row = [
        registrationId,
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

      if (!googleCredentials) {
        throw new Error("Google credentials not loaded");
      }

      // Initialize Google Sheets API client
      const sheets = await initSheets(googleCredentials, SPREADSHEET_ID);

      // Append to spreadsheet
      await appendToSheet(sheets, row, SPREADSHEET_ID);

      console.log(`✅ Registration saved: ${registrationId} — ${d.fullName}`);

      return res.status(200).json({
        success: true,
        registrationId,
        message: "Registration saved successfully",
      });
    } catch (error) {
      console.error("❌ Error saving registration:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to save registration: " + (error.message || "Unknown error"),
      });
    }
  }
);
