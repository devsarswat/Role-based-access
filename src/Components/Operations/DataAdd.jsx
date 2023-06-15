import React, { useState } from 'react';
import axios from 'axios';
import DataConformation from "../Operations/DataConformation";

const DataAdd = () => {
  const data = { product_name: "", product_price: "", product_rating: "", product_disp: "" };
  const [Edata, setData] = useState(data);

  const InputEvent = (event) => {
    setData({ ...Edata, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (DataConformation({Edata})){
    axios
      .post("http://192.168.0.197:4000/add", Edata,{
        headers:{ auth:` ${token}`}
      })
      .then((res) => {
        console.log(res);
        alert("Data Enter Successful");
        setData(data);
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred. Please try again.");
      })
  }
  ;}

  return (
    <>
      <div className="container-1">
        <h3 className="heading">Add Items</h3>
        <form className="form" onSubmit={onSubmit}>
          <label>Product Name</label>
          <input
            type="text"
            placeholder="Enter your Product Name"
            onChange={InputEvent}
            name="product_name"
            className="input"
          />
          <label>Product Price</label>
          <input
            type="text"
            placeholder="Enter your Product Price"
            onChange={InputEvent}
            name="product_price"
            className="input"
          />
          <label>Product Description</label>
          <input
            type="text"
            placeholder="Enter your Product Description"
            onChange={InputEvent}
            name="product_disp"
            className="input"
          />
          <label htmlFor="Product Rating">Product Rating:</label>

          <select
            name="product_rating"
            id="rating"
            defaultValue="Select the Product Rating"
            onChange={InputEvent}
            className="input"
          >
            <option value="Select the Product Rating" disabled>
              Select the Product Rating
            </option>
            <option value="1 Star">1</option>
            <option value="2 Star">2</option>
            <option value="3 Star">3</option>
            <option value="4 Star">4</option>
            <option value="5 Star">5</option>
          </select>

          <button className="btn btn-primary button" type="submit">
            Add Data
          </button>
        </form>
      </div>
    </>
  );
};

export default DataAdd;
