import { StyleSheet, View, SafeAreaView, ScrollView, StatusBar, FlatList, ActivityIndicator } from 'react-native';
import * as React from 'react';
import { Button, Text } from 'react-native-elements';
import { useState, useEffect } from 'react';

export default function GenreScreen({ navigation, route }) {
  const [genre, setGenre] = useState({ data: [{ 'name': 'Загрузка' }] });
  const [genreMarkup, setGenreMarkup] = useState(
    (<View style={[styles.container, styles.horizontal]} >
      <ActivityIndicator />
      <ActivityIndicator size="large" />
      <ActivityIndicator size="small" color="#0000ff" />
      <ActivityIndicator size="large" color="#00ff00" />
    </View >)
  )

  const getGenre = () => {
    fetch('http://flibapi.tmweb.ru/get_genre', { method: 'GET', })
      .then((response) => response.json())
      .then((responseJson) => {
        setGenre({
          data: responseJson
        })
      })
      .catch((error) => {
        setGenreMarkup(
          (<SafeAreaView style={styles.container}>
            <View style={styles.block}>
              <Text style={styles.screenMessage}>Нет интернет подключения</Text>
            </View>
          </SafeAreaView>)
        )
      });
  };
  useEffect(() => {
    getGenre()
  }, [])

  useEffect(() => {
    setGenreMarkup(
      (<SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View>
            <FlatList data={genre.data} renderItem={({ item }) => (
              <><View style={styles.block}>
                <Text style={styles.genreTitle} onPress={() => {
                  navigation.navigate('Книги жанра', { 'g_code': item.g_href })
                }} >{item.g_name}</Text>
              </View></>
            )} />
          </View>
        </ScrollView>
      </SafeAreaView>)
    )
  }, [genre])
  return (
    genreMarkup
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%'
  },
  h1: {
    fontSize: 30,
    marginRight: 20
  },
  genreTitle: {
    fontSize: 25,
    margin: 5,
    flex: 1,
    flexWrap: 'wrap',
    // border: '1px solid black',
    boxShadow: "0px 5px 5px -5px rgba(34, 60, 80, 0.6)",
    padding: '10px',
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});