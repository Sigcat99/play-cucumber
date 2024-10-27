import { BeforeAll, Before, AfterAll, After, AfterStep } from "@cucumber/cucumber";
import { createLogger } from "winston";
import { options } from "../src/helpers/logger/logger";
import { fixture } from "./pageFixture";
import { Browser, BrowserContext } from "@playwright/test";
import { invokeBrowser } from "../src/helpers/browsers/browserManager";


let scenarioCount = 0;
let successfulScenarios = 0;


let browser: Browser;
let context: BrowserContext;
let stepCounter: number;
BeforeAll(async function () {
    browser = await invokeBrowser();
    scenarioCount = 0;
    successfulScenarios = 0;
    stepCounter = 0;
});

Before(async function ({ pickle }) {

    if (!pickle.tags.some(tag => tag.name === '@skip')) {
        scenarioCount++;
    }
    const scenarioName = pickle.name + pickle.id
    context = await browser.newContext();
    const page = await context.newPage();
    fixture.logger = createLogger(options(scenarioName));
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));
    fixture.logger.info(`inicia el test del escenario  ${scenarioName}`);
});

// It will trigger for auth scenarios
Before("@auth", async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id
    context = await browser.newContext();
    const page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));
    fixture.logger.info(`inicia el test del escenario  ${scenarioName}`);
});

AfterStep(async function ({ pickle, pickleStep }) {
    stepCounter++;
    const stepScreenshotPath = `./test-results/screenshots/${pickle.name}/step_${stepCounter}_${pickleStep.text.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
    const img = await fixture.page.screenshot({
        path: stepScreenshotPath,
        type: "png",
        fullPage: true
    });

    await this.attach(
        img,
        'image/png'
    );
    fixture.logger.info(`añado imagen del paso  ${pickleStep.text}`);
});


After(async function (scenario: any) {
    await fixture.page.waitForLoadState();
    await fixture.page.close();
    await context.close();
});

AfterAll(async function () {
    await browser.close();

}
);
