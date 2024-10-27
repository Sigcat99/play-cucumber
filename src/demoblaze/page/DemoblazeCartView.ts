import { Page, expect } from "@playwright/test";
import PlaywrightWrapper from "../../helpers/wrapper/PlaywrightWrappers";
import { ProductSearchResult } from "../../interface/product";
import { extractDataFromTable } from "../../helpers/utils/dataTable";

export default class DemoblazeCartView {
  private base: PlaywrightWrapper;
  private datos;
  private Elements = {
    btnCart: "#cartur",
    price: "#totalp",
    table: "//table[@class = 'table table-bordered table-hover table-striped']",
    tableBody: "#tbodyid",
    btnPlaceOrder: "//button[@class = 'btn btn-success'] ",
    nameInput: "#name",
    countryInput: "#country",
    cityInput: "#city",
    cartInput: "#card",
    monthInput: "#month",
    yearInput: "#year",
    btnPurchaseModal: '//button[@onclick= "purchaseOrder()"]',
    cartOrder: ".modal-body",
    cartOrder2: '//*[@class = "sweet-alert  showSweetAlert visible"]',
    cartOrderText: '//*[@class= "sa-icon sa-custom"]',
    cartOrderText2: '//*[@class= "lead text-muted "]',
    btnOK: '//*[@class= "confirm btn btn-lg btn-primary"]',
  };
  private price;
  constructor(private page: Page) {
    this.base = new PlaywrightWrapper(page);
  }

  async cartPorduct() {
    await this.page.waitForLoadState("load", { timeout: 5000 });
    await this.page
      .locator(this.Elements.btnCart)
      .click({ force: true, timeout: 5000 });

    await this.page.locator(this.Elements.price).waitFor({ state: "visible" });

    let priceTotal = await this.page
      .locator(this.Elements.price)
      .allInnerTexts();
    this.price = priceTotal;
  }

  async validateTable(productName, price) {
    await this.page.locator(this.Elements.price).waitFor({ state: "visible" });

    let productIntable = await this.seacrhProductInTable(productName);
    expect(productName).toBe((await productIntable).productNameTabel);
    expect(this.price[0]).toBe(price);
  }

  private async seacrhProductInTable(
    productName
  ): Promise<ProductSearchResult> {
    const table = await this.page.locator(this.Elements.table);
    const rows = table.locator(this.Elements.tableBody);
    const cols = rows.first().locator("td");
    let price: string;
    let productN: string;
    for (let i = 0; i < (await rows.count()); i++) {
      const row = rows.nth(i);
      const tds = row.locator("td");
      for (let j = 0; j < (await tds.count()); j++) {
        if ((await tds.nth(j).textContent()) == productName) {
          //console.log(await tds.nth(1).textContent());
          productN = (await tds.nth(1).textContent()) || "";
          price = (await tds.nth(2).textContent()) || "";

          //await tds.last().locator("input").check();
        }
      }
    }
    return { productNameTabel: productN, priceTable: price };
  }

  async placeOrderModal(dataTable) {
    await this.page.waitForLoadState("load", { timeout: 5000 });
    let datos = extractDataFromTable(dataTable);
    this.datos = datos;
    await this.page.locator(this.Elements.btnPlaceOrder).click();

    await this.page.locator(this.Elements.yearInput).waitFor();

    await this.page.locator(this.Elements.nameInput).fill(datos.nombre);
    await this.page.locator(this.Elements.countryInput).fill(datos.pais);
    await this.page.locator(this.Elements.cityInput).fill(datos.ciudad);
    await this.page.locator(this.Elements.cartInput).fill(datos.card);
    await this.page.locator(this.Elements.monthInput).fill(datos.month);
    await this.page.locator(this.Elements.yearInput).fill(datos.year);
  }

  async validateCheckout() {
    await this.page.waitForLoadState("load", { timeout: 5000 });
    await this.page.locator(this.Elements.btnPurchaseModal).waitFor();
    await this.page.locator(this.Elements.btnPurchaseModal).click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForLoadState("load", { timeout: 5000 });

    await this.page
      .locator(this.Elements.btnOK)
      .waitFor({ state: "visible", timeout: 9000 });

    let texto2 = await this.page
      .locator(this.Elements.cartOrderText2)
      .allInnerTexts();

    //await  expect(texto).toContain("Thank you for your purchase!")
    await expect(texto2.toString()).toMatch(
      new RegExp(`.*${this.datos.card}.*`, "i")
    );
    await expect(texto2.toString()).toMatch(
      new RegExp(`.*${this.datos.nombre}.*`, "i")
    );
  }
}
