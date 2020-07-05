import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { addProduct, fetchAllProducts } from "../Redux/Actions/actions";
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
  currentProduct
}) {
  const classes = useStyles();

  const [purchaseData, setPurchaseData] = useState(currentProduct);

  useEffect(() => {
    fetchAllProducts();
    setPurchaseData(currentProduct);
  }, [currentProduct]);

  const handleChange = event => {
    // if (event.target.id === "pName") {
    //   setPurchaseData({
    //     ...purchaseData,
    //     [event.target.id]: event.target.value,
    //     price: purchaseData[event.target.key].price
    //   });
    // } else {
    setPurchaseData({
      ...purchaseData,
      [event.target.name]: event.target.value
    });
    // }
  };

  const addFuntion = () => {
    addProduct(purchaseData);
    setPurchaseData({
      cName: "",
      cNumber: "",
      pName: "",
      quantity: 1,
      price: ""
    });
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
      <TextField
        id="price"
        name="price"
        label="Price"
        onChange={handleChange}
        value={purchaseData.price}
      />{" "}
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
    currentProduct: state.currentProduct
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addProduct: addedProduct => dispatch(addProduct(addedProduct)),
    fetchAllProducts: () => dispatch(fetchAllProducts())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputForm);
