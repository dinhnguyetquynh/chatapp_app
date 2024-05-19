import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Otp from '../screens/otpScreens';
import Signup from '../screens/Signup';
import Signin from '../screens/Signin';

import HomeScreen from '../screens/HomeScreen';
import RouterBottom from './RouterBottom';
import MessageScreen from '../screens/message-screen';
import AddFriend from '../screens/AddFriend';
import InformUser from '../screens/InformUser';

export type RootStackParamList = {
  Home: undefined;
  Signin: undefined;
  Otp: undefined;
  Signup: {phoneNumber?: string; password?: string};
  Message: undefined;
  AddFriend: undefined;
  UpdateInfo: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const RootStack = createNativeStackNavigator();

const Root = () => {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="Home" component={RouterBottom} />
      <Stack.Screen name="Message" component={MessageScreen} />
      <Stack.Screen name="AddFriend" component={AddFriend} />
      <Stack.Screen name="UpdateInfo" component={InformUser} />
    </Stack.Navigator>
  );
};
export default function AppRouter() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Root" component={Root} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
