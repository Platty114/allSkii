const fs = require('fs');
const csv = require('csv-parser');
const results = [];

fs.createReadStream('events.csv') // Replace with the path to your CSV file
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    fs.writeFile('events.json', JSON.stringify(results, null, 2), (err) => {
      if (err) {
        console.error('Error writing JSON output', err);
      } else {
        console.log('Successfully converted CSV to JSON.');
      }
    });
  });
