import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SignUp from '../screens/SignUp'

const Stack = createStackNavigator()

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='SignUp' component={SignUp} />
    </Stack.Navigator>
  )
}

export default AuthNavigator
