const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "test-results",
    reportPath: "test-results/reports/",
    reportName: "Playwright Automation Report",
    pageTitle: "Playwright test report",
    displayDuration: false,
    metadata: {
        browser: {
            name: "chrome",
            version: "115",
        },
        device: "pc local",
        platform: {
            name: "Windows",
            version: "10",
        },
    },
    customData: {
        title: "Test Info",
        data: [
            { label: "Project", value: "demo test" },
            { label: "Release", value: "1.0.0" },
            { label: "Cycle", value: "test" }
        ],
    },
});