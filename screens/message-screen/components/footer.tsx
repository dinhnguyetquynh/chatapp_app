import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import messageService from '../../../services/messageService';
import {Asset, launchImageLibrary} from 'react-native-image-picker';

const MessageFooter = ({conversation, user, refresh}) => {
  const [message, setMessage] = useState<string>('');
  const [images, setImages] = useState<Array<Asset>>([]);

  const handleChooseImage = async () => {
    try {
      const result = await launchImageLibrary({mediaType: 'photo'});
      if (Array.isArray(result.assets)) {
        setImages(result.assets);
      }
    } catch (error) {
      console.log('err chooose image -> ', error);
    }
  };

  const handleSendMessage = () => {
    if (conversation && user) {
      const formData = new FormData();
      formData.append('conversationId', conversation._id);
      formData.append('senderId', user._id);
      formData.append('text', message);

      images.forEach(file =>
        formData.append('files', {
          uri: file?.uri,
          type: file?.type,
          name: file?.fileName,
        }),
      );
      messageService
        .sendMessage(formData)
        .then(() => {
          console.log(images);
          refresh();
        })
        .catch(() => {})
        .finally(() => setMessage(''));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleChooseImage}>
        <MaterialIcons name="attach-file" size={36} color={'#000'} />
      </TouchableOpacity>
      <View style={styles.inputMess}>
        <View>
          <TextInput
            placeholder="Nhập tin nhắn ..."
            style={styles.textInput}
            multiline
            onChangeText={setMessage}
            value={message}
          />
        </View>
        <TouchableOpacity onPress={handleSendMessage}>
          <FeatherIcon name="send" size={32} color={'#0162C4'} />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputMess: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#F3F3F3',
    marginBottom: 8,
    borderRadius: 20,
    borderColor: '#D8D8D8',
    borderWidth: 2,
    margin: 8,
    paddingHorizontal: 8,
    flex: 1,
  },
  textInput: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: '#F3F3F3',
    width: 280,
    height: 'auto',
  },
});
export default MessageFooter;
