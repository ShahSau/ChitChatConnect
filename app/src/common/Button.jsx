import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'


const Button =({title, onPress}) =>{
    return(
      <TouchableOpacity 
        style={styles.container}
        onPress={onPress}
      >
        <Text style={styles.text}>
          {title}
        </Text>
      </TouchableOpacity>
    )
  }
export default Button

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#202020",
    borderRadius:26,
    height:52,
    justifyContent:'center',
    alignItems:'center',
    marginTop:20
  },
  text:{
    color:"#fff",
    fontSize:16,
    fontWeight:'bold'
  }
})
