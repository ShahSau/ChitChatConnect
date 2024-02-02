import { StyleSheet, Text, Touchable, TouchableOpacity, View, Image } from 'react-native'
import React, {useEffect, useLayoutEffect} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import RequestsScreen from "./Requests"
import FriendsScreen from "./Friends"
import ProfileScreen from "./Profile"
import useGlobal from '../core/global'
import Thumbnail from '../common/Thumbnail'


const Tab = createBottomTabNavigator()

const HomeScreen = ({navigation}) => {

  const socktConnect = useGlobal(state => state.socketConnect)
  const socketClose = useGlobal(state => state.socketClose)
  const user = useGlobal(state => state.user)

  // this layout effect is called before useEffect and before the component is rendered
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  useEffect(() => {
    socktConnect()
    return () => {
      socketClose()
    }
  }, [])
  
  return (
    <Tab.Navigator 
      screenOptions={({route, navigation})=>({
        headerLeft: () => (
					<View style={styles.headerLeft}>
						{/* <Image 
              source={require('../assets/placeholder.jpg')}
              style={styles.profilePicture}
            /> */}
            <Thumbnail
              url={(Object.keys(user).includes('tokens')) ? user.user.thumbnail : user.thumbnail}
              size={28}
              style={styles.profilePicture}
            />
					</View>
				),
        headerRight:()=>(
          <TouchableOpacity>
            <FontAwesomeIcon
              style={styles.searchButton}
              icon='magnifying-glass'
              size={22}
              color="#404040" 
            />
          </TouchableOpacity>
      ),
        tabBarIcon:({focused, color, size})=>{
          const icons = {
            Requests: 'bell',
            Friends: 'user-group',
            Profile: 'circle-user'
          }
          const icon = icons[route.name]
          return <FontAwesomeIcon icon={icon} size={28} color={color} />
        },
        tabBarActiveTintColor: '#202020',
				tabBarShowLabel: false
      })}
    >
      <Tab.Screen name="Requests" component={RequestsScreen} />
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  searchButton: {
    marginRight: 16
  },
  profilePicture: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ccc'
  },
  headerLeft: {
    marginLeft: 16
  }
})