import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {
  addProduct,
  fetchAllProducts,
  calculateBill
} from "../Redux/Actions/actions";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  }
}));

function InputForm({
  allProducts,
  fetchAllProducts,
  addProduct,
  currentProduct,
  addedProducts,
  calculateBill
}) {
  const classes = useStyles();

  const [purchaseData, setPurchaseData] = useState(currentProduct);

  useEffect(() => {
    fetchAllProducts();
    if (currentProduct.pName !== "") {
      setPurchaseData(currentProduct);
    } else {
      setPurchaseData({
        cName: "",
        cNumber: "",
        pName: "",
        quantity: 1,
        price: "",
        pId: ""
      });
    }
  }, [currentProduct, fetchAllProducts]);

  const handleChange = event => {
    if (event.target.name === "pName") {
      const filteredArray = allProducts.filter(
        prod => prod.pName === event.target.value
      );
      setPurchaseData({
        ...purchaseData,
        [event.target.name]: event.target.value,
        price: filteredArray[0].price,
        pId: filteredArray[0]._id
      });
    } else {
      setPurchaseData({
        ...purchaseData,
        [event.target.name]: event.target.value
      });
    }
  };

  const addFuntion = () => {
    const pArray = addedProducts.map(prod => prod.pName);
    if (pArray.includes(purchaseData.pName)) {
      alert(`already Added ${purchaseData.pName}`);
    } else {
      addProduct(purchaseData);
      calculateBill();
      setPurchaseData(prevState => {
        return {
          ...prevState,
          pName: "",
          quantity: 1,
          price: ""
        };
      });
    }
  };
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="cNumber"
        name="cNumber"
        label="Customer Number"
        onChange={handleChange}
        value={purchaseData.cNumber}
      />{" "}
      <br />
      <TextField
        id="cName"
        name="cName"
        label="Customer Name"
        onChange={handleChange}
        value={purchaseData.cName}
      />
      <br />
      <TextField
        id="pName"
        name="pName"
        select
        value={purchaseData.pName}
        onChange={handleChange}
        helperText="select the product"
      >
        {allProducts.map((option, index) => (
          <MenuItem key={option._id} name="pName" value={option.pName}>
            {option.pName}
          </MenuItem>
        ))}
      </TextField>{" "}
      <br />
      {/* <TextField
        id="price"
        name="price"
        label="Price"
        onChange={handleChange}
        value={purchaseData.price}
      />{" "} */}
      <br />
      <TextField
        id="quantity"
        name="quantity"
        onChange={handleChange}
        type="number"
        label="Quantity"
        value={purchaseData.quantity}
      />{" "}
      <br />
      <Button
        onClick={addFuntion}
        disabled={purchaseData.pName ? false : true}
        variant="contained"
        color="primary"
      >
        Add
      </Button>
    </form>
  );
}

const mapStateToProps = state => {
  return {
    allProducts: state.allProducts,
    currentProduct: state.currentProduct,
    addedProducts: state.addedProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addProduct: addedProduct => dispatch(addProduct(addedProduct)),
    fetchAllProducts: () => dispatch(fetchAllProducts()),
    calculateBill: () => dispatch(calculateBill())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputForm);
