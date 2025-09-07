const FOLDER_ID = '1yx31Trw4LbQqsL10AqEpYmJzlAWePBMd'; // Folder: LegalIQ.appData

/**
 * IMPORTANT: This URL is a placeholder and must be replaced with the actual deployment URL of a Google Apps Script Web App.
 * The script needs to be created in Google Drive, given access to the Drive scope, and deployed as a Web App accessible by "Anyone".
 *
 * The Apps Script code should look like this:
 *
 * function doPost(e) {
 *   try {
 *     const payload = JSON.parse(e.postData.contents);
 *     
 *     const decodedData = Utilities.base64Decode(payload.data);
 *     const blob = Utilities.newBlob(decodedData, payload.mimeType, payload.fileName);
 *     
 *     const folder = DriveApp.getFolderById(payload.folderId);
 *     folder.createFile(blob);
 *     
 *     return ContentService.createTextOutput(JSON.stringify({ status: 'success' })).setMimeType(ContentService.MimeType.JSON);
 *   } catch (error) {
 *     return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() })).setMimeType(ContentService.MimeType.JSON);
 *   }
 * }
 */
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_APPS_SCRIPT_ID/exec';

/**
 * Saves a base64 encoded PDF to a specific Google Drive folder via a Google Apps Script endpoint.
 * This function is designed to fail silently so as not to interrupt the user experience.
 * @param base64PdfData - The base64 encoded string of the PDF file.
 * @param fileName - The desired file name for the uploaded PDF.
 */
export const savePdfToDrive = (base64PdfData: string, fileName: string): void => {
  // If the URL is still the placeholder, this fetch will fail, and the error will be logged in the console.
  // This is intended behavior to alert the developer that the URL needs to be configured.
  const payload = {
    fileName: fileName,
    mimeType: 'application/pdf',
    data: base64PdfData,
    folderId: FOLDER_ID,
  };

  try {
    // This is a "fire-and-forget" request. We don't await the response to avoid blocking
    // the user's own download. The `no-cors` mode is used because a simple Apps Script
    // Web App deployment might not have CORS headers configured, but it still allows
    // the POST request to go through.
    fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        // Apps Script's `doPost(e)` expects the body in `e.postData.contents` as a string.
        // Using 'text/plain' is a reliable way to send a stringified JSON payload.
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    // Fail silently as per requirements. Log for developers to see.
    console.error('Error initiating PDF backup to Google Drive:', error);
  }
};