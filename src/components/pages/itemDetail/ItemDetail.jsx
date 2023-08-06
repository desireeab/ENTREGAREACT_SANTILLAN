import CounterContainer from "../../common/Counter/CounterContainer"


const ItemDetail = ( { product, agregarAlCarrito, cantidadEnCarrito } ) => {
  return (
    <div>
      <h1>{product.title}</h1>
      <h3>{product.price}</h3>

      <CounterContainer cantidadEnCarrito={cantidadEnCarrito} stock={product.stock} agregarAlCarrito={agregarAlCarrito } />
    </div>
  )
}

export default ItemDetail