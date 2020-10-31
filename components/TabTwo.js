import React, { useEffect } from 'react';
import Authentication from 'app/functions/Authentication';
import {
  FlatList, Image, RefreshControl, ScrollView,
} from 'react-native';
import Firebase from 'app/functions/Firebase';
import firebase from 'firebase';
import style from 'app/style_sheet/Style';
import { Text, View } from 'app/components/Themed';

export default function TabTwo() {
  const [cursor, setCursor] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

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

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        Authentication.signInAnonymously();
      }
    });
    getItems();
  }, []);

  // Item
  const Item = ({ img, text, createdAt }) => (
    <View style={style.box}>
      <View style={style.itemList}>
        <View>
          <Image
            resizeMode="cover"
            source={{ uri: img }}
            style={style.itemImg}
          />
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <Text style={style.itemText}>
              {text}
            </Text>
          </ScrollView>
          <Text style={style.itemDate}>
            {createdAt}
          </Text>
        </View>
      </View>
    </View>
  );

  // renderItem
  const renderItem = ({ item }) => (
    <Item
      img={item.img}
      text={item.text}
      createdAt={item.created_at.toDate().toLocaleDateString()}
    />
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReachedThreshold={0.1}
      onEndReached={onEndReached}
    >
      <View style={{ width: '100%' }} />
    </FlatList>
  );
}
