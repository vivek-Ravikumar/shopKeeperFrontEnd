import {
  ADD_PRODUCT,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  DELETE_PRODUCT,
  EDIT_PRODUCT
} from "./Actions/actionTypes";
import { useDispatch } from "react-redux";

const initialState = {
  allProducts: [],
  addedProducts: [],
  currentProduct: { cName: "", cNumber: "", pName: "", quantity: 1, price: "" },
  loading: false,
  error: ""
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        addedProducts: [...state.addedProducts, action.payload]
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        addedProducts: state.addedProducts.filter(
          pr => pr.pName !== action.payload
        )
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        currentProduct: action.payload
      };
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        allProducts: action.payload,
        loading: false,
        error: ""
      };

    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        allProducts: []
      };

    default:
      return state;
  }
};

export default Reducer;
