import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Acontext } from '../App';

const Navebar = () => {
  const { isLoggedIn, handleLogout } = useContext(Acontext);

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
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/register">Register</Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <button className="btn btn-link nav-link active" onClick={handleLogout}>Logout</button>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/card" >Card</Link>
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
