import React, { useState } from "react";
// import React, { useContext } from "react";
import axios from "axios";
import { Validationr } from "./Validation";
import { useNavigate } from "react-router-dom";
// import { Acontext } from "../App";


const Registration = () => {
  // const {handleLogin}=useContext(Acontext);
  const data = {name:"", email: "", password: "", confirmpassword: "", role: "" };
  const [Edata, setData] = useState(data);
  const navigate=useNavigate();

  const InputEvent = (event) => {
    setData({ ...Edata, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    // event.preventDefault();
    if (Validationr({Edata})) {
      axios
        .post("http://192.168.0.245:4000/register",Edata)
        .then((res) => {
          console.log(res);
          alert("Registration Successful")
          setData(data); // Reset the form after successful submission if needed
          // handleLogin();
          navigate("/login");

        })
        .catch((error) => {
          console.error(error);
          alert("An error occurred. Please try again.");
          setData(data);
        });
    }
    event.preventDefault();
  };

  return (
    <div className="container-1">
    <h3 className="heading">Registration</h3>
      <form className="form" onSubmit={onSubmit}>
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your user id"
          onChange={InputEvent}
          name="name"
          className="input"
        />
        <label>Email</label>
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
        <label htmlFor="role">Choose a Role:</label>

        <select
          name="role"
          id="role"
          defaultValue="Select the role"
          onChange={InputEvent}
          className="input"
        >
          <option value="Select the role" disabled>
            Select the role
          </option>
          <option value="user">User</option>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>

        <button className="btn btn-primary button" type="submit">
        submit
        </button>
      </form>
    </div>
  );
};

export default Registration;
