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
  SLIDE_CREATE_RESET,
} from '../constants/sliderConstants'

export const slidesListReducer = (state = { slides: [] }, action) => {
  switch (action.type) {
    case SLIDE_LIST_REQUEST:
      return { loading: true, slides: [] }
    case SLIDE_LIST_SUCCESS:
      return {
        loading: false,
        slides: action.payload.slides,
      }
    case SLIDE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const slidesDetailsReducer = (state = { slide: {} }, action) => {
  switch (action.type) {
    case SLIDE_DETAILS_REQUEST:
      return { loading: true, ...state }
    case SLIDE_DETAILS_SUCCESS:
      return {
        loading: false,
        slides: action.payload.products,
      }
    case SLIDE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const slideCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SLIDE_CREATE_REQUEST:
      return { loading: true }
    case SLIDE_CREATE_SUCCESS:
      return { loading: false, success: true, slide: action.payload }
    case SLIDE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case SLIDE_CREATE_RESET:
      return {}
    default:
      return state
  }
}
