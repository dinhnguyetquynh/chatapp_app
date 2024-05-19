import React, {Component, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatScreen from '../screens/chatScreen';
import ListFriends from '../screens/ListFriends';
import ProfileScreen from '../screens/ProfileScreen';
import {NavigationContainer} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {Image} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {userStore} from '../store/userStore';
import userService from '../services/userService';
const Tab = createMaterialBottomTabNavigator();
const tabs = [
  {
    name: 'Chat',
    component: ChatScreen,
    icon: <MaterialCommunityIcons name="message-text" size={24} />,
  },
  {
    name: 'ListFriend',
    component: ListFriends,
    icon: <MaterialCommunityIcons name="account-multiple-plus" size={24} />,
  },
  {
    name: 'Profile',
    component: ProfileScreen,
    icon: <MaterialCommunityIcons name="account-circle" size={24} />,
  },
];
const RouterBottom: React.FC = ({navigation}) => {
  const {setUser} = userStore();

  useEffect(() => {
    userService
      .getInfo()
      .then(resp => setUser(resp))
      .catch(() => {
        navigation.navigate('Home');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaProvider>
      <Tab.Navigator initialRouteName="ChatScreen">
        {tabs.map(tab => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={{
              tabBarLabel: tab.name,
              tabBarIcon: () => tab.icon,
            }}
          />
        ))}
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};
export default RouterBottom;
