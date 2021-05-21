import React, { useContext, useEffect, useState } from 'react'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { default as theme } from './components/assets/theme.json'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import MainNavigator from './components/layout/MainNavigator'
import AuthNavigator from './components/layout/AuthNavigator'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { AuthContext } from './src/context/AuthContext'

const App = () => {
  const [isDark, setDark] = useState(false)
  const { user } = useContext(AuthContext)
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '47676114882-8m1osf08id292fkjk0e8dc7h46et4od8.apps.googleusercontent.com',
    })
    console.log(user)
  }, [user])

  if (!user) {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />

        <ApplicationProvider
          {...eva}
          theme={{ ...eva[isDark ? 'dark' : 'light'], ...theme }}
        >
          <AuthNavigator />
        </ApplicationProvider>
      </>
    )
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />

      <ApplicationProvider
        {...eva}
        theme={{ ...eva[isDark ? 'dark' : 'light'], ...theme }}
      >
        <MainNavigator setDark={setDark} isDark={isDark} />
      </ApplicationProvider>
    </>
  )
}

export default App
