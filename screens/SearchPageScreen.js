import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TextInput, StatusBar, SafeAreaView, ScrollView, TouchableOpacity, } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { MiniBookPreview } from '../elements/Book/MiniBookPreview';
import { AuthorListElement } from '../elements/Author/AuthorListElement';
import { SeriesListElement } from '../elements/Series/SeriesListElement';
import { PaginateControl } from '../elements/paginateControl';

export default function SearchPageScreen({ navigation }) {

  const [query, setQuery] = useState('');
  const [book, setBook] = useState({ data: { 'name': 'Найдется все,но не точно' } });
  const [page, setPage] = useState(0);
  const [display, setDis] = useState({ opacity: 0 })
  const [filter, setFilter] = useState('all');

  const Search = async (filter, query, page) => {
    if (query[0]) {
      setBook({ data: { 'name': 'Загрузка' } })
    } else {
      setBook({ data: { 'name': 'Заполните поле' } })
      return true
    }
    setFilter(filter);
    let url = '';
    if (filter == 'all') {
      url = 'http://flibapi.tmweb.ru/search/' + query + '/' + page;
    } else if (filter == 'book') {
      url = 'http://flibapi.tmweb.ru/search_book/' + query + '/' + page;
    } else if (filter == 'author') {
      url = 'http://flibapi.tmweb.ru/search_author/' + query + '/' + page;
    } else if (filter == 'series') {
      url = 'http://flibapi.tmweb.ru/search_serial/' + query + '/' + page
    }

    let response = await fetch(url, { method: 'GET' })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        setBook({ data: { 'name': 'Нет интернета' } })
      });
    if (response.error) {
      return;
    }
    if (filter == 'all') {
      setBook({ data: response })
    } else if (filter == 'book') {
      setBook({ data: { book: response } })
    } else if (filter == 'author') {
      setBook({ data: { auto: response } })

    } else if (filter == 'series') {
      setBook({ data: { series: response } })

    }
    setPage(page)
    return true;
  };


  const upPage = () => {
    let thispage = page + 1
    Search(filter, query, thispage);
    setPage(thispage);
  }
  const downPage = () => {
    let thispage = page - 1
    if (page != 0) {
      setPage(thispage);
    } else {
      thispage = 0;
      setPage(thispage);
    }
    Search(filter, query, thispage);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <TextInput
            placeholder="Поиск"
            blurOnSubmit
            autoCorrect={false}
            maxLength={30}
            autoCapitalized="words"
            style={styles.input}
            onChangeText={(text) => setQuery(text)}
          />
          <View style={styles.block_search_from}>
            <Text>Поиск по:</Text>
            <TouchableOpacity style={styles.sort_item} onPress={async () => { Search('book', query, 0) }}><Text style={styles.sort_item_text}>Книгам</Text></TouchableOpacity>
            <TouchableOpacity style={styles.sort_item} onPress={async () => { Search('author', query, 0) }}><Text style={styles.sort_item_text}>Авторам</Text></TouchableOpacity>
            <TouchableOpacity style={styles.sort_item} onPress={async () => { Search('series', query, 0) }}><Text style={styles.sort_item_text}>Сериям</Text></TouchableOpacity>
          </View>
          <Button
            buttonStyle={styles.but_search}
            title={'Искать везде'}
            onPress={() => { Search('all', query, 0) }}
          />
        </View>
        <FlatList
          data={book.data.book}
          style={{}}
          renderItem={({ item }) => (
            MiniBookPreview(item, navigation)
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <FlatList
          data={book.data.auto}
          renderItem={({ item }) => (
            AuthorListElement(item, navigation)
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <FlatList
          data={book.data.series}
          renderItem={({ item }) => (
            SeriesListElement(item, navigation)
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
      <PaginateControl page={page} downPage={downPage} upPage={upPage} />
    </SafeAreaView>

  )

}

const styles = StyleSheet.create({
  but_search: {
    borderRadius: 50,
    color: 'rgb(32, 137, 220)',
    flexShrink: 1, flexWrap: 'wrap',
    backgroundColor: '#008d83'
  },
  input: {
    marginTop: 40,
    marginRight: 20,
    marginLeft: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#008d83'
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    margin: 10
  },
  scrollView: {
    width: '100%'
  },
  block_search_from: {
    margin: 10,
    flexDirection: 'row',
  },
  sort_item: {
    marginLeft: 10,
  },
  sort_item_text: {
    color: '#008d83'
  },
});