import { useNavigation } from '@react-navigation/core'
import React, { useContext, useState } from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import BrandIcon from 'react-native-vector-icons/FontAwesome5Pro'
import { AuthContext } from '../../src/context/AuthContext'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin'

const SignUp = ({ navigation }) => {
  const { goBack } = useNavigation()
  const { error, googleLogin, fbLogin } = useContext(AuthContext)

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [name, setName] = useState()
  const [cPassword, setCPassword] = useState()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(error)

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible)
  }

  if (errors) {
    Alert.alert('Sign Error', 'My Alert Msg', [
      {
        text: 'Cancel',
        onPress: () => setErrors(''),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => setErrors('') },
    ])
  }

  const handleLogin = async () => {
    setLoading(true)
    //   console.log({ email, password })
    googleLogin()

    setLoading(false)
  }

  return (
    <KeyboardAvoidingView style={styles.wrapper} behavior='padding'>
      <View style={styles.semi1} />
      <View style={styles.semi2} />
      <View style={styles.wrapper}>
        <View style={styles.innerWrapper}>
          <Text style={styles.title}>Sign In</Text>
          {/* <TextInput
            style={styles.inputId}
            placeholder='Name'
            placeholderTextColor='#b6b7b7'
            value={name}
            onChangeText={(e) => setName(e)}
          />
          <TextInput
            style={styles.inputId}
            placeholder='Email Address'
            placeholderTextColor='#b6b7b7'
            value={email}
            onChangeText={(e) => setEmail(e)}
          />
          <TextInput
            style={styles.inputPwd}
            placeholder='Password'
            placeholderTextColor='#b6b7b7'
            value={password}
            onChangeText={(e) => setPassword(e)}
          />
          <TextInput
            style={styles.inputPwd}
            placeholder='Confirm Password'
            placeholderTextColor='#b6b7b7'
            value={cPassword}
            onChangeText={(e) => setCPassword(e)}
          />
          <View style={styles.authContainer}>
            <TouchableOpacity
              style={styles.button}
              // labelStyle={{ color: "#fff" }}
              disabled={loading}
              // onPress={handleLogin}
            >
              <Text style={styles.buttonText}>
                {loading ? (
                  <ActivityIndicator color='#bbedfb' size='large' />
                ) : (
                  'Sign Up'
                )}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.helper}>
              <Text style={styles.forgot}>OR</Text>
            </TouchableOpacity>
          </View> */}

          <View style={styles.provContainer}>
            <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={googleLogin}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  roundies: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  semi1: {
    backgroundColor: '#ec9cab',
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    position: 'absolute',
    top: 100,
    right: -70,
  },
  semi2: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    backgroundColor: '#ec9cab',
    position: 'absolute',
    top: 280,
    left: -55,
  },
  helper: {
    marginTop: 20,
    width: Dimensions.get('window').width - 220,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#00000000',
  },
  parenty: {
    backgroundColor: '#fefffe',
  },
  wrapper: {
    minHeight: Dimensions.get('window').height,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 0,
  },
  innerWrapper: {
    marginBottom: 40,
  },
  title: {
    color: '#000',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgot: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    //   alignItems:"center",
    //   justifyContent:"center",
    // alignSelf:"flex-end"
  },
  inputId: {
    backgroundColor: '#e9e8e8',
    borderWidth: 1,
    borderColor: '#ccccccaa',
    color: 'black',
    borderRadius: 50,
    fontSize: 18,
    width: Dimensions.get('window').width - 70,
    marginTop: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    height: 50,
  },
  inputPwd: {
    backgroundColor: '#e9e8e8',
    borderWidth: 1,
    borderColor: '#ccccccaa',
    borderRadius: 50,
    fontSize: 18,
    width: Dimensions.get('window').width - 70,
    marginTop: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    height: 50,
  },
  button: {
    display: 'flex',
    marginTop: 20,
    width: Dimensions.get('window').width - 220,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#39e1f2',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  authContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  provContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },
})
