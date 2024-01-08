import { useAuthContext } from "./hooks/useAuthContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import HomePage from "./pages/homePage/HomePage";
import "bootstrap/dist/css/bootstrap.css";
import CreateProduct from "./pages/products/create-product/CreateProduct";
import AllProduct from "./pages/products/all-products/AllProduct";
import Product from "./pages/products/single-product/Product";

function App() {

   const { user } = useAuthContext();


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route
            exact
            path="/login"
            element={!user ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            exact
            path="/products/create"
            element={user ? <CreateProduct/> : <Navigate to={"/"} />}
          />
          <Route
            exact
            path="/product/all"
            element={user ? <AllProduct/> : <Navigate to={"/"} />}
          />
          <Route
            exact
            path="/product/:id"
            element={user ? <Product/> : <Navigate to={"/"} />}
          />
          <Route
            exact
            path="/Register"
            element={!user ? <Register /> : <Navigate to={"/"} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
