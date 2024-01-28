import React, {useState} from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import SplashScreen from './src/screens/Splash';
import SignUpScreen from './src/screens/SignUp';
import SignInScreen from './src/screens/SignIn';
import HomeScreen from './src/screens/Home';
import MessageScreen from './src/screens/Message';
import SearchScreen from './src/screens/Search';
import './src/core/fontawesome';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const stack = createNativeStackNavigator();
const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f0f0f0',
  }
}

export default function App() { 

  const [initialized, setInitialized] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  return (
      <NavigationContainer theme={LightTheme}>
        <StatusBar barStyle="dark-content" />
        <stack.Navigator>
          {
          !initialized ? (
            <>
              <stack.Screen name="Splash" component={SplashScreen} />
            </>
          ): !authenticated ? (
            <>
              <stack.Screen name="SignIn" component={SignInScreen} />
              <stack.Screen name="SignUp" component={SignUpScreen} />
            </>
          ): (
            <>
              <stack.Screen name="Home" component={HomeScreen} />
              <stack.Screen name="Search" component={SearchScreen} />
              <stack.Screen name="Messages" component={MessageScreen} />
            </>
          )
          }
          
        </stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
