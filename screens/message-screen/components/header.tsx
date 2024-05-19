import React from 'react';
import {Image} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';

interface MessageHeader {
  onBack: () => void;
  name: string;
  status: boolean;
  avatar: string;
}

const MessageHeader: React.FC<MessageHeader> = ({
  onBack,
  name,
  status,
  avatar,
}) => {
  return (
    <View style={styles.headerContainer}>
      <IconButton icon="keyboard-backspace" size={24} onPress={onBack} />
      <Image
        source={{
          uri: avatar,
        }}
        style={styles.avaChat}
      />
      <View style={styles.textInfo}>
        <Text>{name}</Text>
        <Text>{status ? 'Online' : 'Offline'}</Text>
      </View>
      <View style={styles.iconHead}>
        <IconButton icon="phone-outline" size={24} />
        <IconButton icon="video-outline" size={24} />
        <IconButton icon="format-list-bulleted" size={24} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBlockColor: 'grey',
    flexDirection: 'row',
    height: 60,
  },
  avaChat: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginTop: 7,
  },
  textInfo: {
    marginLeft: 10,
    marginTop: 10,
    width: '35%',
  },
  iconHead: {
    flexDirection: 'row',
    marginLeft: 8,
  },
});

export default MessageHeader;
