import axios from 'axios'
import {
  SLIDE_LIST_REQUEST,
  SLIDE_LIST_SUCCESS,
  SLIDE_LIST_FAIL,
  SLIDE_DETAILS_REQUEST,
  SLIDE_DETAILS_SUCCESS,
  SLIDE_DETAILS_FAIL,
  SLIDE_CREATE_REQUEST,
  SLIDE_CREATE_SUCCESS,
  SLIDE_CREATE_FAIL,
  SLIDE_UPDATE_SUCCESS,
  SLIDE_UPDATE_FAIL,
  SLIDE_UPDATE_REQUEST,
  SLIDE_DELETE_SUCCESS,
  SLIDE_DELETE_FAIL,
  SLIDE_DELETE_REQUEST,
} from '../constants/sliderConstants'

export const listSlides = () => async (dispatch) => {
  try {
    dispatch({ type: SLIDE_LIST_REQUEST })

    const { data } = await axios.get(`/api/slider`)

    dispatch({
      type: SLIDE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SLIDE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listSlidesDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SLIDE_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/slider/${id}`)

    dispatch({
      type: SLIDE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SLIDE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createSlide = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SLIDE_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/slider`, {}, config)

    dispatch({
      type: SLIDE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SLIDE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateSlide = (slide) => async (dispatch, getState) => {
  try {
    dispatch({ type: SLIDE_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/slider/${slide._id}`, slide, config)

    dispatch({ type: SLIDE_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SLIDE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteSlide = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SLIDE_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/slider/${id}`, config)

    dispatch({
      type: SLIDE_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: SLIDE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
