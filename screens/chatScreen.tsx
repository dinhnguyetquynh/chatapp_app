import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';
import conversationService from '../services/conversationService';
import {ConversationRes} from '../models/conversation';
import useSWR from 'swr';
import moment from 'moment';
import {userStore} from '../store/userStore';
// interface chatList {
//   id: string;
//   img: string;
//   nameUser: string;
//   lastMess: string;
//   lastTime: string;
// }
// const DATA = [
//   {
//     id: '1',
//     // img: '../assets/img/ava.jpg',
//     img: '../assets/img/ava.jpg',
//     nameUser: 'Dinh Nguyet Quynh',
//     lastMess: 'hello dinh nguyet quynh',
//     lastTime: '12min',
//   },
//   {
//     id: '2',
//     img: '../assets/img/ava.jpg',
//     nameUser: 'Tuấn Cường',
//     lastMess: 'hello Quynh',
//     lastTime: '20min',
//   },
// ];
const Item = ({
  conversationId,
  nameUser,
  lastMess,
  lastTime,
  navigation,
  avatar,
}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Root', {
            screen: 'Message',
            params: {
              conversationId: conversationId,
            },
          })
        }>
        <View style={styles.message}>
          <View style={styles.img_and_mes}>
            <Image source={{uri: avatar}} style={styles.imgAva} />
            <View style={styles.last_mes}>
              <Text style={styles.name}>{nameUser}</Text>
              <Text>{lastMess}</Text>
            </View>
          </View>
          <View>
            <Text>{lastTime}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default function ChatScreen({navigation}) {
  // const [listConver, setListConver] = useState<ConversationRes[]>([]);
  // useEffect(() => {
  //   conversationService
  //     .getConversationList()
  //     .then(data => {
  //       setListConver(data);
  //     })
  //     .catch(err => {
  //       console.log('lỗi hiển thị danh sách chat', err);
  //     });
  // });

  const {data = [], isLoading} = useSWR(
    '/conversations',
    () => conversationService.getConversationList(),
    {refreshInterval: 2000},
  );

  const {user} = userStore();
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.textHead}>Tin nhắn</Text>
        <TouchableOpacity>
          <Image source={require('../assets/img/Vector.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.search}>
        <TextInput placeholder="Search" />
      </View>
      {/* <View style={styles.message}>
        <View style={styles.img_and_mes}>
          <Image
            source={require('../assets/img/ava.jpg')}
            style={styles.imgAva}
          />
          <View style={styles.last_mes}>
            <Text style={styles.name}>Đinh Nguyệt Quỳnh</Text>
            <Text>Deadline tối 9h</Text>
          </View>
        </View>

        <View>
          <Text>12 min</Text>
        </View>
      </View> */}
      {isLoading ? (
        <Text>Loading</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({item}) => {
            const friend = item.members.find(_user => user._id !== _user._id);
            return (
              <Item
                nameUser={
                  item.members.length > 2 ? item.name : friend.displayName
                }
                lastMess={
                  item.message
                    ? Array.isArray(item.message.files) &&
                      item.message.files.length > 0
                      ? 'Ảnh ...'
                      : item.message?.text
                      ? item.message?.text
                      : ''
                    : 'Chưa có tin nhắn'
                }
                lastTime={moment(item.updatedAt).fromNow()}
                navigation={navigation}
                avatar={item.members.length > 2 ? item.avatar : friend.avatar}
                conversationId={item._id}
              />
            );
          }}
          keyExtractor={item => item._id}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},

  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'grey',
    borderWidth: 0.5,
    padding: 20,
  },
  textHead: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  search: {
    margin: 20,
    borderRadius: 12,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    backgroundColor: '#F3F3F3',
  },
  message: {
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between',
    backgroundColor: '#7daee1',
    margin: 12,
    borderRadius: 12,
  },
  imgAva: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  img_and_mes: {
    flexDirection: 'row',
  },
  last_mes: {
    marginLeft: 10,
  },
});
