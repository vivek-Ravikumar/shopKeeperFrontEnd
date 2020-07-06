import {
  ADD_PRODUCT,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  COMPLETE_TRANSACTION_REQUEST,
  CALCULATE_BILL,
  TRANSACTION_SUCCESS,
  TRANSACTION_FAILURE,
  FETCH_ALL_TRANSACTIONS_REQUEST,
  FETCH_ALL_TRANSACTIONS_SUCCESS,
  FETCH_ALL_TRANSACTIONS_FAILURE
} from "./actionTypes";

export const addProduct = addedProduct => {
  return {
    type: ADD_PRODUCT,
    payload: addedProduct
  };
};

export const calculateBill = () => {
  return {
    type: CALCULATE_BILL
  };
};

export const fetchAllTransactions = () => {
  return async dispatch => {
    try {
      dispatch(fetchAllTransactionRequest());

      const response = await fetch(
        "https://imj1m.sse.codesandbox.io/api/transaction/all"
      );
      const data = await response.json();
      if (data.status === "success") {
        dispatch(fetchAllTransactionsSuccess(data.allTransactions));
        console.log(data.allTransactions);
        // alert("success");
      } else {
        dispatch(fetchAllTransactionsFailure("failed"));
        alert("failed");
      }
    } catch (err) {
      console.error(err);
      dispatch(fetchAllTransactionsFailure(err));
      alert("failed");
    }
  };
};

export const fetchAllTransactionRequest = () => {
  return {
    type: FETCH_ALL_TRANSACTIONS_REQUEST
  };
};

export const fetchAllTransactionsSuccess = allTransactions => {
  return {
    type: FETCH_ALL_TRANSACTIONS_SUCCESS,
    payload: allTransactions
  };
};

export const fetchAllTransactionsFailure = () => {
  return {
    type: FETCH_ALL_TRANSACTIONS_FAILURE
  };
};

export const completeTransaction = tData => {
  return async dispatch => {
    try {
      dispatch(completeTransactionRequest);
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tData)
      };
      const response = await fetch(
        "https://imj1m.sse.codesandbox.io/api/transaction",
        config
      );
      const data = await response.json();
      if (data.status === "success") {
        dispatch(transactionSuccess(data.status));
        alert("success");
      } else {
        dispatch(transactionFailure("failed"));
        alert("failed");
      }
    } catch (err) {
      console.error(err);
      dispatch(transactionFailure(err));
      alert("failed");
    }
  };
};

export const completeTransactionRequest = () => {
  return {
    type: COMPLETE_TRANSACTION_REQUEST
  };
};
export const transactionSuccess = () => {
  return {
    type: TRANSACTION_SUCCESS
  };
};

export const transactionFailure = () => {
  return {
    type: TRANSACTION_FAILURE
  };
};

export const editProduct = editedProduct => {
  return {
    type: EDIT_PRODUCT,
    payload: editedProduct
  };
};

export const deleteProduct = pName => {
  return {
    type: DELETE_PRODUCT,
    payload: pName
  };
};

export const fetchProductsRequest = () => {
  return {
    type: FETCH_PRODUCTS_REQUEST
  };
};

export const fetchProductsSuccess = products => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products
  };
};

export const fetchProductsFailure = error => {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    payload: error
  };
};

export const fetchAllProducts = () => {
  return async dispatch => {
    try {
      dispatch(fetchProductsRequest);
      const response = await fetch(
        "https://imj1m.sse.codesandbox.io/api/product"
      );
      const data = await response.json();

      dispatch(fetchProductsSuccess(data.products));
    } catch (err) {
      console.error(err);
      dispatch(fetchProductsFailure(err));
    }
  };
};
