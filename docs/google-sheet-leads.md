# Save website enquiries to a Google Sheet

1. Create a Google Sheet named **Website Leads**.
2. **Extensions → Apps Script**, replace the code with:

```js
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const data = JSON.parse(e.postData.contents);
  const cols = ['submittedAt', 'source', 'name', 'phone', 'email', 'company', 'service', 'location', 'industry', 'budget', 'message', 'contactPreference', 'contactMethod', 'page'];
  if (sheet.getLastRow() === 0) sheet.appendRow(cols);
  sheet.appendRow(cols.map((c) => data[c] || ''));
  return ContentService.createTextOutput('ok');
}
```

3. **Deploy → New deployment → Web app**. Execute as: *Me*. Who has access: *Anyone*.
4. Copy the web-app URL into `.env` as `PUBLIC_SHEETS_WEBHOOK=...` (or into your host’s environment variables) and rebuild.
