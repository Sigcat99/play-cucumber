Feature: Realizar Inicio de sesion en la aplicacion
Yo como analista
necesito iniciar sesion en la aplicacion
para validar la existencia y registro de mi usuario

  Background:
    Given El usuario navega hasta la aplicacion
    And Selecciona la opcion Login

  Scenario: Proceso de inicio de sesion exitoso
    When Ingreso con el ursuario "test" con contraseña "test"
    Then Valido inicio de sesion exitoso

  Scenario: Proceso de inicio de sesion fallido  contraseña incorrecta
    When Ingreso con el ursuario "username" con contraseña "test"
    Then Valido la Alerta de contraseña incorrecta. "Wrong password."

  Scenario: Proceso de inicio de sesion fallido   por  usuario vacio
    When Ingreso con el ursuario "" con contraseña "contraseña"
    Then Valido la Alerta de ingresar usuario "Please fill out Username and Password."

  Scenario: Proceso de inicio de sesion fallido   por  contraseña  vacia
    When Ingreso con el ursuario "username" con contraseña ""
    Then Valido la Alerta de ingresar contraseña  "Please fill out Username and Password."
