import CartWidget from "../../common/cartWidget/CartWidget";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  let userRol = "user";

  return (
    <div className={"containerNavbar"}>
      <Link to="/">Owen's Pet shop</Link>

      <ul className="categories">
        <Link to="/">All products</Link>
        <Link to="/category/Cats">Cats</Link>
        <Link to="/category/Dogs">Dogs</Link>
      </ul>

      {userRol === "admin" && <Link to="/dashboard">ADMIN</Link>}

      <CartWidget />
    </div>
  );
};

export default Navbar;
