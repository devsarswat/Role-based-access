import React, { useState ,useContext } from "react";
import axios from "axios";
import { Validationl } from "./Validation";
import { Acontext } from "../App";
import { useNavigate } from "react-router-dom";
import Config from "./Config";


const Lin = () => {
  const{service,setservice}=useContext(Acontext);
  const data = { email: "", password: "", confirmpassword: "" };
  const [Edata, setData] = useState(data);
  const navigate=useNavigate();

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
        if(res.data.athantication.role==="admin"){
          alert("Login Successfully")
          setservice({...service,login:{isLoggedIn:true},admin:{isadmin:true}})
          navigate("/card");
        }
        else if(res.data.athantication.role==="user"){
          alert("Login Successfully")
          setservice({...service,login:{isLoggedIn:true},user:{isuser:true}})
          navigate("/card");
        }
        else if(res.data.athantication.role==="customer"){
          alert("Login Successfully")
          setservice({...service,login:{isLoggedIn:true},customer:{iscustomer:true}})
          navigate("/card");
        }
        else{
          alert("Enter your valid data");
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
        
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          onChange={InputEvent}
          name="confirmpassword"
          className="input"
        />
        
        <button className="btn btn-primary button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Lin;
