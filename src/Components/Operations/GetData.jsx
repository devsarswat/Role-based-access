import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Acontext } from "F:/reactjs 6/role_based_acess/src/App";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Config from "../Config";

const GetData = () => {
  const { service } = useContext(Acontext);
  const [Titem, setTitem] = useState([]);
  const [Value, setValue] = useState("");
  const navigate = useNavigate();
  const[currentPage,setCurrentPage]=useState(1);
  const[itemsPerPage]=useState(4);
  const indexOfLastItem =currentPage*itemsPerPage
  const indexOfFirstItem =indexOfLastItem -itemsPerPage
  const currentItems=Titem.slice(indexOfFirstItem,indexOfLastItem)
  const totalPages=Math.ceil(Titem.length/itemsPerPage)
  const token = localStorage.getItem('token');
  const handlePageChange=(pageNumber)=>{
    setCurrentPage(pageNumber);
  }
  useEffect(() => {
    
    axios
      .get(Config.apiKeygetdata,{headers: { auth: `${token}`}})
      .then((res) => {
        console.log(res.data);
        setTitem(res.data);
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred. Please try again.");
      });
  }, [token]);

  const handleDelete = (id) => {
    navigate(`/delete/${id}`);
  };
  const handleUpdate = (id, data) => {
    navigate(`/update/${id}`, { state: data });
  };
  const handleReset = () => {
    setValue("");
  };
  const handleSearch = (event) => {
    event.preventDefault();
    axios
      .get(`${Config.apiKeygetdata}?searchItem=${Value}`,{headers: { auth: `${token}`}})
      .then((res) => {
        setTitem(res.data);
        setCurrentPage(1);
      })
      .catch((error) => {
        console.error(error);
        setValue("");
      });
  };

  return (
    <>
      <div>
        <form className="d-flex input-group w-auto my-1" onSubmit={handleSearch}>
          <input
            placeholder="Enter The Product Name"
            type="text"
            className="form-control shadow-none"
            value={Value}
            onChange={(event) => setValue(event.target.value)}
            style={{ outline: "none" }}
          />
          <button type="submit" className="btn btn-success mx-2">Search</button>
          <button className="btn btn-warning" onClick={handleReset}>
            Reset
          </button>
        </form>
      </div>
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
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((val, index) => {
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
                          <DeleteIcon className="mx-1  btn-i btn-icon" onClick={() => handleDelete(val._id)} />
                          <ModeEditIcon
                            onClick={() => handleUpdate(val._id, val)}
                            className=" btn-i btn-icon-1"
                          />
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
        {/* pagination */}
        <footer>
        <div className="Pagination">
        <button disabled={currentPage===1} onClick={()=>handlePageChange(currentPage-1)}>Prev</button>
        {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
        </footer>
        
      </div>
    </>
  );
};

export default GetData;
