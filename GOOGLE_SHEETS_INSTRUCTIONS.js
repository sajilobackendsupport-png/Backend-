// Google Apps Script needed to receive data from Pass Easy Motor Driving School and append it to your Google Sheet
// 
// STEPS TO DEPLOY:
// 1. Open your target Google Sheet: https://docs.google.com/spreadsheets/d/1KyXaenxpoNvFMnlOP_iw-dV464Mvli-1Xbcl4zt90m0/edit?gid=154201726#gid=154201726
// 2. Click on "Extensions" in the top menu -> "Apps Script"
// 3. Delete everything in the editor and paste the code below.
// 4. Click the "Save" icon (or File -> Save).
// 5. At the top right, click "Deploy" -> "New deployment".
// 6. Click the gear icon next to "Select type" and choose "Web app".
// 7. Give it a description (e.g., "Pass Easy App Submissions").
// 8. Under "Execute as", select "Me (<your email>)".
// 9. Under "Who has access", select "Anyone". (CRUCIAL: It must be 'Anyone', not 'Anyone with Google account')
// 10. Click "Deploy".
// 11. Authorize access if prompted.
// 12. Copy the "Web app URL" (it will end in /exec).
// 13. Back in AI Studio, open Settings -> Environment Variables.
// 14. Add a new variable called: VITE_GOOGLE_SHEET_WEBHOOK_URL
// 15. Paste your copied Web app URL as the value and save.

function doPost(e) {
  try {
    // Determine the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the JSON data from the frontend fetch request
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      return ContentService.createTextOutput("Error: No data").setMimeType(ContentService.MimeType.TEXT);
    }

    // Prepare row data (match this order to your actual columns in the Google Sheet)
    const row = [
      data.dateSubmitted || new Date().toISOString(),
      data.fullName || '',
      data.phoneNumber || '',
      data.course || '',
      data.vehicle || '',
      data.startDate || '',
      data.timeSlot || '',
      data.userId || ''
    ];

    // Check if headers exist; if not, add them (optional but helpful)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Date Submitted", "Full Name", "Phone Number", "Course", "Vehicle", "Start Date", "Time Slot", "User ID"]);
    }

    // Append the data as a new row
    sheet.appendRow(row);

    // Return a success JSON response
    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
