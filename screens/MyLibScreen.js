import * as React from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, StatusBar, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { MiniBookPreview } from '../elements/Book/MiniBookPreview';
import { LoadScreen } from '../elements/LoadScreen';
import { PagesPaginate } from '../elements/PagesPaginate';
import { ScreenMessage } from '../elements/ScreenMessage';


export default function MyLibScreen({ navigation }) {

  const [books, setBooks] = useState({ data: {} });
  const [pages, setPage] = useState();
  const [murkup, setMurkup] = useState(<LoadScreen />);

  const GetMyBook = async () => {
    setMurkup(<LoadScreen />);
    let collection = await AsyncStorage.getItem('books');
    collection = JSON.parse(collection);
    if (collection.length <= 0) {
      setMurkup(<ScreenMessage message={'У вас пока нет избранных книг'} />);
      return;
    }
    setBooks({ data: collection })
    paginate(collection, 0)
  };

  useEffect(() => {
    GetMyBook();
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
    setBooks({ data: slice })
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
