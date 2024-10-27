Feature: Hacer checkout de una orden
    Yo como analista
    necesito realizar checkout de una orden
    para validar el funcionamiento del proceso de compra.

  Background:
    Given El usuario navega hasta la aplicacion

  Scenario Outline: Como usuario quiero realizar un proceso de  checkout de una orden
    And Selecciono el tipo producto que deseo <Tipoproducto>
    When añado el producto "<producto>" al carrito
    And Realizo el proceso de compra con los datos
      | nombre | pais     | ciudad   | card             | month   | year |
      | test   | Colombia | medellin | 5415968234831820 | octubre | 2024 |
    Then Valido la card de  compra exitosa

    Examples:
      | Tipoproducto | producto          | precio |
      | "Phones"     | Samsung galaxy s6 |    360 |
      | "Laptops"    | MacBook air       |    700 |
      | "Monitors"   | Apple monitor 24  |    400 |
