import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, Image } from 'react-native';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { NotResponse } from '../elements/NotResponse';
import { BookPreview } from '../elements/Book/BookPreview';
import { LoadScreen } from '../elements/LoadScreen';
import { PaginateControl } from '../elements/paginateControl';
export default function PopularBookScreen({ navigation }) {

  const [book, setBook] = useState({ data: [{ 'name': '', 'author': '' }] });
  const [page, setPage] = useState(0);
  const [murkup, setMarkup] = useState(LoadScreen());


  const GetPopularBook = (page) => {

    fetch('http://flibapi.tmweb.ru/get_popular_book/' + page, {
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

  const upPage = () => {
    setMarkup(LoadScreen());
    GetPopularBook(page + 1)
    setPage(page + 1);
  }

  const downPage = () => {
    setMarkup(LoadScreen());
    if (page != 0) {
      GetPopularBook(page - 1)
      setPage(page - 1);
      return;
    }
    setPage(0);
    GetPopularBook(page)
  }

  useEffect(() => {
    GetPopularBook(page)
  }, [])

  useEffect(() => {
    setMarkup((<>
      <FlatList
        data={book.data}
        style={{}}
        renderItem={({ item }) => (
          BookPreview(item, navigation)
        )}
      />
      <PaginateControl page={page} downPage={downPage} upPage={upPage} />
    </>
    )
    )
  }, [book])
  return murkup;
}

