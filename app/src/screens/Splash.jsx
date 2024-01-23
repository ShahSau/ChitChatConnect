import { 
  StyleSheet, 
  StatusBar, 
  Dimensions,
  SafeAreaView, 
  View,
  Animated,
} from 'react-native'
import React, {useEffect, useLayoutEffect} from 'react'
import Title from '../common/Title'

const SplashScreen = ({navigation}) => {

  // this layout effect is called before useEffect and before the component is rendered
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])
  
  const translateY = new Animated.Value(0)
  const duration = 800

  useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(translateY, {
					toValue: 20,
					duration: duration,
					useNativeDriver: true
				}),
				Animated.timing(translateY, {
					toValue: 0,
					duration: duration,
					useNativeDriver: true
				})
			])
		).start()
	}, [])
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.View style={[{ transform: [{ translateY }] }]}>
        <Title text="ChitChat Connect" color="#fff"/>
      </Animated.View>
    </SafeAreaView>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 48,
        fontWeight: 'bold',
    },
})