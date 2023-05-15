import { StyleSheet, View, SafeAreaView, ScrollView, StatusBar, FlatList } from 'react-native';
import * as React from 'react';
import { Button, Text } from 'react-native-elements';
import { useState, useEffect } from 'react';
import { MiniBookPreview } from '../elements/Book/MiniBookPreview';
import { LoadScreen } from '../elements/LoadScreen';
import { NotResponse } from '../elements/NotResponse';
export default function AutoInfoScreen({ navigation, route }) {
  const [author, setAuthor] = useState({ data: { name: '', discription: '' } });
  const [pages, setPage] = useState();
  const [books, setBooks] = useState();
  const [murkup, setMurkup] = useState(<LoadScreen />);

  const getAutoBook = (a_code) => {
    let url = 'http://flibapi.tmweb.ru/get_book_author/' + a_code;
    let response = fetch(url, { method: 'GET', })
      .then((response) => response.json())
      .then((responseJson) => {
        setAuthor({ data: responseJson });
        paginate(responseJson.book, 0);
      })
      .catch((error) => {
        setMurkup(<NotResponse />);
      });
  };

  const paginate = (bk, page) => {
    setMurkup(<LoadScreen />);
    let num_bk = 50
    let lenght = Object.keys(bk).length
    let pg = lenght / num_bk
    pg = pg.toFixed(0)
    let pgarr = []
    for (let i = 0; i < pg; i++) {
      pgarr[i] = { i }
    }
    let start = num_bk * page
    let end = page + 1
    let slice = bk.slice(start, end * num_bk);
    setBooks(slice)
    if (pg >= 0) {
      setPage(pgarr)
    }
  }

  useEffect(() => {
    getAutoBook(route.params.a_code, 0)
  }, [])

  const Paginate = () => {
    return (
      <View style={styles.paginate}>
        <View style={styles.list}>
          <FlatList data={pages} horizontal={true} renderItem={({ item }) => (
            <Button
              key={item.key}
              title={item.i + 1}
              onPress={() => {
                paginate(author.data.book, item.i)
              }}
              buttonStyle={styles.but_p}
            />
          )}
          />
        </View>
      </View>
    );
  }

  useEffect(() => {
    setMurkup(
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.body}>
            <Text style={styles.span}>{author.data.name && author.data.name ? 'Автор:' + author.data.name : ''}</Text>
            <Text style={styles.span}>{author.data.discription && author.data.discription ? 'О себе:' + author.data.discription : ''}</Text>
            <Text style={styles.h1} >Книги</Text>
            <Paginate />
            <FlatList data={books} renderItem={({ item }) => (
              <MiniBookPreview book={item} navigation={navigation} />
            )} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }, [books])

  return murkup;
}

const styles = StyleSheet.create({
  body: {
    padding: 20
  },
  block: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%'
  },
  h1: {
    fontSize: 25,
    marginRight: 20
  },
  span: {
    fontSize: 20,
    margin: 5,
    flex: 1,
    flexWrap: 'wrap'
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  intro: {
    fontSize: 15,
    padding: 5
  },
  but: {
    backgroundColor: '#008d83',
  },
  paginate: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  list: {
    width: '100%',

  },
  but_p: {
    width: 50,
    padding: 5,
    borderRadius: 0,
    backgroundColor: '#008d83',
  }
});