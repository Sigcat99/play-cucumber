import * as fs from 'fs';
import * as xmlbuilder from 'xmlbuilder';

const cucumberResult: any[] = JSON.parse(fs.readFileSync('test-results/cucumber-report.json', 'utf8'));

const xmlReport = xmlbuilder.create('testsuites', { encoding: 'UTF-8' });

let totalScenarios = 0;
let totalPassedScenarios = 0;
let totalFailedScenarios = 0;
let totalSkippedScenarios = 0;

cucumberResult.forEach(feature => {
    const testSuite = xmlReport.ele('testsuite', {
        name: feature.name,
        tests: feature.elements.length
    });

    feature.elements.forEach(scenario => {
        totalScenarios++;
        const testCase = testSuite.ele('testcase', {
            name: scenario.name,
            classname: feature.name
        });

        let scenarioPassed = true;
        let scenarioSkipped = false;

        for (const step of scenario.steps) {
            if (step.result && step.result.status === 'failed') {
                scenarioPassed = false;
                totalFailedScenarios++;
                testCase.ele('failure', {}, 'One or more steps failed');
                break;
            } else if (step.result && step.result.status === 'skipped') {
                scenarioSkipped = true;
            }
        }

        if (scenarioPassed && !scenarioSkipped) {
            totalPassedScenarios++;
        } else if (scenarioSkipped) {
            totalSkippedScenarios++;
        }
    });
});

xmlReport.att('tests', totalScenarios);
xmlReport.att('successes', totalPassedScenarios);
xmlReport.att('failures', totalFailedScenarios);
xmlReport.att('skipped', totalSkippedScenarios);

const xmlString = xmlReport.end({ pretty: true });
fs.writeFileSync('test-results/cucumber-report-metrics.xml', xmlString);

console.log(`Generated JUnit report with ${totalPassedScenarios} scenarios passed, ${totalFailedScenarios} failed, and ${totalSkippedScenarios} skipped out of ${totalScenarios} scenarios.`);