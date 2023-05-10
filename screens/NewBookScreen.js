import { FlatList } from 'react-native';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { NotResponse } from '../elements/NotResponse';
import { BookPreview } from '../elements/Book/BookPreview';
import { LoadScreen } from '../elements/LoadScreen';


export default function NewBookScreen({ navigation }) {

  const [book, setBook] = useState({ data: [{ 'name': '', 'author': '' }] });
  const [murkup, setMarkup] = useState(LoadScreen());


  const getNewBook = () => {
    fetch('http://flibapi.tmweb.ru/get_new_book', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setBook({
          data: responseJson
        })
      })
      .catch((error) => {
        setMarkup(NotResponse());
      });
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
          BookPreview(item, navigation)
        )}
      />
    ))
  }, [book])

  return (
    murkup
  );
}

