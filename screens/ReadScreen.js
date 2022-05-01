import { StyleSheet,StatusBar,WebView} from 'react-native';
import * as React from 'react';
import { Button,Text } from 'react-native-elements';
import {useState,useEffect} from 'react';

export default function ReadScreen({navigation,route}) {    
  const [book,setBook] = useState({data : [{'name' : 'Загрузка'}]});
  const getAutoBook = (a_code) => {

    fetch('http://flibapi.tmweb.ru/get_book_author/'+a_code, { method: 'GET',})
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
    if(!route.params.a_code){
        getAutoBook(route.params.a_code)
    }
  }, [])
  return (
    <WebView
        source={{
          uri: 'https://github.com/facebook/react-native'
        }}
        style={{ marginTop: 20 }}
      />

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
    marginTop:10
  },
  name:{
      fontSize:30,
      marginRight:20
  },
  author:{
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
});