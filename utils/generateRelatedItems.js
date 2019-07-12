const data = require('../utils/data.json');
const fs = require('fs');

const makeRelatedItems = function() {
  const allRelatedItems = [];
  //populate related items table with random data
  for (let product of data) {
    const numberOfRelatedItems = Math.random() * 7;
    let relatedIds = [];
    for (let i = 0; i < numberOfRelatedItems; i++) {
      const randomItemIndex = Math.floor(Math.random() * data.length);
      const randomID = data[randomItemIndex].ID;
      relatedIds.push(randomID);
    }
    relatedIds = Array.from(new Set(relatedIds));
    for (let relatedId of relatedIds) {
      allRelatedItems.push([product.ID, relatedId]);
    }
  }
  fs.writeFile('relatedItems.json', JSON.stringify(allRelatedItems), 'utf8');
};

makeRelatedItems();
