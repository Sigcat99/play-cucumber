import { Page, expect } from "@playwright/test";
import PlaywrightWrapper from "../../helpers/wrapper/PlaywrightWrappers";
import { Console } from "winston/lib/winston/transports";

export default class DemoblazeHomePage {
    private base: PlaywrightWrapper;
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }
    private Elements = {
        btnMonitor: "//*[@id= 'itemc' and contains(text(),'Monitors')]",
        btnLaptos: "//*[@id= 'itemc' and contains(text(),'Laptops')]",
        btnPhone: "//*[@id= 'itemc' and contains(text(),'Phone')]",
        producto: "//*[@class = 'card-title' ]//a[contains(text(), ",
        registerBtn: "//*[@id='signin2' ]",
        usernameInput: '//input[@id="sign-username"]',
        paswordInput: "#sign-password",
        btnRegister: '//button[@onclick= "register()"  ]',
        btnLogin: "#login2",
        userNameInputLogin: "#loginusername",
        passInputLogin: "#loginpassword",
        loginBnt: '//button[@onclick= "logIn()"  ]',
        userLongin: "#nameofuser"

    };

    async go(url: string) {
        await this.base.goto(url);


    }

    async selectTypeProduct(producType) {
        let tp = producType;
        await this.page.waitForLoadState('load', { timeout: 5000 });


        switch (tp) {
            case "Phones":

                await this.page.locator(this.Elements.btnPhone).click({ force: true });
                break;
            case "Laptops":
                await this.page.locator(this.Elements.btnLaptos).click({ force: true });
                break;
            case "Monitors":
                await this.page.locator(this.Elements.btnMonitor).click({ force: true });
                break;
            default:
                throw new Error("Sin Producto")
        }
    }


    async selectProductCard(productName) {
        await this.page.locator(this.Elements.producto + `'${productName}')]`).click({ force: true, timeout: 10000 });
        await this.page.waitForLoadState('load', { timeout: 5000 });
    }

    async selectRegister() {
        await this.page.locator(this.Elements.registerBtn).click();
        await this.page.waitForLoadState('load', { timeout: 5000 });
    }

    async registerModal(username, password) {
        await this.page.locator(this.Elements.usernameInput).waitFor();
        await this.page.locator(this.Elements.usernameInput).fill(username);
        await this.page.locator(this.Elements.paswordInput).fill(password);
        await this.page.locator(this.Elements.btnRegister).click();
        await this.page.waitForLoadState('load', { timeout: 5000 });
    }

    async validateAlertSuccessful(msg) {
        await this.page.on('dialog', async dialog => {
            console.log(dialog.message());
            await expect(dialog.message()).toContain(msg);
            dialog.accept();
        });
    }



    async selectLogin() {
        await this.page.locator(this.Elements.btnLogin).click();
        await this.page.waitForLoadState('load', { timeout: 5000 });
    }



    async loginModal(username, password) {
        await this.page.locator(this.Elements.userNameInputLogin).waitFor();
        await this.page.locator(this.Elements.userNameInputLogin).fill(username);
        await this.page.locator(this.Elements.passInputLogin).fill(password);

        await this.page.locator(this.Elements.loginBnt).click();
        await this.page.waitForLoadState('load', { timeout: 5000 });
    }

    async ValidateLoginSuuscefull() {

        await this.page.waitForLoadState('load', { timeout: 5000 });

        await expect(this.page.locator(this.Elements.userLongin)).toBeVisible();

    }
}
