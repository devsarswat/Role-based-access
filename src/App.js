import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navebar from './Components/Navebar';
import Home from './Components/Home';
import Lin from './Components/Lin';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import Registration from './Components/Registration';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navebar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Lin/>} />
          <Route exact path="/Register" element={<Registration/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
