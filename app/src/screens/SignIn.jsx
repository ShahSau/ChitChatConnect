import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native'
import React, {useState, useLayoutEffect} from 'react'
import Title from '../common/Title'
import Input from '../common/Input'
import Button from '../common/Button'




const SignInScreen = ({navigation}) => {

  // convert this to use useReducer
  const [username, setUsername] =useState('')
  const [password, setPassword] =useState('')
  const [usernameError, setUsernameError] =useState('')
  const [passwordError, setPasswordError] =useState('')

  // this layout effect is called before useEffect and before the component is rendered
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  const onSignIn = () => {
  // checking if username and password are empty
  const failUsername = !username
  if (failUsername) {
    setUsernameError('Username is required')
  }

  const failPassword = !password
  if (failPassword) {
    setPasswordError('Password is required')
  }

  // if username and password are empty, break out of the function
  if (failUsername || failPassword) {
    return
  }


  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior='height' style={{flex:1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.view}>
            <Title text="ChitChat Connect" color="#202020"/>
            <Input 
              title="Username"
              value={username}
              setValue ={setUsername}
              error={usernameError}
              setError={setUsernameError}

            />
            <Input 
              title="password" 
              value={password}
              setValue ={setPassword}
              error={passwordError}
              setError={setPasswordError}
              secureTextEntry={true}
            />
            <Button title="Sign In" onPress={onSignIn}/>

            <Text style={styles.text}>
              Don't have an account? <Text 
                style={styles.signup}
                onPress={() => navigation.navigate('SignUp')}
              >
                  Sign Up
              </Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    view: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal:20,
    },
    text:{
      textAlign:"center",
      marginTop:40
    },
    signup:{
      color:"#0000FF",
      fontWeight:'bold'
    }
})