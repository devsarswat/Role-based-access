import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Acontext } from "F:/reactjs 6/role_based_acess/src/App";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Config  from "../Config";

const GetData = () => {
  const { service } = useContext(Acontext);
  const [Titem, setTitem] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(Config.apiKeygetdata)
      .then((res) => {
        console.log(res.data);
        setTitem(res.data);
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred. Please try again.");
      });
  }, []);

  const handleDelete = (id) => {
    navigate(`/delete/${id}`);
}
  const handleUpdate = (id,data) => {
    navigate(`/update/${id}`,{ state: data });
  };

  return (
    <>
      <div className="container my-3">
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product Rating</th>
              <th>Product Description</th>
              {service.login.isLoggedIn && service.admin.isadmin && (
                <>
                  <th>Action</th>
                  <th>UpdateData</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {Titem.map((val, index) => {
              if (
                val.product_name &&
                val.product_disp &&
                val.product_rating &&
                val.product_price !== ""
              ) {
                return (
                  <tr key={index}>
                    <td className="td">{index + 1}</td>
                    <td className="td">{val.product_name}</td>
                    <td className="td">{val.product_price}</td>
                    <td className="td">{val.product_rating}</td>
                    <td className="td">{val.product_disp}</td>
                    {service.login.isLoggedIn && service.admin.isadmin && (
                      <>
                        <td className="td">
                          <DeleteIcon onClick={() => handleDelete(val._id)}/>
                        </td>
                        <td className="td">
                          <ModeEditIcon onClick={() => handleUpdate(val._id,val)} />
                        </td>
                      </>
                    )}
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GetData;
