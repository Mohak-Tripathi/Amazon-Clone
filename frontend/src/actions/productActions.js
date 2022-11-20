import axios from "axios";

import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
} from "../constants/productConstants";

export const getProducts = (currentPage= 1) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });

    const { data } = await axios.get(`api/v1/products?page=${currentPage}`);

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message
    });
  }
};


// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}



export const getProductDetails = (id) => async (dispatch) => {
  try {

      dispatch({ type: PRODUCT_DETAILS_REQUEST})

      const { data } = await axios.get(`/api/v1/product/${id}`)

      dispatch({
          type: PRODUCT_DETAILS_SUCCESS,
          payload: data
      })

  } catch (error) {
      dispatch({
          type: PRODUCT_DETAILS_FAIL,
          payload: error.response.data.message
      })
  }
}

export const newReview = (reviewData) => async (dispatch) => {
  try {

      dispatch({ type: NEW_REVIEW_REQUEST})

      const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }

      const { data } = await axios.put(`/api/v1/review`, reviewData, config)

      dispatch({
          type: NEW_REVIEW_SUCCESS ,
          payload: data.success
      })

  } catch (error) {
      dispatch({
          type: NEW_REVIEW_FAIL ,
          payload: error.response.data.message
      })
  }
}