# Firebase Functions + Google Sheets Setup Guide

## Prerequisites

1. **Firebase CLI** — `npm install -g firebase-tools`
2. **Google Cloud Console** access — https://console.cloud.google.com
3. **A Google Sheet** for registrations

---

## Step 1: Create a Google Sheet

1. Go to https://sheets.google.com and create a new spreadsheet
2. Name it **"Teens Camp '26 — Registrations"**
3. Copy the spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[THIS_PART_IS_THE_ID]/edit
   ```
4. Set it in `functions/sheets.js` line 5, or as a Firebase environment variable

---

## Step 2: Create a Google Cloud Service Account

1. Go to https://console.cloud.google.com → **IAM & Admin** → **Service Accounts**
2. Click **Create Service Account**
3. Name: `teens-camp-sheets`
4. Click **Done** (skip roles)
5. Click the service account → **Keys** → **Add Key** → **Create new key** → **JSON**
6. Download the JSON key file
7. Place it at: `functions/credentials/service-account.json`

---

## Step 3: Share the Google Sheet

1. Open your Google Sheet
2. Click **Share**
3. Add the service account email (from the JSON key, field `client_email`)
4. Give it **Editor** access
5. Click **Send**

---

## Step 4: Initialize Firebase

```bash
# Login to Firebase
firebase login

# Set your project
firebase use teens-camp-26
# (or create: firebase projects:create teens-camp-26)

# Deploy functions
cd functions && npm install && cd ..
firebase deploy --only functions
```

---

## Step 5: Set Environment Variables

```bash
# Set the spreadsheet ID
firebase functions:secrets:set SPREADSHEET_ID
# Paste your spreadsheet ID

# Upload the service account credentials
firebase functions:secrets:set GOOGLE_SERVICE_ACCOUNT
# Paste the contents of functions/credentials/service-account.json
```

Or configure via `firebase.json`:
```bash
firebase functions:config:set sheets.spreadsheet_id="YOUR_SPREADSHEET_ID"
```

---

## Step 6: Update Frontend Config

In `src/App.jsx`, update the `API_URL` constant:

```javascript
const API_URL = "https://us-central1-teens-camp-26.cloudfunctions.net/register"
```

Or for local testing, the Vite proxy in `vite.config.js` handles this automatically.

---

## Cost Breakdown

| Service | Free Tier | Your Usage | Cost |
|---------|-----------|------------|------|
| Firebase Functions (Spark) | 2M invocations/month | ~3,000/month | **$0** |
| Google Sheets API | Unlimited reads/writes | ~100/day | **$0** |
| Google Cloud (service account) | No cost for auth | — | **$0** |
| **Total** | | | **$0** |

---

## Testing Locally

```bash
# Start Vite dev server (proxies /api to Firebase emulator)
npm run dev

# Start Firebase emulator
firebase emulators:start --only functions
```

The Vite proxy in `vite.config.js` routes `/api` requests to the emulator.
