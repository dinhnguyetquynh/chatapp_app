import {View, Text, TextInput, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {Button, IconButton} from 'react-native-paper';

import {Asset, launchImageLibrary} from 'react-native-image-picker';
import userService from '../services/userService';
import localStorageService from '../services/localStorageService';
import {APP_KEY} from '../common/constant';
export default function InformUser({navigation}) {
  const [image, setImage] = useState<Asset>();
  const [userName, setUserName] = useState<string>();

  const handleChooseImage = async () => {
    try {
      const result = await launchImageLibrary({mediaType: 'photo'});
      if (Array.isArray(result.assets)) {
        setImage(result.assets[0]);
      }
    } catch (error) {
      console.log('err chooose image -> ', error);
    }
  };

  const handleUpdate = () => {
    if (image && userName) {
      const avatar = {
        uri: image?.uri,
        type: image?.type,
        name: image?.fileName,
      };

      localStorageService
        .getValue(APP_KEY.token)
        .then(value => console.log(value));
      const formData = new FormData();
      formData.append('avatar', avatar);
      formData.append('displayName', userName);

      userService
        .updateUserNameAndAvatar(formData)
        .then(() => {
          console.log('Update oke');
          navigation.navigate('Home');
        })
        .catch(err => {
          console.log('update that bai', err);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.content}>CẬP NHẬT THÔNG TIN CÁ NHÂN</Text>
      </View>
      <View style={styles.textInput}>
        <TextInput
          placeholder="Nhập họ tên"
          value={userName}
          onChangeText={setUserName}
        />
      </View>

      <View style={styles.imageContainer}>
        <Text>Chọn ảnh đại diện của bạn</Text>
        <IconButton
          icon="file-image-outline"
          size={24}
          onPress={handleChooseImage}
        />
      </View>

      {image ? <Image src={image.uri} style={styles.imageSelected} /> : null}

      <Button
        style={styles.btn}
        onPress={handleUpdate}
        disabled={!(image && userName)}>
        Cập nhật
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 100,
    alignItems: 'center',
    flexDirection: 'column',
  },
  content: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    width: '98%',
    margin: 12,
    borderRadius: 12,
    backgroundColor: '#f0dcf4',
    justifyContent: 'center',
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageSelected: {
    width: 200,
    height: 200,
    marginBottom: 12,
    borderRadius: 12,
  },
  btn: {
    borderRadius: 20,
    backgroundColor: '#aedb3e',
    width: '50%',
  },
});
