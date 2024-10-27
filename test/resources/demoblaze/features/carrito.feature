Feature: Añadir productos al carrito
Yo como analista
necesito añadir productos al carro de compras
para validar el carrito de compras  .
   
  Background:
    Given El usuario navega hasta la aplicacion
  
  Scenario Outline: Como usuario quiero añadir un producto al carritod e compras
    And Selecciono el tipo producto que deseo <Tipoproducto>
    When añado el producto "<producto>" al carrito
    Then Valido la presencia del producto "<producto>" en el carrito con el precio "<precio>"

    Examples:
      | Tipoproducto | producto          | precio |
      | "Phones"     | Samsung galaxy s6 |    360 |
      | "Laptops"    | MacBook air       |    700 |
      | "Monitors"   | Apple monitor 24  |    400 |
