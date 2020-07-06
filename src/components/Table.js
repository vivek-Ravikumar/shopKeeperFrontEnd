import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useLocation } from "react-router-dom";

import {
  deleteProduct,
  editProduct,
  calculateBill,
  completeTransaction
} from "../Redux/Actions/actions";
import { connect } from "react-redux";
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14,
    width: 500
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 400,
    leftMargin: 10,
    rightMargin: 10
  }
});

function CustomizedTables({
  addedProducts,
  deleteProduct,
  editProduct,
  calculateBill,
  billAmount,
  completeTransaction,
  transacProducts = []
}) {
  useEffect(() => {
    setTotal(billAmount);
  }, [billAmount, addedProducts, completeTransaction]);
  const classes = useStyles();
  const location = useLocation();
  let [total, setTotal] = useState(billAmount);

  const deleteFunction = event => {
    const { id } = event.target;
    deleteProduct(id);
    calculateBill();
    setTotal(billAmount);
  };
  const editFunction = event => {
    const pName = event.target.id;
    const editedProductArray = addedProducts.filter(
      prod => prod.pName === pName
    );
    console.log(editedProductArray[0]);
    editProduct(editedProductArray[0]);
    deleteProduct(pName);
    calculateBill();
    setTotal(billAmount);
  };

  const completeFunction = () => {
    const tDataArray = addedProducts.map(prod => {
      return {
        pId: prod.pId,
        quantity: prod.quantity
      };
    });

    const tData = {
      cName: addedProducts[0].cName,
      cNumber: addedProducts[0].cNumber,
      products: tDataArray,
      billAmount: billAmount
    };
    console.log(tData);
    completeTransaction(tData);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Customer Name</StyledTableCell>
            <StyledTableCell align="right">Product</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Total</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {location.pathname === "/"
            ? addedProducts.map(row => (
                <StyledTableRow key={row.pId}>
                  <StyledTableCell component="th" scope="row">
                    {row.cName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.pName}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.quantity}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.price}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.price * row.quantity}{" "}
                    <i
                      id={row.pName}
                      onClick={deleteFunction}
                      className="fas fa-trash"
                    />{" "}
                    <i
                      id={row.pName}
                      onClick={editFunction}
                      className="fas fa-edit"
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))
            : transacProducts.products.map(row => (
                <StyledTableRow key={row.pId.pName}>
                  <StyledTableCell component="th" scope="row">
                    {transacProducts.customer.cName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.pId.pName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.quantity}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.pId.price}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.quantity * row.pId.price}{" "}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
        </TableBody>
      </Table>
      <h3>
        {" "}
        Bill Amount :
        {location.pathname === "/" ? total : transacProducts.billAmount}{" "}
      </h3>
      {location.pathname === "/" && (
        <Button
          variant="contained"
          disabled={addedProducts.length > 0 ? false : true}
          color="primary"
          onClick={completeFunction}
        >
          Complete
        </Button>
      )}
    </TableContainer>
  );
}

const mapStateToProps = state => {
  return {
    addedProducts: state.addedProducts,
    billAmount: state.billAmount
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteProduct: pName => dispatch(deleteProduct(pName)),
    editProduct: editedProduct => dispatch(editProduct(editedProduct)),
    calculateBill: () => dispatch(calculateBill()),
    completeTransaction: tData => dispatch(completeTransaction(tData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomizedTables);
