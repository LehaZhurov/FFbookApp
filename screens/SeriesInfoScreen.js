import * as React from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, StatusBar, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { MiniBookPreview } from '../elements/Book/MiniBookPreview';
import { LoadScreen } from '../elements/LoadScreen';
import { NotResponse } from '../elements/NotResponse';
import { PagesPaginate } from '../elements/PagesPaginate';

export default function SeriesInfoScreen({ navigation, route }) {

  const [books, setBooks] = useState({ data: {} });
  const [murkup, setMurkup] = useState(<LoadScreen />);
  const [pages, setPage] = useState();

  const getSeriesBook = (s_code) => {
    setMurkup(<LoadScreen />)
    let url = 'http://flibapi.tmweb.ru/get_book_serial/' + s_code + "/" + 0;
    fetch(url, { method: 'GET', })
      .then((response) => response.json())
      .then((responseJson) => {
        setBooks({ data: responseJson })
      })
      .catch((error) => {
        setMurkup(<NotResponse />)
      });
  };

  useEffect(() => {
    getSeriesBook(route.params.s_code)
  }, [])

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
    setMurkup(<>
      <SafeAreaView style={styles.container}>
        <ScrollView >
          <View style={styles.books}>
            <FlatList data={books.data} renderItem={({ item }) => (
              <MiniBookPreview book={item} navigation={navigation} />
            )} />
            <PagesPaginate collection={books.data} paginator={paginate} pages={pages} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>)
  }, [books])

  return murkup;
}

const styles = StyleSheet.create({
  books: {
    padding: 20
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});