import { Page, expect } from "@playwright/test";
import PlaywrightWrapper from "../../helpers/wrapper/PlaywrightWrappers";

export default class DemoBlazeProductView {

    private base: PlaywrightWrapper;
    private Elements = {
        btnAddCart: "//*[@class = 'btn btn-success btn-lg']",
        price: ".price-container"
    };
    private precio;
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);

    }


    async addProductCard() {
        await this.page.waitForLoadState('load', { timeout: 5000 });
        this.precio = await this.page.locator(this.Elements.price).allInnerTexts();
        await this.page.locator(this.Elements.btnAddCart).click({ force: true });
    }
    async alert() {
        await expect(this.page.on('dialog', dialog => { }).isVisible);
        await this.page.on('dialog', dialog => dialog.accept);
    }



}