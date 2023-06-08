// import React from 'react'

const Validationl = ({Edata}) => {
    if (Edata.email.length === 0) {
      alert("Invalid Form, Email cannot be empty");
      return false;
    }
    if (Edata.password.length === 0) {
      alert("Invalid Form, Password cannot be empty");
      return false;
    }
    if (Edata.confirmpassword.length === 0) {
      alert("Invalid Form, Confirm Password cannot be empty");
      return false;
    }
    if (Edata.password !== Edata.confirmpassword) {
      alert("Invalid Form, Passwords do not match");
      return false;
    }
   
    return true;
  };

  const Validationr = ({Edata}) => {
    if (Edata.name.length === 0) {
      alert("Invalid Form, Name cannot be empty");
      return false;
    }
    if (Edata.email.length === 0) {
      alert("Invalid Form, Email cannot be empty");
      return false;
    }
    if (Edata.password.length === 0) {
      alert("Invalid Form, Password cannot be empty");
      return false;
    }
    if (Edata.confirmpassword.length === 0) {
      alert("Invalid Form, Confirm Password cannot be empty");
      return false;
    }
    if (Edata.password !== Edata.confirmpassword) {
      alert("Invalid Form, Passwords do not match");
      return false;
    }
    if (!Edata.role) {
      alert("Invalid Form, Please select a role");
      return false;
    }
    return true;
  };

export {Validationl,Validationr};
