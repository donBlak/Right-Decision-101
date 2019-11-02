const csv = require('csv-parser');
const fs = require('fs');
const result = [];

fs.createReadStream('1557723655422-MSFT.tsv')
    .pipe(csv({ separator: '\t'}))
    .on('data',(data) => result.push(data))
    .on('end', () => {
      console.log(result);  
    })