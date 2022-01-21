const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.

const TOKEN_PATH = 'token.json';

const authorizeGoogle = async () => {
  const oAuth2Client = new google.auth.OAuth2(
    "424192743831-iovu3hofj8mit1rvfqu827afom3qcpqm.apps.googleusercontent.com",
    "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",
    "http://localhost:4000/oauth2redirect"
  );

  const token = fs.readFileSync(TOKEN_PATH);
  oAuth2Client.setCredentials(JSON.parse(token));
  return oAuth2Client;
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
      const response = (await sheets.spreadsheets.create(request)).data;
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