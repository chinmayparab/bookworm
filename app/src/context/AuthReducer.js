import {
    SIGNUP_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    LOGOUT,
    GOOGLE_LOG,
    FB_LOG,
  } from './types'
//   import { _removeData, _storeData } from '../../utils/localStorage'
  
  const AuthReducer = (state, action) => {
    switch (action.type) {
      case GOOGLE_LOG:
        return {
          ...state,
          user: action.payload,
        }
        case FB_LOG:
          return {
            ...state,
            user: action.payload,
          }
      case USER_LOADED:
        return {
          ...state,
          user: action.payload,
        }
      case SIGNUP_SUCCESS:
        return {
          ...state,
        }
      case LOGIN_SUCCESS:
        // _storeData('@authToken', action.payload)
        return {
          ...state,
          isAuth: true,
          authToken: action.payload,
        }
      case LOGOUT:
      case LOGIN_FAIL:
        // _removeData('@authToken')
        return {
          ...state,
          error: action.payload,
          isAuth: false,
          authToken: '',
          user: null,
        }
      default:
        return state
    }
  }
  
  export default AuthReducer
  