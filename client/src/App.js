import { Routes, BrowserRouter, Route } from "react-router-dom";
import './App.css';
import Dashbord from "./page/Dashbord";
import Home from "./page/Home";
import UserDashboard from "./page/UserDashboard";
import Login from "./page/Login";
import Registration from "./page/Registration";
import Product from "./page/Product";
import Productlist from "./page/Productlist";
import Productadmin from "./page/Productadmin";
import Productlistadmin from "./page/ProductlistAdmin";
import Productcard from "./page/Productcard";
import Productcardadmin from "./page/Productcardadmin";
import Homeadmin from "./page/HomeAdmin";
import ProductEditAdmin from "./page/ProductEditlist";
function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Home/>} />
  <Route path="/login" element={<Login />} />
  <Route path="/registration" element={<Registration/>} />
  <Route path="/dashbord" element={<Dashbord />} />
  <Route path="/userdashboard" element={<UserDashboard/>} />
  <Route path="/product" element={<Product />} />
  <Route path="/product/:id" element={<Product />}/>
  <Route path="/productlist" element={<Productlist />} />
  <Route path="/productcard" element={<Productcard />} />
  <Route path="/productcard/:id" element={<Productcard />} /> 
  <Route path="/homeadmin" element={<Homeadmin />} />
  <Route path="/productlistadmin" element={<Productlistadmin />} />  
  <Route path="/producteditlist/:id" element={<ProductEditAdmin />} /> 
  <Route path="/productadmin" element={<Productadmin />} /> 
  <Route path="/productadmin/:id" element={<Productadmin />} /> 
  <Route path="/productcardadmin/:id" element={<Productcardadmin />} />
</Routes>

    </BrowserRouter>
  );
}

export default App;
