Feature: Realizar el registro de un nuevo usuario
Yo como analista
necesito realizar registrarme y logearme  en la aplicacion
para validar el proceso de registro

  Background:
    Given El usuario navega hasta la aplicacion
    And Selecciona la opcion de registro

  Scenario: Como usuario deseo registrarme en la aplicacion
    When Creo el nuevo  ursuario "username" con contraseña "contraseña"
    Then Valido la Alerta de Registro exitoso "Sign up successful."

  Scenario: Registro con usuario existente
    When Creo el   ursuario "username" con contraseña "contraseña"
    Then Valido la Alerta de usuario existente "his user already exist"

  Scenario: Registro con usuario Sin contraseña
    When intento registrar el usuario  ursuario "username" con contraseña nula
    Then Valido la Alerta de Ingresar contraseña "Please fill out Username and Password."

  Scenario: Registro con usuario vacio
    When intento registrar ursuario nulo con contraseña "contraseña"
    Then Valido la Alerta de Ingresar usuario "Please fill out Username and Password."

  Scenario: Registro sin datos
    When intento registrar ursuario sin ningun dato ingresado
    Then Valido la Alerta de Ingresar usuario y contraseña "Please fill out Username and Password."
