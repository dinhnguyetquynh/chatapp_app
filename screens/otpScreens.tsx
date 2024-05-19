import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
// import {OtpInput} from 'react-native-otp-entry';
import {RouteProp, useRoute} from '@react-navigation/native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {RootStackParamList} from '../navigation/router';
import authService from '../services/authService';
import localStorageService from '../services/localStorageService';
import {APP_KEY} from '../common/constant';
const image = {
  uri: 'https://arkesel.com/wp-content/uploads/2023/12/otp-illustrations.png',
};
type OtpScreenRouteProp = RouteProp<RootStackParamList, 'Otp'>;
export default function Otp({navigation}) {
  const route = useRoute<OtpScreenRouteProp>();
  const {phoneNumber, password} = route.params;
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult>();
  const [code, setCode] = useState('');

  useEffect(() => {
    const _phoneNumber = phoneNumber.split('');
    _phoneNumber[0] = '+84';
    signInWithPhoneNumber(_phoneNumber.join(''))
      .then(() => {
        console.log('gui otp thanh cong');
      })
      .catch(error => {
        console.log('gui otp that bai', error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function signInWithPhoneNumber(phoneNumber1: string) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber1);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    if (confirm) {
      try {
        await confirm.confirm(code);
        console.log('thanh cong');
        const dataRoute = {phoneNumber, password};
        console.log(dataRoute);
        authService
          .signup(dataRoute)
          .then(resp => {
            console.log(phoneNumber.trim(), resp);
            localStorageService
              .setValue(APP_KEY.token, resp.access_token)
              .then(() => console.log('set access_token ok'))
              .catch();
            localStorageService
              .setValue(APP_KEY.refreshToken, resp.refresh_token)
              .then()
              .catch();
            navigation.navigate('UpdateInfo');
          })
          .catch(error => console.log(error));
      } catch (error) {
        console.log('Invalid code.');
      }
    }
  }

  return (
    <View style={styless.container}>
      <View>
        <LinearGradient
          colors={['#aedb3e', 'white']}
          style={styless.linearGradient}>
          <Text style={styless.title}>OTP Verification</Text>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={styless.image}>
            {/* <Text style={styless.text}>Inside</Text> */}
          </ImageBackground>
        </LinearGradient>
      </View>
      <View style={styless.otp}>
        <Text>We will send you one time password this phone</Text>
        <Text style={{fontWeight: 'bold'}}>{phoneNumber}</Text>
        {/* <OtpInput
          numberOfDigits={6}
          theme={{
            pinCodeContainerStyle: {
              width: 58,
              height: 58,
              borderRadius: 12,
              marginTop: 30,
            },
          }}
          onTextChange={setCode}
        /> */}
        <TextInput
          value={code}
          onChangeText={text => setCode(text)}
          placeholder="Nhap code"
        />
      </View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 50,
        }}>
        <Text>Dont recive the code?</Text>
        <TouchableOpacity>
          <Text> Resend Code</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={styless.btnXacThuc}>
        <Button
          title="XÁC THỰC MÃ OTP"
          color="#aedb3e"
          onPress={() => confirmCode()}
        />
      </View>
    </View>
  );
}
const styless = StyleSheet.create({
  container: {},
  linearGradient: {
    // alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 5,
    height: 420,
  },
  title: {
    fontSize: 30,
    fontFamily: 'SemiBold',
    fontWeight: 'bold',
    marginTop: 15,
    marginLeft: 30,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  otp: {
    margin: 30,
  },
  btnXacThuc: {
    margin: 10,
  },
});
