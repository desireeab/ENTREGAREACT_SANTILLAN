import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextComponent = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    let existe = cart.some((elemento) => elemento.id === product.id);
    if (existe) {
      let newArr = cart.map((elemento) => {
        if (product.id === elemento.id) {
          return {
            ...elemento,
            quantity: product.quantity,
          };
        } else {
          return elemento;
        }
      });

      setCart(newArr);
    } else {
      setCart([...cart, product]);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const deleteById = (id) => {
    let newArr = cart.filter((elemento) => elemento.id !== id);
    setCart(newArr);
  };

  const getTotalQuantity = ()=>{
    
    let total = cart.reduce( (acc, elemento)=>{
      return acc + elemento.quantity
    } , 0 )

    return total
  }


  const getTotalPrice = ()=>{
    let total = cart.reduce( (acc, elemento)=>{
      return acc + (elemento.price * elemento.quantity)
    }, 0)
    return total
  }

  const getQuantityById = (id)=>{

    let producto = cart.find( (elemento)=> elemento.id === +id )
    return producto?.quantity
  }

  let data = {
    cart,
    addToCart,
    clearCart,
    deleteById,
    getTotalQuantity,
    getTotalPrice,
    getQuantityById
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartContextComponent;
