const DataConformation = ({Edata}) => {
    if (!Edata.product_name.trim() && !Edata.product_price.trim() && !Edata.product_disp.trim() && !Edata.product_rating) {
        alert('Please fill in all the form fields');
        return false;
      }
    else {if (!Edata.product_name.trim()) {
    alert("Product Name is required")
    return false;
    }
    else if (!Edata.product_price.trim()) {
    alert("Product Price is required")
    return false;
    }
    else if (!Edata.product_disp.trim()) {
    alert("Product Description is required")
    return false;
    }
    else if (!Edata.product_rating) {
    alert("Product Rating is required")
    return false;
    }}
    return true;
  };
export default DataConformation
