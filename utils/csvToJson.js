const csvFilePath = '../db/csvData.csv';
const csv = require('csvtojson');
const fs = require('fs');

let data = [];

csv()
  .fromFile(csvFilePath)
  .then(jsonObj => {
    const items = jsonObj.map(item => {
      const newItem = { ...item };
      newItem.description = newItem.description.split(';');
      newItem.thumbnails = newItem.thumbnails.split(';');
      return newItem;
    });
    fs.writeFile('data.json', JSON.stringify(items), 'utf8');
  });
