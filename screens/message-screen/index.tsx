/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';

import MessageHeader from './components/header';
import MessageFooter from './components/footer';
import Message from './components/message';
import useSWR, {mutate} from 'swr';
import conversationService from '../../services/conversationService';
import {userStore} from '../../store/userStore';
import messageService from '../../services/messageService';
import moment from 'moment';

interface IMessage {
  _id: string;
  text: string;
  images: Array<string>;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
    avatar: string;
  };
  isMe: boolean;
}

export default function MessageScreen({route, navigation}) {
  const {conversationId} = route.params;
  const {user} = userStore();
  const {data, isLoading} = useSWR(`/conversations/${conversationId}`, () =>
    conversationService.getConversationById(conversationId),
  );

  const flatListRef = useRef(null);

  const {
    data: messageData,
    isLoading: messageLoading,
    mutate: refresh,
  } = useSWR(
    `/messages/${conversationId}`,
    () => messageService.getMessageListByConversationId(conversationId),
    {refreshInterval: 1000},
  );

  useEffect(() => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({animated: true});
      }, 200);
    }
  }, [messageData]);
  let conversation = {};
  if (data && user) {
    const friend = data.members.find(_user => user._id !== _user._id);
    conversation =
      data.members.length > 2
        ? {
            _id: conversationId,
            name: data.name,
            img: data.avatar,
          }
        : {
            _id: conversationId,
            name: friend.displayName,
            img: friend.avatar,
          };
  } else {
    conversation = {name: '', img: ''};
  }

  return isLoading ? (
    <Text>Đang tải</Text>
  ) : (
    <View style={styles.container}>
      <MessageHeader
        avatar={conversation.img}
        name={conversation.name}
        onBack={() => {
          navigation.goBack();
        }}
        status={true}
      />

      {messageLoading ? (
        <Text>Loading</Text>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messageData ? messageData.messages.reverse() : []}
          renderItem={({item}) => {
            const _data = {
              _id: item._id,
              text: item.text,
              createdAt: moment(item.createdAt).fromNow(),
              images: item.files,
              user: {
                _id: item.senderId._id,
                name: item.senderId.displayName,
                avatar: item.senderId.avatar,
              },
              isMe: user?._id === item.senderId._id,
            };
            return <Message {..._data} />;
          }}
          style={styles.messages}
          keyExtractor={item => item._id}
        />
      )}

      {/* return textinput to chat */}
      <MessageFooter
        conversation={conversation}
        user={user}
        refresh={refresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'column'},
  messages: {flex: 1, backgroundColor: '#ccc', padding: 4},
});
