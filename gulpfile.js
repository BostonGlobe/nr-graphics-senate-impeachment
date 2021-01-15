const fs = require('fs');
const axios = require('axios');

const sheetID = '1OlhlWdkKMnZbLKhcx8QpZKNqYzB0NBREIlql85QCoGY';
const sheetRange = 'Sheet1!A1:O101'
const file = `data.json`;
const sheetKey = 'AIzaSyCL0DUmFLVTgQtxE68wr1Pps81xVHb9u-s';

// Simple Google Sheet API access
// https://docs.google.com/spreadsheets/d/1OlhlWdkKMnZbLKhcx8QpZKNqYzB0NBREIlql85QCoGY/edit#gid=0
// https://sheets.googleapis.com/v4/spreadsheets/1OlhlWdkKMnZbLKhcx8QpZKNqYzB0NBREIlql85QCoGY/values/Sheet1!A1:V500?key=AIzaSyCL0DUmFLVTgQtxE68wr1Pps81xVHb9u-s

const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${sheetRange}?key=${sheetKey}`;


function fetchSheet(cb) {
  axios.get(sheetUrl)
    .then((response) => {
      // handle success
      // console.log(`Getting ${sheetUrl}`);
      // Write fileName.json file
      const str = JSON.stringify(response.data.values);
      fs.writeFile(file, str, (error) => {
        if (error) console.error(error);
        cb();
      });
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
  cb();
}

exports.default = fetchSheet;
