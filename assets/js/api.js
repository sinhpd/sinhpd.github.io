function initClient() {
    var API_KEY = 'AIzaSyAx-JWbVmOfb6oLcQyqGToJvnl9588I2q8';
    var CLIENT_ID = '807541135961-lh6t4a3t4ka6haflo3ee9jgi4ufvrd9n.apps.googleusercontent.com';
    var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

    gapi.client.init({
      'apiKey': API_KEY,
      'clientId': CLIENT_ID,
      'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
      updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }

  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }

  function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        makeApiSaveContact();
    }
  }

  function onSubmitContact() {
    var btn = document.getElementById("contact__from_submit");

    if(btn.classList.contains("processing")){
        return false;
    }
    btn.classList.add("processing");

    var isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
    if(!isSignedIn){
        gapi.auth2.getAuthInstance().signIn();
    }else{
        makeApiSaveContact();
    }
  }

  function makeApiSaveContact() {
    var params = {
      // The ID of the spreadsheet to update.
      spreadsheetId: '14RiH0Ie-LixOjGfoMhmECC-CRpnj2fCgEKh8tX9DHeY',  // TODO: Update placeholder value.

      // The A1 notation of a range to search for a logical table of data.
      // Values will be appended after the last row of the table.
      range: 'Contacts!B:D',  // TODO: Update placeholder value.

      // How the input data should be interpreted.
      valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.

      // How the input data should be inserted.
      insertDataOption: 'RAW',  // TODO: Update placeholder value.
    };

    var name  = document.getElementById("contact-input-name").value;
    var email = document.getElementById("contact-input-email").value;
    var message = document.getElementById("contact-input-message").value;

    var valueRangeBody = {
        values: [
            [
            name,
            email,
            message
        ]
        ]
    };

    var request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
    request.then(function(response) {
        alert('We have received your information. Thank you very much!');
        // Reset values input
        document.getElementById("contact-input-name").value = "";
        document.getElementById("contact-input-email").value = "";
        document.getElementById("contact-input-message").value = "";
        document.getElementById("contact__from_submit").classList.remove("processing");
    }, function(reason) {
        alert('We have received your information. Thank you very much!');
        document.getElementById("contact__from_submit").classList.remove("processing");
        console.error('error: ' + reason.result.error.message);
    });
  }
