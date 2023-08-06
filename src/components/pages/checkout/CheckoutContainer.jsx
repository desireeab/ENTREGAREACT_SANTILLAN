import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { db } from "../../../firebaseConfig";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { Button } from "@mui/material";

const CheckoutContainer = () => {
  const { cart, getTotalPrice } = useContext(CartContext);

  const [orderId, setOrderId] = useState("");

  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  let total = getTotalPrice();

  const handleSubmit = (evento) => {
    evento.preventDefault();

    let order = {
      buyer: userData,
      items: cart,
      total,
      date: serverTimestamp(),
    };


    let ordersCollections = collection(db, "orders");
    addDoc(ordersCollections, order).then((res) => setOrderId(res.id));

    cart.forEach((elemento) => {
      updateDoc(doc(db, "products", elemento.id), {
        stock: elemento.stock - elemento.quantity,
      });
    });
  };

  const handleChange = (evento) => {
    setUserData({ ...userData, [evento.target.name]: evento.target.value });
  };

  return (
    <div>
      <h1>Checkout</h1>

      {!orderId ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your name"
            name="name"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Your phone number"
            name="phone"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Your email adress"
            name="email"
            onChange={handleChange}
          />
          <Button variant="contained" type="submit">
            Buy
          </Button>
        </form>
      ) : (
        <h3>This is your order Id: {orderId} </h3>
      )}
    </div>
  );
};

export default CheckoutContainer;
