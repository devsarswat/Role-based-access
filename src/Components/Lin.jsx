import React, { useState } from "react";
import axios from "axios";
import { Validationl } from "./Validation";


const Lin = () => {
  const data = { email: "", password: "", confirmpassword: "" };
  const [Edata, setData] = useState(data);

  const InputEvent = (event) => {
    setData({ ...Edata, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    // event.preventDefault();
    if (Validationl({Edata})) {
    axios
      .post(" http://192.168.0.245:4000/login", Edata)
      .then((res) => {
        console.log(res);
        if(res.data){
          alert("Login successfully");
        }
        else{
          alert("Enter your valid data");
          
        }
        setData(data);
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
