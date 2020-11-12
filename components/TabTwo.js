import React, { useEffect } from 'react';
import {
  Alert, Image, RefreshControl, ScrollView,
} from 'react-native';
import Firebase from 'app/functions/Firebase';
import Modal from 'react-native-modal';
import style from 'app/style_sheet/Style';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Text, TouchableOpacity, View } from 'app/components/Themed';

export default function TabTwo() {
  const [cursor, setCursor] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [target, setTarget] = React.useState(null);

  const getItems = async (cursor = null) => {
    setRefreshing(true);
    const response = await Firebase.getItems(cursor);
    if (!response.error) {
      setItems(cursor ? items.concat(response.data) : response.data);
      setCursor(response.cursor);
    }
    setRefreshing(false);
  };

  const onRefresh = async () => {
    setCursor(null);
    await getItems();
  };

  const onEndReached = async () => {
    if (!loading && cursor) {
      setRefreshing(true);
      await getItems(cursor);
      setLoading(false);
    }
  };

  function onTextPress(item = null) {
    if (item) {
      setTarget(item);
      setIsModalVisible(true);
    } else {
      setTarget(null);
      setIsModalVisible(false);
    }
  }

  const onDeletePress = async (data) => {
    const response = await Firebase.deleteItem(data.item);
    if (!response.error) {
      setItems(
        items.filter((item) => item.id !== data.item.id),
      );
    } else {
      Alert.alert('削除できませんでした。');
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const Item = (props) => (
    <View style={style.box}>
      <View style={style.itemList}>
        <View>
          <Image
            resizeMode="cover"
            source={{ uri: props.item.img }}
            style={style.itemImg}
          />
        </View>
        <View style={{ flex: 1, height: 120 }}>
          <TouchableOpacity onPress={() => onTextPress(props.item)}>
            <Text style={style.itemText}>
              {props.item.text}
            </Text>
          </TouchableOpacity>
          <Text style={style.itemDate}>
            {props.item.created_at.toDate().toLocaleDateString()}
          </Text>
        </View>
      </View>
      { /** モーダル  * */ }
      {target && (
      <Modal animationType="slide" isVisible={isModalVisible} swipeToClose>
        <View>
          <View>
            <Image
              resizeMode="cover"
              source={{ uri: target.img }}
              style={{ height: 350 }}
            />
          </View>
          <View style={{ height: 250 }}>
            <ScrollView>
              <Text style={style.modalText}>
                {target.text}
              </Text>
            </ScrollView>
            <TouchableOpacity
              onPress={() => onTextPress()}
            >
              <Text
                lightColor="black"
                darkColor="white"
                style={style.modalClose}
              >
                閉じる
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      )}
    </View>
  );

  return (
    <SwipeListView
      data={items}
      renderItem={({ item }) => <Item item={item} />}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
     }
      onEndReachedThreshold={0.1}
      onEndReached={onEndReached}
      renderHiddenItem={(data) => (
        <View>
          <TouchableOpacity
            lightColor="black"
            darkColor="white"
            style={{
              alignSelf: 'flex-end',
              width: 75,
              height: '100%',
            }}
            onPress={() => onDeletePress(data)}
          >
            <Text
              lightColor="white"
              darkColor="black"
              style={style.delete}
            >
              削除
            </Text>
          </TouchableOpacity>
        </View>
      )}
      rightOpenValue={-75}
      disableRightSwipe
    >
      <View style={{ width: '100%' }} />
    </SwipeListView>
  );
}
