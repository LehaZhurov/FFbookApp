import * as React from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, StatusBar, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { LoadScreen } from '../elements/LoadScreen';
import { NotResponse } from '../elements/NotResponse';
import { GenrePreview } from '../elements/Genre/GenrePreview';

export default function GenreScreen({ navigation }) {

  const [genre, setGenre] = useState({ data: {} });
  const [murkup, setMurkup] = useState(<LoadScreen />);

  const GetGenre = () => {
    setMurkup(<LoadScreen />)
    let url = 'http://flibapi.tmweb.ru/get_genre';
    fetch(url, { method: 'GET', })
      .then((response) => response.json())
      .then((responseJson) => {
        setGenre({ data: responseJson })
      })
      .catch((error) => {
        setMurkup(<NotResponse />)
      });
  };

  useEffect(() => {
    GetGenre()
  }, [])

  useEffect(() => {
    setMurkup(<SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <FlatList data={genre.data} renderItem={({ item }) => (
            <GenrePreview genre={item} navigation={navigation} />
          )} />
        </View>
      </ScrollView>
    </SafeAreaView>)
  }, [genre])

  return murkup;
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