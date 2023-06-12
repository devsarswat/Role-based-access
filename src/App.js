import React, { useState, createContext,useContext } from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Navebar from "./Components/Navebar";
import Home from "./Components/Home";
import Lin from "./Components/Lin";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Registration from "./Components/Registration";
import Carditem from "./Components/Carditem";

export const Acontext = createContext();

const App = () => {
  const[service,setservice]=useState({admin:{isadmin:false},user:{isuser:false},customer:{iscustomer:false},login:{isLoggedIn:false}})


  const handleLogout = () => {
    
    setservice({...service,login:{isLoggedIn:false} ,admin:{isadmin:false},user:{isuser:false},customer:{iscustomer:false}})
  };

  return (
    <BrowserRouter>
      <Acontext.Provider value={{ service,setservice, handleLogout}}>
        <div>
          <Navebar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Lin />} />
            <Route exact path="/register" element={<Registration />} />
            <Route exact path="/card" element={<PrivateRoute element={<Carditem />} />} />
          </Routes>
        </div>
      </Acontext.Provider>
    </BrowserRouter>
  );
};
const PrivateRoute=({element})=>{
  const{service}=useContext(Acontext);
  return (service.login.isLoggedIn)?element:<Navigate to="/login"/>;
};
export default App;
