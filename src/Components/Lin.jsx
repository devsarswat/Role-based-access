import React, { useState ,useContext } from "react";
import axios from "axios";
import { Validationl } from "./Validation";
import { Acontext } from "../App";
import Config from "./Config";
import DialogBox from "./DialogBox";

const Lin = () => {
  const{service,setservice,handleOpen,handleClose,showDialog}=useContext(Acontext);
  const data = { email: "", password: ""};
  const [Edata, setData] = useState(data);
  

  const InputEvent = (event) => {
    setData({ ...Edata, [event.target.name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (Validationl({Edata})) {
    axios
      .post(Config.apiKeyLog, Edata)
      .then((res) => {
        console.log(res.data.athantication.role);
        localStorage.setItem('token',res.data.athantication.token);
        console.log(localStorage)
        if(res.data.athantication.role==="admin"){
          handleOpen();
          setservice({...service,login:{isLoggedIn:true},admin:{isadmin:true}})
        }
        else if(res.data.athantication.role==="user"){
          handleOpen();
          setservice({...service,login:{isLoggedIn:true},user:{isuser:true}})
        }
        else if(res.data.athantication.role==="customer"){
          handleOpen();
          setservice({...service,login:{isLoggedIn:true},customer:{iscustomer:true}})
        }
        else{
          // alert("Enter your valid data");
          setData(data);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred. Please try again.");
        setData(data);
      });
    }
};
  return (
    <div className="container-1">
    <h3 className="heading">Login</h3>
      <form className="form" onSubmit={onSubmit}>
        <label>User Id</label>
        <input
          type="text"
          placeholder="Enter your user id"
          onChange={InputEvent}
          name="email"
          className="input"
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          onChange={InputEvent}
          name="password"
          className="input"
        />
        
        <button className="btn btn-primary button" type="submit">
          Login
        </button>
      </form>
      {showDialog && (
            <DialogBox handleClose={handleClose} handleConfirm={handleClose} tital="Login Successfully" nevi="/info"/>
          )}
          
    </div>
  );
};

export default Lin;
