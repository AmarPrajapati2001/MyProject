import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    const res = await getAxios('https://api.whitelabelapp.in/v2/product/list/1');
    setData(res);
    setIsLoading(false);
  }

  const getAxios = async (endpoint: string) => {
    return axios
      .get(endpoint)
      .then((response) => response.data)
      .then((json) => {
        return json;
      })
      .catch((error) => {
        return error;
      });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.text}> Title :- {item?.name}</Text>
        {item?.description && (
          <Text style={styles.text} numberOfLines={3}>
            Description :- {item?.description}
          </Text>
        )}
        {item?.images.map((el) => {
          return (
            <Image
              style={styles.image}
              source={{ uri: el?.photo }}
              key={el?.id}
            />
          )
        })}
      </View>
    )
  }



  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} />
        </View>) :
         <FlatList
        data={data}
        keyExtractor={(item, index) => index?.toString()}
        style={styles.main}
        renderItem={(item) => renderItem(item)}
      />}
    </SafeAreaView>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  item: {
    padding: 10,
    width: '90%',
    backgroundColor: 'gray',
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center'
  },
  main: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  image: {
    height: 100,
    width: '80%',
    marginTop: 10,
    borderRadius: 10
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF'
  }
});

