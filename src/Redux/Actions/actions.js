import {
  ADD_PRODUCT,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  DELETE_PRODUCT,
  EDIT_PRODUCT
} from "./actionTypes";

export const addProduct = addedProduct => {
  return {
    type: ADD_PRODUCT,
    payload: addedProduct
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
