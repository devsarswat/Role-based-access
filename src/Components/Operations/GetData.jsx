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
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Titem.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(Titem.length / itemsPerPage);
  const token = localStorage.getItem("token");
  const [filterDescription, setFilterDescription] = useState("");
  const [filterRating, setFilterRating] = useState("");

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    axios
      .get(Config.apiKeygetdata, { headers: { auth: `${token}` } })
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
    const queryParams = { searchItem: Value };
    if (filterDescription) {
      queryParams.filterDescription = filterDescription;
    }
    if (filterRating) {
      queryParams.filterRating = filterRating;
    }
    axios
      .get(Config.apiKeygetdata, { headers: { auth: `${token}` }, params: queryParams })
      .then((res) => {
        setTitem(res.data);
        setCurrentPage(1);
      })
      .catch((error) => {
        console.error(error);
        setValue("");
      });
  };

  const handleSort = (field) => {
    if (field === sortBy) {
      setSortBy("");
    } else {
      setSortBy(field);
      setFilterDescription("");
      setFilterRating("");
    }
  };

  let sortedItems = [...currentItems];
  if (sortBy !== "") {
    sortedItems.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });
  }

  let filteredItems = sortedItems;
  if (filterDescription) {
    filteredItems = filteredItems.filter((item) => item.product_disp === filterDescription);
  }
  if (filterRating) {
    filteredItems = filteredItems.filter((item) => item.product_rating === filterRating);
  }

  return (
    <>
      <div className="container-body">
        <form className="d-flex input-group w-auto my-1" onSubmit={handleSearch}>
          <input
            placeholder="Enter The Product Name"
            type="text"
            className="form-control shadow-none"
            value={Value}
            onChange={(event) => setValue(event.target.value)}
            style={{ outline: "none" }}
          />
          <button type="submit" className="btn btn-success mx-2">
            Search
          </button>
          <button className="btn btn-warning" onClick={handleReset}>
            Reset
          </button>
        </form>
      </div>
      <div className="container my-3">
        {Titem.length === 0 ? (
          <p>Data not available. Please try again.</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Product Rating</th>
                  <th>Product Description</th>
                  {service.login.isLoggedIn && service.admin.isadmin && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((val, index) => {
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
                          <td className="td">
                            <DeleteIcon
                              className="mx-1 btn-i btn-icon"
                              onClick={() => handleDelete(val._id)}
                            />
                            <ModeEditIcon
                              onClick={() => handleUpdate(val._id, val)}
                              className="btn-i btn-icon-1"
                            />
                          </td>
                        )}
                      </tr>
                    );
                  } else {
                    return null;
                  }
                })}
              </tbody>
            </table>
        <div className="sort-dropdown">
          <label htmlFor="sort">Sort By:</label>
          <select id="sort" value={sortBy} onChange={(e) => handleSort(e.target.value)}>
            <option value="">None</option>
            <option value="product_name">Product Name</option>
            <option value="product_price">Product Price</option>
            <option value="product_rating">Product Rating</option>
            <option value="product_disp">Product Description</option>
          </select>
          <label htmlFor="filterDescription">Filter Description:</label>
          <select
            id="filterDescription"
            value={filterDescription}
            onChange={(e) => setFilterDescription(e.target.value)}
          >
            <option value="">All</option>
            <option value="Good">Good</option>
            <option value="Bad">Bad</option>
          </select>
          <label htmlFor="filterRating">Filter Rating:</label>
          <select
            id="filterRating"
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
          >
            <option value="">All</option>
            <option value="1 Star">1 Star</option>
            <option value="2 Star">2 Star</option>
            <option value="3 Star">3 Star</option>
            <option value="4 Star">4 Star</option>
            <option value="5 Star">5 Star</option>
          </select>
        </div>
        {/* pagination */}
        <footer>
          <div className="Pagination">
            <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
              Prev
            </button>
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
        </>
        )}
      </div>
    </>
  );
};

export default GetData;
