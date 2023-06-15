import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Acontext } from '../App';

const Navebar = () => {
  const { service, handleLogout} = useContext(Acontext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Access Portel</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active"  aria-current="page" to="/">Home</Link>
            </li>
            {!service.login.isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/register">Register</Link>
                </li>
              </>
            )}
            {service.login.isLoggedIn && service.admin.isadmin &&(
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to="/additem" >Add Item</Link>
                </li>
                
              </>
            )}
            {service.login.isLoggedIn && service.user.isuser &&(
              <>
              </>
            )}
            {service.login.isLoggedIn && service.customer.iscustomer && (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to="/additem" >Add Item</Link>
                </li>  
              </>
            )}
            {service.login.isLoggedIn &&(
              <><li className="nav-item">
                  <Link className="nav-link active" to="/info" >INFO</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link active " id='' onClick={handleLogout}>Logout</button>
                </li>
                </>
                )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navebar;
