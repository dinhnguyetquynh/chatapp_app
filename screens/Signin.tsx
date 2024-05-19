/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import localStorageService from '../services/localStorageService';
import authService from '../services/authService';
import {APP_KEY} from '../common/constant';
const Signin = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   localStorageService
  //     .getValue(APP_KEY.token)
  //     .then(() => navigation.navigate('Home'))
  //     .catch();
  // }, []);

  const handleLogin = () => {
    const data = {phoneNumber, password};
    if (!phoneNumber || !password) {
      Alert.alert('Vui lòng nhập đầy đủ thông tin');
    }

    authService
      .login(data)
      .then(resp => {
        localStorageService.setValue(APP_KEY.token, resp.access_token);
        localStorageService.setValue(APP_KEY.refreshToken, resp.refresh_token);
        navigation.navigate('Home');
      })
      .catch(error => console.error(error));
  };
  return (
    <View>
      <View>
        <Text style={styless.text}>SIGN IN</Text>
      </View>
      <View style={styless.formSignup}>
        <View>
          <TextInput
            placeholder="Số điện thoại"
            style={styless.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TextInput
            placeholder="Mật khẩu"
            style={styless.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>
      <View style={styless.btnSubmit}>
        <Button title="ĐĂNG NHẬP" color="#aedb3e" onPress={handleLogin} />
      </View>
      <Text style={styless.textFooter}>Already have Account? Login</Text>
    </View>
  );
};

const styless = StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 150,
  },
  formSignup: {
    width: 382,
    height: 353,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 70,
  },
  input: {
    height: 50,
    marginBottom: 50,
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
    fontSize: 30,
  },
  textFooter: {
    marginTop: 30,
    alignSelf: 'center',
  },
});

export default Signin;
