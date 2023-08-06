import { useState, useEffect } from "react";

import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import { db } from "../../../firebaseConfig";

import { getDocs, collection, query, where } from "firebase/firestore";

const ItemListContainer = () => {
  const [items, setItems] = useState([]);

  const { categoryName } = useParams();

  useEffect(() => {

    let consulta;

    let productsCollection = collection(db, "products");

    if(!categoryName){
      consulta = productsCollection
    }else{
      consulta = query( productsCollection, where( "category", "==", categoryName) )
    }

    getDocs(consulta).then((res) => {
      let arrayProductos = res.docs.map((product) => {
        return { ...product.data(), id: product.id };
      });
      setItems(arrayProductos)
    });
  }, [categoryName]);

  return (
    <>
      <h1>Products</h1>

      <ItemList items={items} />
    </>
  );
};

export default ItemListContainer;
