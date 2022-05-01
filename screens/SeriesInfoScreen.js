import { StyleSheet,View ,SafeAreaView ,ScrollView, StatusBar,FlatList,Image,ImageBackground} from 'react-native';
import * as React from 'react';
import { Button,Text } from 'react-native-elements';
import {useState,useEffect} from 'react';

export default function SeriesInfoScreen({navigation,route}) {    
  const [book,setBook] = useState({data : [{'name' : 'Загрузка'}]});

  const getSeriesBook = (s_code) => {
    fetch('http://flibapi.tmweb.ru/get_book_serial/'+s_code+"/"+ 0, { method: 'GET',})
      .then((response) => response.json())
      .then((responseJson) => {
        for (let i = 0; i  < responseJson.length; i++) {
            responseJson[i]['key'] = i;
        }
        setBook({
          data : responseJson
        })
      })
      .catch((error) => {
        setBook({
          data : {'name' : 'Нет интернет подключения'}
        })
      });
  };
  useEffect(() => {
    getSeriesBook(route.params.s_code)
    console.log(book)
  }, [])
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
      <View style = {styles.book}>
        <Text style = {styles.name}>Книги серии:{book.data.name}</Text>
        <Text style = {styles.name}>{book.data.error}</Text>
        <FlatList data={book.data} renderItem={({item})=> (
          <View style = {styles.block}>
            <ImageBackground
              style={{ width: 100, height: 150 }}
              source={{
                uri:  'https://cm.author.today/content/2020/09/26/9a0b730762aa4398a8e8fc6f26168a83.jpg?width=265&height=400&mode=max'
              }}
            >
              <Image
                style={{ width: 100, height: 150 }}
                source={{
                  uri:  item.b_cover
                }}
                defaultSource = {{
                  uri : 'https://flibusta.club/img/no_cover.jpg'
                }}
              />
            </ImageBackground>
            <Text style = {styles.author}>{item.b_name}</Text>
            <Button
              key = {item.key}
              title = {'Книга'} 
              onPress={()=>{
                navigation.navigate('Аннотация', {'b_code' : item.b_code})
              }}
              buttonStyle ={styles.but}
            />
          </View>
          )} />
        <Text style = {styles.intro}>{book.data.annotation}</Text>
        <Text style = {styles.author}>{book.data.year}</Text>
      </View>
    </ScrollView>
  </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  img:{
    //   height : ratio, 
    //   width: "100%",
      resizeMode: 'contain'
        
  },
  book:{
      padding: 20 
  },
  block:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:10,
    width:'100%'
  },
  name:{
      fontSize:30,
      marginRight:20
  },
  author:{
    fontSize:15,
    margin: 5,
    flex: 1, 
    flexWrap: 'wrap'
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  intro:{
    fontSize:15,
    padding:5
  }
  ,
  scrollView: {
    // backgroundColor: 'pink',
  },
  but:{
    backgroundColor:'#008d83',
  }
});