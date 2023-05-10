import { StyleSheet, View, SafeAreaView, ScrollView, StatusBar, FlatList, Image, ImageBackground } from 'react-native';
import * as React from 'react';
import { Button, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export default function MyLibScreen({ navigation, route }) {
  const [book, setBook] = useState({ data: [{ 'name': 'Загрузка' }] });
  const [pages, setPage] = useState();
  const [SB, setSB] = useState();

  const GetMyBook = async () => {
    let mybook = await GetMyBookAS()
    let data = []
    for (let i = 0; i < mybook.length; i++) {
      data[i] = JSON.parse(mybook[i][1])
    }
    setBook(data)
    paginate(data, 0)
    console.log(data)
  };

  const GetMyBookAS = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let keys = await AsyncStorage.getAllKeys();
        let items = await AsyncStorage.multiGet(keys)
        resolve(items)
      } catch (error) {
        reject(new Error('Error getting items from AsyncStorage: ' + error.message))
      }
    });
  }

  const paginate = (bk, page) => {
    let num_bk = 30
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
    setSB(slice)
    if (pg >= 0) {
      setPage(pgarr)
    }
    console.log(pg, slice, page)
  }

  useEffect(() => {
    navigation.addListener('focus', () => {
      GetMyBook()
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.book} key={Math.floor(Math.random() * 98) + 2}>
          <FlatList data={SB} renderItem={({ item }) => (
            <><View style={styles.block}>
              <ImageBackground
                style={{ width: 100, height: 150 }}
                source={{
                  uri: 'https://cm.author.today/content/2020/09/26/9a0b730762aa4398a8e8fc6f26168a83.jpg?width=265&height=400&mode=max'
                }}
              >
                <Image
                  style={{ width: 100, height: 150 }}
                  source={{
                    uri: 'https://flibusta.club' + item.img
                  }}
                  defaultSource={{
                    uri: 'https://flibusta.club/img/no_cover.jpg'
                  }}
                />
              </ImageBackground>
              <Text style={styles.span}>{item.name}</Text>
              <Button
                key={item.key}
                title={'Книга'}
                onPress={() => {
                  navigation.navigate('Аннотация', { 'b_code': item.b_code })
                }}
                buttonStyle={styles.but}
              />
            </View></>
          )} />
          <View style={styles.paginate}>
            <View style={styles.list}>
              <FlatList data={pages} horizontal={true} renderItem={({ item }) => (
                <Button
                  key={item.key}
                  title={item.i + 1}
                  onPress={() => {
                    paginate(book, item.i)
                  }}
                  buttonStyle={styles.but_p}
                />
              )}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  img: {
    //   height : ratio, 
    //   width: "100%",
    resizeMode: 'contain'

  },
  book: {
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
    fontSize: 30,
    marginRight: 20
  },
  span: {
    fontSize: 15,
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
  }
  ,
  scrollView: {
    // backgroundColor: 'pink',
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