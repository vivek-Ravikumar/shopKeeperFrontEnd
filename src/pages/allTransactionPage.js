import React, { Fragment, useEffect } from "react";
import Table from "../components/Table";
import { connect } from "react-redux";
import { fetchAllTransactions } from "../Redux/Actions/actions";
const AllTransactionPage = ({ allTransactions, fetchAllTransactions }) => {
  useEffect(() => {
    console.log(allTransactions);
    fetchAllTransactions();
  }, [fetchAllTransactions]);

  return (
    <Fragment>
      <h2> All Transactions </h2>
      {allTransactions.length > 0 &&
        allTransactions.map(transaction => {
          return <Table transacProducts={transaction} />;
        })}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    allTransactions: state.allTransactions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllTransactions: () => dispatch(fetchAllTransactions())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllTransactionPage);
