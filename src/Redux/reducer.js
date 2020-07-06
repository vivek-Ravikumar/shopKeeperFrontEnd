import {
  ADD_PRODUCT,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  CALCULATE_BILL,
  COMPLETE_TRANSACTION,
  COMPLETE_TRANSACTION_REQUEST,
  TRANSACTION_SUCCESS,
  TRANSACTION_FAILURE,
  FETCH_ALL_TRANSACTIONS_REQUEST,
  FETCH_ALL_TRANSACTIONS_SUCCESS,
  FETCH_ALL_TRANSACTIONS_FAILURE
} from "./Actions/actionTypes";

const initialState = {
  allProducts: [],
  allTransactions: [],
  addedProducts: [],
  currentProduct: {
    cName: "",
    cNumber: "",
    pName: "",
    quantity: 1,
    price: "",
    pId: ""
  },
  loading: false,
  error: "",
  billAmount: 0
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

    case CALCULATE_BILL:
      let sum = 0;
      const newArray = state.addedProducts.map(prod => {
        sum = sum + prod.quantity * prod.price;
        return 0;
      });

      return {
        ...state,
        billAmount: sum
      };

    case COMPLETE_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true
      };

    case TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        billAmount: 0,
        addedProducts: [],
        error: "",
        currentProduct: {
          cName: "",
          cNumber: "",
          pName: "",
          quantity: 1,
          price: "",
          pId: ""
        }
      };

    case TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: " Transaction Failed",
        currentProduct: {
          cName: "",
          cNumber: "",
          pName: "",
          quantity: 1,
          price: "",
          pId: ""
        }
      };
    case COMPLETE_TRANSACTION:
      return {
        ...state,
        billAmount: 0,
        addedProducts: [],
        error: "",
        currentProduct: {
          cName: "",
          cNumber: "",
          pName: "",
          quantity: 1,
          price: "",
          pId: ""
        }
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

    case FETCH_ALL_TRANSACTIONS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_ALL_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        allTransactions: action.payload
      };
    default:
      return state;
  }
};

export default Reducer;
