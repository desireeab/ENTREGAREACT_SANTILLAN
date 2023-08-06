import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const CartContainer = () => {
  const { cart, clearCart, deleteById, getTotalPrice } =
    useContext(CartContext);

  let limpiar = () => {
    Swal.fire({
      title: "Delete all the items",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        Swal.fire("You don't have items in your cart.", "", "success");
      } else if (result.isDenied) {
        Swal.fire("No changes in your cart", "", "info");
      }
    });
  };

  let total = getTotalPrice();
  return (
    <div>
      <h1>Shopping cart</h1>

      {cart.map((elemento) => {
        return (
          <div
            key={elemento.id}
            style={{ width: "200px", border: "2px solid steelblue" }}
          >
            <h3>{elemento.title}</h3>
            <h3>{elemento.price}</h3>
            <h4>Cantidad: {elemento.quantity}</h4>
            <Button variant="contained" onClick={() => deleteById(elemento.id)}>
              Delete
            </Button>
          </div>
        );
      })}

      {cart.length > 0 && (
        <>
          <Button variant="outlined" onClick={limpiar}>
            Delete all the items
          </Button>
          <Link to="/checkout">
            <Button variant="outlined">Buy it now</Button>
          </Link>
        </>
      )}

      <h2>The total checkout is: {total} </h2>
    </div>
  );
};

export default CartContainer;
