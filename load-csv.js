const csv = require('csv-parser')
const fs = require('fs')
const results = [];

let outputFile = './src/data/2022sep1-10.json'

fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        const sorted = results.sort((a, b) => {
            return (+a['Sum of Distance']) - (+b['Sum of Distance'])
        }).reverse()
        const output = JSON.stringify(sorted, null, 2)
        console.log(output);
        fs.writeFileSync(outputFile, output, 'utf8');
    })