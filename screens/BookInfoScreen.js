import { StyleSheet, View, SafeAreaView, Image, ScrollView, StatusBar, FlatList, Linking, TouchableOpacity, Alert } from 'react-native';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Text } from 'react-native-elements';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppendBookInLibrary } from '../function/book/AppendBookInLibrary';
import { RemoveBookInLibrary } from '../function/book/RemoveBookInLibrary';
import { LoadScreen } from '../elements/LoadScreen';
import { NotFound } from '../elements/NotFound';

export default function BookInfoScreen({ navigation, route }) {

  const [color, setColor] = useState('white');
  const [book, setBook] = useState({ data: { 'name': 'Загрузка' } });
  const [bookDownloadUrl, setBookUrl] = useState('');
  const [downloadButtonText, setDownloadButtonText] = useState('Подготовка к загрузке');
  const [bookReady, setBookReady] = useState({ r: false });
  const [murkup, setMurkup] = useState(<LoadScreen />)
  const b_code = route.params.b_code;

  const GetBookInfo = async (b_code) => {
    let url = 'http://flibapi.tmweb.ru/get_book_info/' + b_code;
    let response = await fetch(url, { method: 'GET' })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        setMurkup(<NotFound />)
      });
    console.log(response);
    setBook({ data: response });
  };

  const GetLinkBook = async (b_code) => {
    let url = 'http://flibapi.tmweb.ru/download_book/' + b_code;
    let response = await fetch(url, { method: 'GET', })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        setDownloadButtonText('Книга не доступна')
      });
    response.text().then((text) => {
      if (text[2] !== 'e') {
        setBookUrl(text)
        setDownloadButtonText('Скачать')
        setBookReady({ r: true })
      } else {
        setDownloadButtonText('Книга не доступна')
      }
    })
  }

  const SaveLovers = (book) => {
    if (color == 'white') {
      setColor('#008d83')
      AppendBookInLibrary(book)
    } else {
      setColor('white')
      RemoveBookInLibrary(book)
    }
  }

  const IfBookAppend = async () => {
    try {
      const value = await AsyncStorage.getItem('@' + b_code)
      if (value !== null) {
        setColor('#008d83')
        console.log(value);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    IfBookAppend()
    GetBookInfo(b_code)
    GetLinkBook(b_code)
  }, [])

  useEffect(() => {
    setMurkup(<>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.book}>
            <Image
              style={{ width: '100%', height: 500 }}
              source={{
                uri: "http://flibusta.club" + book.data.img
              }}
            />
            <Text style={styles.h1}>{book.data.name}</Text>
            <Text style={styles.h2} >Автор(ы):</Text>
            <FlatList
              data={book.data.author}
              renderItem={({ item }) => (
                <Text style={styles.span}>{item.name}</Text>
              )}
            />
            <Text style={styles.h2} >Жанр(ы):</Text>
            <FlatList
              data={book.data.genre}
              renderItem={({ item }) => (
                <Text style={styles.span}>{item.name}</Text>
              )}
            />
            {/* Нужно проверить почему с сервера не приходит Аннотация */}
            {/* <Text style={styles.h2} >{book.data.annotation && book.data.annotation ? book.data.annotation : 'Аннотация'}</Text>
            <Text style={styles.intro}>{book.data.annotation && book.data.annotation ? book.data.annotation : ''}</Text> */}
            <Text style={styles.span}>{book.data.year && book.data.year ? book.data.year : ''}</Text>
            <View style={styles.panel}>
              <View>
                <Button
                  title={downloadButtonText}
                  onPress={() => { Linking.openURL(bookDownloadUrl) }}
                  disabled={!bookReady.r}
                  buttonStyle={styles.but}
                />
              </View>
              <TouchableOpacity
                onPress={() => { SaveLovers(book.data) }}>
                <Ionicons name={'heart'} size={32} color={color} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>)
  }, [book, bookDownloadUrl])

  return murkup;
}

const styles = StyleSheet.create({
  img: {
    resizeMode: 'contain'
  },
  block: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 10
  },
  book: {
    padding: 20
  },
  h1: {
    fontSize: 30,
    textAlign: 'center',
  },
  span: {
    fontSize: 15,
    marginVertical: 10
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 30
  },
  intro: {
    fontSize: 15,
    padding: 5
  },
  h2: {
    fontSize: 20
  },
  but: {
    backgroundColor: '#008d83',
    height: 40,
  },
  panel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});