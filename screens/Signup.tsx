import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import userService from '../services/userService';

const Signup = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const handleSignup = () => {
    if (!phoneNumber || !password || !confirmPass) {
      Alert.alert('Vui lòng nhập đầy đủ thông tin');
    } else {
      if (
        password.length >= 8 &&
        confirmPass.length >= 8 &&
        password === confirmPass
      ) {
        userService
          .getUserByPhone(phoneNumber)
          .then(() => {
            Alert.alert('Số điện thoại đã được đăng ký rồi');
          })
          .catch(() => {
            return navigation.navigate('Otp', {phoneNumber, password});
          });
      } else {
        Alert.alert('Vui lòng nhập lại confirm password!');
      }
    }
  };
  return (
    <View>
      <View>
        <Text style={styless.text}>SIGN UP</Text>
      </View>
      <View style={styless.formSignup}>
        <Text style={styless.textSmall}>First create your account</Text>
        <View>
          <TextInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            placeholder="Confirm password"
            value={confirmPass}
            onChangeText={setConfirmPass}
            secureTextEntry
          />
        </View>
      </View>
      <View style={styless.btnSubmit}>
        <Button title="SIGN UP" color="#aedb3e" onPress={handleSignup} />
      </View>
      <Text
        style={styless.textFooter}
        onPress={() => {
          navigation.navigate('Signin');
        }}>
        Already have Account? Login
      </Text>
    </View>
  );
};
const styless = StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 200,
  },
  formSignup: {
    width: 382,
    height: 353,
    marginLeft: 10,
    marginRight: 10,
  },
  textSmall: {
    textAlign: 'center',
    marginTop: 70,
    marginBottom: 70,
  },
  btnSubmit: {
    width: 350,
    height: 50,
    alignSelf: 'center',
    borderRadius: 50,
    marginTop: 50,
    fontSize: 30,
  },
  textFooter: {
    marginTop: 30,
    alignSelf: 'center',
  },
});

export default Signup;
