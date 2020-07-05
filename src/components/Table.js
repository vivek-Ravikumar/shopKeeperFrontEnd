import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { deleteProduct, editProduct } from "../Redux/Actions/actions";
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
    minWidth: 400
  }
});

function CustomizedTables({ addedProducts, deleteProduct }) {
  const classes = useStyles();

  const deleteFunction = event => {
    const { id } = event.target;
    // const updatedAddedProducts = addedProducts.filter(
    //   product => product.pName !== id
    // );
    // console.log(updatedAddedProducts);
    deleteProduct(id);
  };
  const editFunction = event => {
    const pName = event.target.id;

    const editedProductArray = addedProducts.filter(
      prod => prod.pName === pName
    );
    console.log(editedProductArray);
    editProduct(editedProductArray[0]);
    // alert(pName);
    //editProduct()
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
          {addedProducts.map(row => (
            <StyledTableRow key={row.cName}>
              <StyledTableCell component="th" scope="row">
                {row.cName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.pName}</StyledTableCell>
              <StyledTableCell align="right">{row.quantity}</StyledTableCell>
              <StyledTableCell align="right">{row.price}</StyledTableCell>
              <StyledTableCell align="right">
                {row.price * row.quantity}{" "}
                <i
                  id={row.pName}
                  onClick={deleteFunction}
                  class="fas fa-trash"
                />{" "}
                <i id={row.pName} onClick={editFunction} class="fas fa-edit" />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = state => {
  return {
    addedProducts: state.addedProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteProduct: pName => dispatch(deleteProduct(pName)),
    editProduct: editedProduct => dispatch(editProduct(editedProduct))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomizedTables);
