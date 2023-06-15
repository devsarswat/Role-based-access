import React from 'react'
import { useParams,useNavigate} from 'react-router-dom';
import axios from 'axios';

const DeletItem = () => {
  const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
    axios
      .delete(`http://192.168.0.197:4000/delete/${id}`, {
        headers: { auth: ` ${token}` },
      })
      .then(()=>navigate('/info'))
      .catch((error) => {
        console.log(error);
        alert("An error occurred while deleting the item. Please try again.");
      });
  };
  return (
    <>
        
    </>
  )
}

export default DeletItem
