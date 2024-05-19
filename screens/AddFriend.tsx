import {View, Text, TextInput, StyleSheet, Image, FlatList} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
const DATA = [
  {
    avatar:
      'https://i.pinimg.com/736x/22/a3/df/22a3df6838f3eccb39d50c7c650bcdbe.jpg',
    displayName: 'Nami',
  },
  {
    avatar:
      'https://i.pinimg.com/originals/3e/83/7e/3e837e039e5f6769b38e24d4fafc6eda.jpg',
    displayName: 'Zoro',
  },
];
const ItemFriend = ({img, userName}) => {
  return (
    <View>
      <View style={styles.cardAdd}>
        <View style={styles.info}>
          <Image
            source={{
              uri: img,
            }}
            style={{width: 70, height: 70, borderRadius: 12}}
          />
          <View style={styles.text}>
            <Text>{userName}</Text>
            <Text>Xin chào, kết bạn với tôi nhé!</Text>
          </View>
        </View>
        <View style={styles.containBtn}>
          <Button style={{backgroundColor: '#ff7d7d', width: '40%'}}>
            Xóa
          </Button>
          <Button style={{backgroundColor: '#2ab682', width: '40%'}}>
            Đồng ý
          </Button>
        </View>
      </View>
    </View>
  );
};
export default function AddFriend() {
  return (
    <View>
      <View style={styles.head}>
        <Text style={styles.textHead}>Add Friends</Text>
      </View>
      <FlatList
        data={DATA}
        renderItem={({item}) => (
          <ItemFriend img={item.avatar} userName={item.displayName} />
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
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
  info: {
    flexDirection: 'row',
    marginLeft: 20,
    padding: 10,
  },
  text: {
    marginLeft: 10,
    marginVertical: 5,
  },
  containBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  cardAdd: {
    borderRadius: 12,
    backgroundColor: '#d6d7ef',
    width: '97%',
    height: 150,
    marginLeft: 5,
    marginTop: 10,
  },
});
