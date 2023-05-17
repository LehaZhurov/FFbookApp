import { FlatList } from 'react-native';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { NotResponse } from '../elements/NotResponse';
import { BookPreview } from '../elements/Book/BookPreview';
import { LoadScreen } from '../elements/LoadScreen';


export default function NewBookScreen({ navigation }) {

  const [book, setBook] = useState({ data: [{ 'name': '', 'author': '' }] });
  const [murkup, setMarkup] = useState(<LoadScreen />);


  const getNewBook = async () => {
    let url = 'http://flibapi.tmweb.ru/get_new_book';
    let response = await fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        setMarkup(<NotResponse />);
      });
    setBook({ data: response })
  };

  useEffect(() => {
    getNewBook()
  }, [])

  useEffect(() => {
    setMarkup((
      <FlatList
        data={book.data}
        style={{}}
        renderItem={({ item }) => (
          <BookPreview book={item} navigation={navigation} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    ))
  }, [book])

  return (
    murkup
  );
}

