import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import DemoblazeHomePage from "../../../../src/demoblaze/page/DemoblazeHomePage";
import DemoBlazeProductView from "../../../../src/demoblaze/page/DemoBlazeProductView";
import DemoblazeCartView from "../../../../src/demoblaze/page/DemoblazeCartView";
import { fixture } from "../../../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 5);
let demoblazeHome : DemoblazeHomePage ;

let demoblazeProducView: DemoBlazeProductView ;
let demoblazeCartView : DemoblazeCartView;

Given('El usuario navega hasta la aplicacion', async function () {
    demoblazeHome =  new DemoblazeHomePage( fixture.page);
    await demoblazeHome.go("https://www.demoblaze.com/index.html");
});



Given('Selecciono el tipo producto que deseo {string}', async function (tipoProducto) {
    await demoblazeHome.selectTypeProduct(tipoProducto,);
});


When('añado el producto {string} al carrito', async function (productoNombre) {
    demoblazeProducView = new DemoBlazeProductView(fixture.page);
    await demoblazeHome.selectProductCard(productoNombre);
    await demoblazeProducView.addProductCard();

});

Then('Valido la presencia del producto {string} en el carrito con el precio {string}', async function (product, price) {
    demoblazeCartView = new DemoblazeCartView(fixture.page);
    await demoblazeCartView.cartPorduct();
    await demoblazeCartView.validateTable(product,price);
});

When('Realizo el proceso de compra con los datos', async function (dataTable) {
    demoblazeCartView = new DemoblazeCartView(fixture.page);
    await demoblazeCartView.cartPorduct();
    await demoblazeCartView.placeOrderModal(dataTable);
    

});
////



Then('Valido la card de  compra exitosa', async function () {
    await demoblazeCartView.validateCheckout();
});

  /////registro


Given('Selecciona la opcion de registro', async function () {
    await demoblazeHome.selectRegister();
});



When('Creo el nuevo  ursuario {string} con contraseña {string}', async function (username, password) {
    await demoblazeHome.registerModal(username,password);

});

Then('Valido la Alerta de Registro exitoso {string}', async function (msg) {
    await demoblazeHome.validateAlertSuccessful(msg);

});


When('Creo el   ursuario {string} con contraseña {string}', async function (username, password) {
    await demoblazeHome.registerModal(username,password);

});


Then('Valido la Alerta de usuario existente {string}', async function (msg) {
    await demoblazeHome.validateAlertSuccessful(msg);
});


When('intento registrar el usuario  ursuario {string} con contraseña nula', async function (username) {
    await demoblazeHome.registerModal(username,"");

});


Then('Valido la Alerta de Ingresar contraseña {string}', async function (msg) {
    await demoblazeHome.validateAlertSuccessful(msg);
});

When('intento registrar ursuario nulo con contraseña {string}', async function (password) {
    await demoblazeHome.registerModal("",password);

});

Then('Valido la Alerta de Ingresar usuario {string}', async function (msg) {
    await demoblazeHome.validateAlertSuccessful(msg);
});

When('intento registrar ursuario sin ningun dato ingresado', async function () {
    await demoblazeHome.registerModal("","");
});

Then('Valido la Alerta de Ingresar usuario y contraseña {string}', async function (msg) {
    await demoblazeHome.validateAlertSuccessful(msg);});

  //////////// login

Given('Selecciona la opcion Login', async function () {
    await demoblazeHome.selectLogin();
});

When('Ingreso con el ursuario {string} con contraseña {string}', async function (user, pass) {
    await demoblazeHome.loginModal(user,pass);
});

Then('Valido inicio de sesion exitoso', async function () {
    await demoblazeHome.ValidateLoginSuuscefull();
});

Then('Valido la Alerta de contraseña incorrecta. {string}', async function (msg) {
    await demoblazeHome.validateAlertSuccessful(msg);
});

Then('Valido la Alerta de ingresar usuario {string}', async function (msg) {
    await demoblazeHome.validateAlertSuccessful(msg);
});


Then('Valido la Alerta de ingresar contraseña  {string}', async function (msg) {
    await demoblazeHome.validateAlertSuccessful(msg);
});