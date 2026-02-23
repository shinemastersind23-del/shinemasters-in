// ═══════════════════════════════════════════════════════════
// SHINE MASTERS INDUSTRIES — LEAD CAPTURE TO GOOGLE SHEETS
// Google Apps Script — paste this into your Apps Script editor
// ═══════════════════════════════════════════════════════════
//
// SETUP INSTRUCTIONS (one-time, 5 minutes):
//
// 1. Go to sheets.google.com and create a new Google Sheet
//    Name it: "SMI Catalogue Leads"
//
// 2. In Row 1, add these headers in columns A to F:
//    Timestamp | Full Name | Email | Company | Product | Source URL
//
// 3. Go to Extensions → Apps Script
//
// 4. Delete all existing code and paste THIS entire file
//
// 5. Click Save (floppy disk icon)
//
// 6. Click Deploy → New Deployment
//    - Type: Web App
//    - Execute as: Me
//    - Who has access: Anyone
//    Click Deploy → Authorize → Allow
//
// 7. Copy the Web App URL — it looks like:
//    https://script.google.com/macros/s/XXXXXXXXXXXX/exec
//
// 8. In each product HTML file, find this line:
//    const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
//    Replace with your actual URL from step 7
//
// 9. Upload updated HTML files to GitHub — done!
//    Every catalogue download now saves to your Sheet.
// ═══════════════════════════════════════════════════════════

const SHEET_NAME = 'Sheet1'; // Change if your sheet tab has a different name

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    sheet.appendRow([
      new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      data.name || '',
      data.email || '',
      data.company || '',
      data.product || '',
      data.source || ''
    ]);

    // Optional: send email alert to yourself
    // Uncomment the lines below if you want an email every time someone downloads
    /*
    MailApp.sendEmail({
      to: 'shinemastersind23@gmail.com',
      subject: '📥 New Catalogue Download — ' + (data.product || 'SMI'),
      body: [
        'A new lead has downloaded your catalogue.',
        '',
        'Name: ' + (data.name || ''),
        'Email: ' + (data.email || ''),
        'Company: ' + (data.company || ''),
        'Product: ' + (data.product || ''),
        'Time: ' + new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        'Page: ' + (data.source || ''),
      ].join('\n')
    });
    */

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'SMI Lead Capture Active' }))
    .setMimeType(ContentService.MimeType.JSON);
}
