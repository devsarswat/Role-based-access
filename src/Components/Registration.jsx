import React, { useState } from "react";
import axios from "axios";

const Registration = () => {
  const data = { email: "", password: "", confirmpassword: "", role: "" };
  const [Edata, setData] = useState(data);

  const InputEvent = (event) => {
    setData({ ...Edata, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    // event.preventDefault();
    axios
      .post("http://192.168.0.245:4000/register", Edata)
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
