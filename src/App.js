import React, { useState, createContext,useContext } from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Navebar from "./Components/Navebar";
import Home from "./Components/Home";
import Lin from "./Components/Lin";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Registration from "./Components/Registration";
import GetData from "./Components/Operations/GetData";
import DataAdd from "./Components/Operations/DataAdd";
import UpdateData from "./Components/Operations/UpdateData";
import DeletItem from "./Components/Operations/DeletItem";

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
            <Route exact path="/info" element={<PrivateRoute element={<GetData/>} />} />
            <Route exact path="/additem" element={<PrivateRoute element={<DataAdd/>} />} />
            <Route exact path="/delete/:id" element={<PrivateRoute element={<DeletItem/>} />} />
            <Route exact path="/update/:id" element={<PrivateRoute element={<UpdateData />} />} />
            
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
