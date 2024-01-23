import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, {useLayoutEffect} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import RequestsScreen from "./Requests"
import FriendsScreen from "./Friends"
import ProfileScreen from "./Profile"

const Tab = createBottomTabNavigator()

const HomeScreen = ({navigation}) => {

  // this layout effect is called before useEffect and before the component is rendered
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])
  return (
    <Tab.Navigator 
      screenOptions={({route, navigation})=>({
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
  }
})