import * as fs from 'fs';
import * as cucumberJunit from 'cucumber-junit';

console.log(cucumberJunit)
const inputFile = 'test-results/cucumber-report.json';
const outputFile = 'test-results/cucumber-report.xml';

const jsonReport = fs.readFileSync(inputFile, 'utf8');

const xmlReport = cucumberJunit(jsonReport);
//let xmlReport = cucumberJunit(inputFile);

fs.writeFileSync(outputFile, xmlReport);

console.log(`Report converted and saved in ${outputFile}`);