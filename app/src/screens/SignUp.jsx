import { 
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native'
import React, { useLayoutEffect, useState} from 'react'
import Input from '../common/Input'
import Button from '../common/Button'


const SignUpScreen = ({navigation}) => {

  // convert this to use useReducer
  const [username, setUsername] =useState('')
  const [password, setPassword] =useState('')
  const [usernameError, setUsernameError] =useState('')
  const [passwordError, setPasswordError] =useState('')
  const [firstName, setFirstName] =useState('')
  const [lastName, setLastName] =useState('')
  const [firstNameError, setFirstNameError] =useState('')
  const [lastNameError, setLastNameError] =useState('')
  const [confirmPassword, setConfirmPassword] =useState('')
  const [confirmPasswordError, setConfirmPasswordError] =useState('')



  // this layout effect is called before useEffect and before the component is rendered
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])


  const onSignUp = () => {
    const failUsername = !username || username.length < 5
    if (failUsername) {
      setUsernameError('Username is required and must be at least 5 characters')
    }

    const failFirstName = !firstName
    if (failFirstName) {
      setFirstNameError('First name is required')
    }

    const failLastName = !lastName
    if (failLastName) {
      setLastNameError('Last name is required')
    }

    const failPassword = !password && password.length < 8
    if (failPassword) {
      setPasswordError('Password is required')
    }

    const failConfirmPassword = !confirmPassword || confirmPassword !== password
    if (failConfirmPassword) {
      setConfirmPasswordError('Passwords do not match')
    }

    // break out of the function if there are any errors
    if (failUsername || failFirstName || failLastName || failPassword || failConfirmPassword) {
      return
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior='height' style={{flex:1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.view}>
          <Text 
            style={styles.title}
          >
            Sign Up
          </Text>
          <Input 
            title="Username"
            value={username}
            setValue ={setUsername}
            error={usernameError}
            setError={setUsernameError}
          />
          <Input 
            title="First name" 
            value={firstName}
            setValue ={setFirstName}
            error={firstNameError}
            setError={setFirstNameError}
          />
          <Input 
            title="Last name"
            value={lastName}
            setValue ={setLastName}
            error={lastNameError}
            setError={setLastNameError} 
          />
          <Input 
            title="Password"
            value={password}
            setValue ={setPassword}
            error={passwordError}
            setError={setPasswordError}
            secureTextEntry={true}
          />
          <Input 
            title="Confirm Password"
            value={confirmPassword}
            setValue ={setConfirmPassword}
            error={confirmPasswordError}
            setError={setConfirmPasswordError} 
            secureTextEntry={true}
          />
          <Button title="Sign Up" onPress={onSignUp}/>

          <Text
            style={styles.text}
          >
            Already have an account? <Text 
              style={styles.signin}
              onPress={() => navigation.goBack()}
            >
              Sign In
            </Text>
          </Text>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  view:{
    flex:1,
    justifyContent:'center',
    paddingHorizontal: 16,
  },
  title:{
    textAlign: 'center', 
    marginBottom: 24, 
    fontSize: 36, 
    fontWeight: 'bold' 
  },
  text:{
    textAlign:"center",
    marginTop:40
  },
  signin:{
    color:"#0000FF",
    fontWeight:'bold'
  }

})