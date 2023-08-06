import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { CartContext } from "../../../context/CartContext";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const FormFormik = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { cart, getTotalPrice } = useContext(CartContext);
  const [orderId, setOrderId] = useState("");

  let total = getTotalPrice();

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    onSubmit: (data) => {
     
      let order = {
        buyer: data,
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
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("This is required.")
        .min(5, "This must be at least 5 characters ")
        .max(15),
      email: Yup.string()
        .email("Not a valid email address")
        .required("This is required"),
      phone: Yup.string().required("This is required"),
    }),
    validateOnChange: false,
  });

  return (
    <div style={{ padding: "40px" }}>
      {
        !orderId ? <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          onChange={handleChange}
          error={errors.name ? true : false}
          helperText={errors.name}
        />

        <TextField
          type="text"
          label="Email"
          variant="outlined"
          name="email"
          onChange={handleChange}
          error={errors.email ? true : false}
          helperText={errors.email}
        />
        <TextField
          type={showPassword ? "text" : "password"}
          label="Password"
          variant="outlined"
          name="phone"
          onChange={handleChange}
          error={errors.password ? true : false}
          helperText={errors.password}
        />

        <Button type="submit" variant="contained">
          Submit
        </Button>

        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          Show/Hide
        </button>
      </form> : <h1>Your order Id is: {orderId}</h1>
      }
    </div>
  );
};

export default FormFormik;
