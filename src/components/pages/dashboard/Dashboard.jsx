import { Button } from "@mui/material"
import { products } from "../../../productsMock"
import { db } from "../../../firebaseConfig"
import { addDoc, collection } from "@firebase/firestore"

const Dashboard = () => {

    const rellenar = ()=>{
        let refCollection = collection(db, "products")
        products.forEach( (prod)=> {
            addDoc( refCollection, prod )
        } )
    }

  return (
    <div>
        <h1>Ruta para el administrador</h1>
        <Button variant="contained" onClick={rellenar}>Rellenar base de datos</Button>
    </div>
  )
}

export default Dashboard