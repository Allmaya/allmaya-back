const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const { GoogleAuth } = require('google-auth-library');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.

const TOKEN_PATH = 'token.json';

const authorizeGoogle = async () => {
  const auth = new GoogleAuth({
    keyFile: "./keys.json", //the key file
    //url to spreadsheets API
    scopes: "https://www.googleapis.com/auth/spreadsheets", 
  });

  // const token = fs.readFileSync(TOKEN_PATH);
  // oAuth2Client.setCredentials(JSON.parse(token));
  return auth;
}

const createSheet = async (authGoogle, userId) => {
    const sheets = google.sheets({version: 'v4', auth: authGoogle});
    const title = userId;
    const resource = {
      properties: {
        title,
      },
    };
    const request = {
      resource,
      fields: 'spreadsheetId',
    }

    try {
      console.log("????????");
      const response = (await sheets.spreadsheets.create(request)).data;
      console.log("empty????", response);
      return response.spreadsheetId;
    } catch (e) {
      console.error(e);
    }
}

const copyTemplate = async (authGoogle, spreadSheetId, type) => {
    switch (type) {
    case 0:
      await copyTemplate_0(authGoogle, spreadSheetId);
    default:
      break;
    }
}

const copyTemplate_0 = async (authGoogle, spreadSheetId) => {
  const sheets = google.sheets({version: 'v4', auth: authGoogle});
  try {
    const request = {
      spreadsheetId: '1h053ll9nhfgX7_afkNk5DlD1jCtfT0B-BXiKN94Er1U',
      sheetId: 0,
      resource: {
        destinationSpreadsheetId: spreadSheetId,
      },
    };
    copyResponse = (await sheets.spreadsheets.sheets.copyTo(request)).data;
  } catch (e) {
    console.log(e);
  }

  try {
    const request = {
      spreadsheetId: spreadSheetId,
      resource: {
        requests: [{
          deleteSheet: {
            sheetId: 0
          },
        }],
      }
    };

    (await sheets.spreadsheets.batchUpdate(request)).data;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { authorizeGoogle, createSheet, copyTemplate };