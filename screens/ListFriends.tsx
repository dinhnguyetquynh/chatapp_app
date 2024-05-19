import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon, IconButton, MD3Colors} from 'react-native-paper';
import friendService from '../services/friendService';
import {Friend} from '../models/friend';
import userService from '../services/userService';
import {UserRes} from '../models/user';
import {userStore} from '../store/userStore';

const Item = ({_id, imgUri, nameUser, phoneNumber, isFriend, userId}) => {
  const AddFriend = () => {
    friendService
      .addFriend({senderId: userId, receiverId: _id})
      .then(() => {
        Alert.alert('Gửi lời mời kết bạn thành công');
      })
      .catch(err => {
        console.log('loi addfr', err);
      });
  };
  return (
    <View>
      <TouchableOpacity>
        <View style={styles.message}>
          <View style={styles.img_and_mes}>
            <Image source={{uri: imgUri}} style={styles.imgAva} />
            <View style={styles.last_mes}>
              <Text style={styles.name}>{nameUser}</Text>
              <Text>{phoneNumber}</Text>
            </View>
          </View>
          {!isFriend ? (
            <IconButton
              icon="account-plus-outline"
              size={24}
              onPress={AddFriend}
            />
          ) : (
            <View style={styles.iconBtn}>
              <IconButton icon="phone" size={24} />
              <IconButton icon="video-outline" size={24} />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default function ListFriends({navigation}) {
  const {user} = userStore();
  const [friendList, setFriendList] = useState<Friend[]>([]);
  const [yourPhone, setYourPhone] = useState('');
  const [friendFoundedList, setFriendFoundedList] = useState<Array<UserRes>>(
    [],
  );

  useEffect(() => {
    friendService
      .getListFriend()
      .then(data => {
        setFriendList(data);
      })
      .catch(err => {
        console.log(err);
        setFriendList([]);
      });
  }, []);

  const handleSearch = () => {
    userService
      .getUserByPhone(yourPhone)
      .then(user => {
        setFriendFoundedList([user]);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (!yourPhone) {
      setFriendFoundedList([]);
    }
  }, [yourPhone]);

  return user ? (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.textHead}>List Friend</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Root', {screen: 'AddFriend'})}>
          <Image source={require('../assets/img/Vector.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.search}>
        <TextInput
          placeholder="Search"
          value={yourPhone}
          onChangeText={setYourPhone}
        />
        <IconButton
          icon="account-search-outline"
          size={20}
          onPress={handleSearch}
        />
      </View>
      <View style={styles.countFriend}>
        <Text style={{fontWeight: 'bold'}}>Tất cả 95</Text>
      </View>
      <FlatList
        data={yourPhone ? friendFoundedList : friendList}
        renderItem={({item}) => (
          <Item
            imgUri={item.avatar}
            nameUser={item.displayName}
            phoneNumber={item.phoneNumber}
            isFriend={user?.friends.includes(item._id)}
            _id={item._id}
            userId={user._id}
          />
        )}
        keyExtractor={item => item._id}
      />
    </View>
  ) : null;
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  message: {
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    margin: 8,
    borderRadius: 12,
  },
  img_and_mes: {
    flexDirection: 'row',
  },
  imgAva: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  last_mes: {
    marginLeft: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  iconBtn: {
    flexDirection: 'row',
  },
  countFriend: {
    width: 80,
    padding: 10,
    backgroundColor: '#615EF00F',
    borderRadius: 12,
    margin: 8,
  },
});
