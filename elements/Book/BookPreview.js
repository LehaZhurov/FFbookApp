import * as React from 'react'
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-elements';



export function BookPreview(book, navigation) {
  return (
    <Card>
      <Card.Title>{book.name}</Card.Title>
      <Card.Divider />
      <Card.Image
        onPress={() => {
          navigation.navigate('Аннотация', { 'b_code': book.b_code })
        }}
        style={styles.img}
        source={{
          uri: "http://flibusta.club" + book.img
        }}
      />
      <Text style={styles.span}>{book.author && book.author ? 'Автор:' + book.author : 'Автор:Неизвестен'}</Text>
      <Text style={styles.span}>{book.intro}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  img: {
    resizeMode: 'contain',
    width: '100%',
    height: 500
  },
  book: {
    padding: 20,
    flex: 1,
    justifyContent: 'center'
  },
  h1: {
    fontSize: 20,
    textAlign: 'center'
  },
  span: {
    fontSize: 15,
    margin: 10
  },
});