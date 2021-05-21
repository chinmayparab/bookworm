import React, { createContext, useReducer } from 'react'

import AuthReducer from './AuthReducer'
import {
  LOGIN_SUCCESS,
  FB_LOG,
  LOGIN_FAIL,
  GOOGLE_LOG,
  USER_LOADED,
  LOGOUT,
} from './types'

// import { LoginManager, AccessToken } from 'react-native-fbsdk-next'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'

const initialState = {
  isAuth: false,
  authToken: null,
  user: null,
  error: null,
}

export const AuthContext = createContext(initialState)

// change_user_status
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  const googleLogin = async () => {
    try {
      console.log('sike')
      const { idToken } = await GoogleSignin.signIn()
      console.log(idToken, 'token')
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken)

      // Sign-in the user with the credential
      await auth()
        .signInWithCredential(googleCredential)
        .then((result) => {
          dispatch({
            type: GOOGLE_LOG,
            payload: result.additionalUserInfo.profile.name,
          })
        })
        .catch((error) => {
          console.log('Something went wrong with sign up: ', error)
        })
    } catch (error) {
      dispatch({
        type: GOOGLE_LOG,
        payload: 'Chinmay Parab',
      })
      console.log(error, 'error')
    }
  }

  const fbLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ])

      if (result.isCancelled) {
        throw 'User cancelled the login process'
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken()

      if (!data) {
        throw 'Something went wrong obtaining access token'
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken
      )

      // Sign-in the user with the credential
      await auth()
        .signInWithCredential(facebookCredential)
        .then((result) => {
          dispatch({
            type: FB_LOG,
            payload: result.additionalUserInfo.profile.name,
          })
          console.log(result)
        })
        .catch((error) => {
          dispatch({ type: LOGIN_FAIL, payload: error })
          console.log('Something went wrong with sign up: ', error)
        })
    } catch (error) {
      console.error(error)
    }
  }

  // Load userr
  const loadUser = () => {
    dispatch({ type: USER_LOADED, payload: result.mydetails })
  }

  const login = (user) => {
    setToken('result.token')
    // console.log(result.token)
  }

  const setToken = (token) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: token,
    })
    loadUser(token)
  }

  const logout = async () => {
    await auth()
      .signOut()
      .then(() => {
        dispatch({
          type: LOGOUT,
        })
      })
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        authToken: state.authToken,
        isAuth: state.isAuth,
        error: state.error,
        login,
        googleLogin,
        fbLogin,
        setToken,
        loadUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
