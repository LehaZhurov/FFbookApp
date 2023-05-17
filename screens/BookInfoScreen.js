import { StyleSheet,View ,SafeAreaView ,Image, ScrollView, StatusBar,FlatList,Linking,TouchableOpacity,Alert} from 'react-native';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button,Text} from 'react-native-elements';
import {useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BookInfoScreen({navigation,route}) { 
  
  const [color,setColor] = useState('white');
  const [book,setBook] = useState({data : {'name' : 'Загрузка'}});
  const [book_url,setBookUrl] = useState('');
  const [error,setError] = useState('Подготовка к загрузке');
  const [ready,setReady] = useState({r:true});
  const b_code = route.params.b_code;

  const getBookInfo = (b_code) => {
    fetch('http://flibapi.tmweb.ru/get_book_info/'+b_code, {})
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        setBook({ data : responseJson })
      })
      .catch((error) => {
        setBook({
            data : {'name' : 'Не удалось загрузить' , 'book_url' : '','author':[{'name' : 'Не удалось загрузить'}],'genre':[{'name' : 'Не удалось загрузить'}],'annotation' : 'Не удалось загрузить'}
        })
        setTimeout(getBookInfo,5000)
      });
  };
  const GetLinkBook = (b_code) => {
    fetch('http://flibapi.tmweb.ru/download_book/'+b_code, {method: 'GET',})
      .then((response) => {
          response.text().then((text) => { 
            if(text[2] !== 'e'){
                setBookUrl(text)
                setError('Скачать')
                setReady({r:false})
            }else{
                setError('Книга не доступна')
            }
          }) 
          // alert('Книга готова к скачиванию')
      })
      .catch((error) => {
          setError('Книга не доступна')
      });
  }

  const SaveLovers = () =>{
    if(color == 'white'){
      setColor('#008d83')
      AppendBook()
    }else{
      setColor('white')
      RemoveBook()
    }
  }
  const AppendBook = async () =>{
      try {
        let name = book.data.name
        let img  = book.data.img
        let data = {h1:name,img:img,b_code:b_code}
        await AsyncStorage.setItem('@'+b_code,JSON.stringify(data))
      } catch (e) {    
        console.log('Ошибка',e)
      }
      // await AsyncStorage.clear()
  }
  const RemoveBook = async () =>{
    await AsyncStorage.removeItem('@'+b_code)
  }
  const IfBookAppend = async () =>{
    try {
      const value = await AsyncStorage.getItem('@'+b_code)
      if (value !== null) {
        setColor('#008d83')
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  useEffect(() => {
    navigation.addListener('focus', () => {
      IfBookAppend()
      getBookInfo(route.params.b_code)
      GetLinkBook(route.params.b_code)
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
      <View style = {styles.book}>
        <Text style = {styles.h1}>{book.data.name}</Text>
          <Image
              style={{ width: '100%', height: 500 }}
              source={{
                uri: "http://flibusta.club" + book.data.img
              }}
          />
          <Text style = {styles.h2} >Автор(ы):</Text>
          <FlatList data={book.data.author} renderItem={({item})=> (
              <>
                <Text style={styles.span}>{item.name}</Text>
              </>
            )} 
          />
          <Text style = {styles.h2} >Жанр(ы):</Text>
          <FlatList data={book.data.genre} renderItem={({item})=> (
              <Text style = {styles.span}>{item.name}</Text>
            )} 
          />
        <Text style = {styles.h2} >Аннотация</Text>
        <Text style = {styles.intro}>{book.data.annotation}</Text>
        <Text style = {styles.span}>{book.data.year}</Text>
        <View style = {styles.panel}>
          <View>
            <Button title={error}
                onPress={
                  ()=>{
                    // zaebalo()
                    Linking.openURL(book_url)
                  }
                }
                disabled = {ready.r}
                buttonStyle ={styles.but}
            />
          </View>
          <TouchableOpacity 
            onPress={()=>{SaveLovers()}}>
            <Ionicons name={'heart'} size={32} color={color} />
          </TouchableOpacity>
        </View>
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
  block:{
    flex:1,
    // flexDirection: '',
    justifyContent: 'space-between',
    marginTop:10
  },
  book:{
      padding: 20 
  },
  h1:{
      fontSize:30,
      textAlign: 'center',
      // backgroundColor:'#008d83'
  },
  span:{
      fontSize:15,
      // textAlign: "center",
      marginVertical:10
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
  h2:{
    fontSize:20
  },
  but:{
    backgroundColor:'#008d83',
    height: 40,
    // width: '80%'
  },
  panel:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});