import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Image} from 'react-native';

interface MessageProps {
  _id: string;
  text: string;
  images?: Array<string>;
  createdAt: string;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
  isMe: boolean;
}
const Message: React.FC<MessageProps> = ({isMe, images, text, user}) => {
  return (
    <View
      style={(styles.messageContainer, isMe ? styles.isMe : styles.isFriend)}>
      <View style={(styles.messageItem, isMe ? styles.isMe : styles.isFriend)}>
        <Image
          source={{uri: user.avatar}}
          style={isMe ? styles.avatarMe : styles.avatarFriend}
        />

        <View style={styles.messageContent}>
          <View>
            <Text>{text}</Text>
          </View>

          {images && images.length > 0 && (
            <View style={styles.messageImageContainer}>
              {images.map((img, index) => (
                <Image
                  source={{uri: img}}
                  style={styles.messageImage}
                  key={index}
                />
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  isMe: {flexDirection: 'row-reverse', marginTop: 12},
  isMeAvatar: {marginLeft: 8},
  isFriend: {flexDirection: 'row', marginTop: 12},
  isFriendAvatar: {marginRight: 8},
  messageContainer: {
    width: '100%',
  },
  messageItem: {
    marginTop: 12,
    padding: 12,
    width: '100%',
    alignItems: 'flex-start',
  },
  avatarMe: {
    width: 40,
    height: 40,
    borderRadius: 12,
    marginLeft: 4,
  },
  avatarFriend: {
    width: 40,
    height: 40,
    borderRadius: 12,
    marginRight: 4,
  },
  messageContent: {
    width: '80%',
    borderRadius: 12,
    padding: 8,
    backgroundColor: '#F1F1F1',
    flexDirection: 'column',
  },
  messageImageContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
  },
  messageImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 8,
  },
});

export default Message;
