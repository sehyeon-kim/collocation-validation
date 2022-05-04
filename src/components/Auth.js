import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function Auth({setAuthorized, collSize, startID, writeID}) {

  const [tokenClient, setTokenClient] = useState();
  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);
  // const [auth, setAuth] = useState(false);

  const google = window.google
  const gapi = window.gapi

  /* exported gapiLoaded */
  /* exported gisLoaded */
  /* exported handleAuthClick */
  /* exported handleSignoutClick */

  // TODO(developer): Set to client ID and API key from the Developer Console
  const CLIENT_ID = '126260973862-df4qdj02rnkecns06de3l8k7tngr1s20.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyAuB0vOzRP8Up_uYNCa5nChE2R6Wdji7aE';

  // Discovery doc URL for APIs used by the quickstart
  const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

  // let tokenClient;
  // let gapiInited = false;
  // let gisInited = false;

  // document.getElementById('authorize_button').style.visibility = 'hidden';
  // document.getElementById('signout_button').style.visibility = 'hidden';

  /**
   * Callback after api.js is loaded.
   */
  function gapiLoaded() {
    gapi.load('client', intializeGapiClient);
  }

  /**
   * Callback after the API client is loaded. Loads the
   * discovery doc to initialize the API.
   */
  async function intializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    // gapiInited = true;
    setGapiInited(true)
    // maybeEnableButtons();
  }

  /**
   * Callback after Google Identity Services are loaded.
   */
  function gisLoaded() {
    // tokenClient = google.accounts.oauth2.initTokenClient({
    //   client_id: CLIENT_ID,
    //   scope: SCOPES,
    //   callback: '', // defined later
    // });
    setTokenClient(
      google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', // defined later
      })
    )
    // gisInited = true;
    setGisInited(true)
    // maybeEnableButtons();
  }

  /**
   * Enables user interaction after all libraries are loaded.
   */
  // function maybeEnableButtons() {
  //   if (gapiInited && gisInited) {
  //     // document.getElementById('authorize_button').style.visibility = 'visible';s
  //   }
  // }

  /**
   *  Sign in the user upon button click.
   */
  function handleAuthClick() {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      setAuthorized(true)
      // setAuth(true)
      // document.getElementById('signout_button').style.visibility = 'visible';
      // document.getElementById('authorize_button').innerText = 'Refresh';
      // await listMajors();
    };

    if (gapi.client.getToken() === null) {
      // Prompt the user to select an Google Account and asked for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({prompt: ''});
    }
    
  }

  /**
   *  Sign out the user upon button click.
   */
  function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('');
      // document.getElementById('content').innerText = '';
      // document.getElementById('authorize_button').innerText = 'Authorize';
      // document.getElementById('signout_button').style.visibility = 'hidden';
    }
  }

  /**
   * Print the names and majors of students in a sample spreadsheet:
   * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
   */
  async function listMajors() {
    let response;
    try {
      // Fetch first 10 files
      response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
        range: 'Class Data!A2:E',
      });
    } catch (err) {
      // document.getElementById('content').innerText = err.message;
      return;
    }
    const range = response.result;
    if (!range || !range.values || range.values.length == 0) {
      // document.getElementById('content').innerText = 'No values found.';
      return;
    }
    // Flatten to string to display
    const output = range.values.reduce(
        (str, row) => `${str}${row[0]}, ${row[4]}\n`,
        'Name, Major:\n');
    // document.getElementById('content').innerText = output;
  }

  useEffect(() => {
    gapiLoaded()
    gisLoaded()
  }, [])


  return (
    // (gapiInited && gisInited) &&
    <div>
        <title>Sheets API Quickstart</title>
        <p>Google Authorization</p>


        <button id="authorize_button" onClick={() =>handleAuthClick()}>Authorize</button>

        <script async defer src="https://apis.google.com/js/api.js" onLoad={() => gapiLoaded()}></script>
        <script async defer src="https://accounts.google.com/gsi/client" onLoad={()=>gisLoaded()}></script>
    </div>
  )
}