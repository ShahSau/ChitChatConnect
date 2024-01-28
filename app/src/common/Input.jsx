import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native'
import React from 'react'

const Input = ({title, value, setValue, error, setError, secureTextEntry=false}) => {
    return (
      <View>
        <Text style={{...styles.text, color: error ? "#ff5555": "#70747a"}} >
          {error ? error : title}
        </Text>
        <TextInput 
          secureTextEntry={secureTextEntry}
          autoCapitalize='none'
          autoComplete='off'
          style={{...styles.input, borderColor: error ? "#ff5555": "#70747a"}}
          value={value}
          onChangeText={text => {
            setValue(text)
            if (error){
              setError('')
            }
          }
            
          }

        />
      </View>
    )
}

export default Input

const styles = StyleSheet.create({
  text:{
    marginVertical:6,
    paddingLeft:16
  },
  input:{
    backgroundColor:"#e1e2e4",
    borderWidth:1,
    borderRadius:26,
    height:52,
    paddingHorizontal:16,
    fontSize:16
  }
    
})
