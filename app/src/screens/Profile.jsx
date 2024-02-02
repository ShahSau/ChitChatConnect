import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import useGlobal from '../core/global'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import * as ImagePicker from 'expo-image-picker';
import Thumbnail from '../common/Thumbnail'
import utils from '../core/utils';

const ProfileLogout = ()=> {
	const logout = useGlobal(state => state.logout)


	return (
		<TouchableOpacity
			onPress={logout}
			style={styles.logout}
		>
			<FontAwesomeIcon
				icon='right-from-bracket'
				size={20}
				color='#d0d0d0'
				style={{ marginRight: 12}}
			/>
			<Text
				style={styles.logoutText}
			>
				Logout
			</Text>
		</TouchableOpacity>
	)
}

const ProfileImage = ()=> {
	const uploadThumbnail = useGlobal(state => state.uploadThumbnail)
  

	const user = useGlobal(state => state.user)

  const pickImage = async () => {

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });


    if (!result.canceled) {
      uploadThumbnail(result.assets[0])
    }
  };

	return (
		<TouchableOpacity 
			style={{ marginBottom: 20 }}
			onPress={() => {
				pickImage()
			}}
		>
      <Thumbnail
        url={(Object.keys(user).includes('tokens')) ? user.user.thumbnail : user.thumbnail}
        size={180}
      /> 
      <View 
        style={styles.iconview}
      >
        <FontAwesomeIcon
          icon='camera'
          size={15}
          color='#d0d0d0'
        />
      </View>
      
			
		</TouchableOpacity>
	)
}



const ProfileScreen = () => {
  const user = useGlobal(state => state.user)

  return (
    <View style ={{flex:1, alignItems:'center', paddingTop:100}}>
      <ProfileImage />
      <Text
        style={styles.text}
      >
        {(Object.keys(user).includes('tokens')) ? user.user.name : user.name}
      </Text>
      <Text
        style={styles.username}
      >
        @{(Object.keys(user).includes('tokens')) ? user.user.username : user.username}
      </Text>

      <ProfileLogout />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({

  image: {
  width: 180,
  height: 180,
  borderRadius: 90,
  backgroundColor: '#ccc',
  marginBottom: 20
  },

  text:{
    textAlign: 'center',
    color:'#303030',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6
  },

  username:{
    textAlign: 'center',
    color:'#606060',
    fontSize: 14,
  },

  logout:{
    flexDirection: 'row',
		height: 52,
    borderRadius: 26,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 26,
		backgroundColor: '#202020',
		marginTop: 40
  },

  logoutText:{
    fontWeight: 'bold',
		color: '#d0d0d0'
  },
  iconview:{
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#202020',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff'
  }

})