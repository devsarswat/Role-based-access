import React, { useState } from "react";
import axios from "axios";

const Lin = () => {
  const data = { email: "", password: "", confirmpassword: "" };
  const [Edata, setData] = useState(data);

  const InputEvent = (event) => {
    setData({ ...Edata, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(" http://192.168.0.245:4000/login", Edata)
      .then((res) => {
        console.log(res);
        setData(data); // Reset the form after successful submission if needed
      })
      .catch((error) => {
        console.error(error);
      });
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
