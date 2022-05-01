import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View ,FlatList ,Image ,Alert, Linking} from 'react-native';
import { Button, Card,ButtonGroup, Icon , Text } from 'react-native-elements';
import * as React from 'react';
import {useState,useEffect} from 'react';

export default function NewBookScreen({navigation,route}) {  
  const [book,setBook] = useState({data : [{'name' : 'Загрузка'}]});
  
  const zaebalo = () =>{
      Alert.alert(
  
    // This is Alert Dialog Title
    'Бесплатная версия',
 
    // This is Alert Dialog Message. 
    'Вы используете пробную версию приложения.Полная версия доступна по клику на кнопку купить',
    [
      // First Text Button in Alert Dialog.
      {text: 'Купить полную версию', onPress: () => Linking.openURL('https://payhip.com/b/W84z3')}, 
      // Third OK Button in Alert Dialog
      {text: 'OK', onPress: () => Alert.alert('Благодарность',"Спасибо что выбрали нас")},
      
    ]
 
    )  
  }


  const getNewBook = () => {
    fetch('http://flibapi.tmweb.ru/get_new_book', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        for (let i = 0; i  < responseJson.length; i++) {
            responseJson[i]['key'] = i;
            responseJson[i]['author'] = 'Автор:'+responseJson[i]['author'];
            responseJson[i]['intro'] = responseJson[i]['intro'];

        }
        console.log(responseJson)
        setBook({
          data : responseJson
        })
      })
      .catch((error) => {
        setBook({
          data : [{'name' : 'Нет интернет подключения'}]
        })
        setTimeout(getNewBook,5000)
      });
  };
  useEffect(() => {
    getNewBook()
    // zaebalo()
  }, [])
  return (
    <FlatList data={book.data} style = {styles.back_color}renderItem={({item})=> (
      <Card style>
        <Card.Title>{item.name}</Card.Title>
        <Card.Divider />
        <Card.Image
          style={{ width: '100%', height: 500 }}
          source={{
            uri: "http://flibusta.club" + item.img
          }}
        />
        <Text style = {styles.author}>{item.author}</Text>
        <Text style = {styles.author}>{item.intro}</Text>
        <Button
          icon={<Icon name="book" color="#008d83" iconStyle={{ marginRight: 10 }} />}
          title = {'Аннотация'} 
          onPress={()=>{
            navigation.navigate('Аннотация', {'b_code' : item.b_code})
          }}
          buttonStyle={{
            borderColor: '#008d83',
            width: '100%',
          }}
          type="outline"
          titleStyle={{ color: '#008d83' }}
          containerStyle={{
            marginHorizontal: 50,
          }}
        />
      </Card>
    )} 
    />
  );
}

const styles = StyleSheet.create({
  img:{
      resizeMode: 'contain' 
  },
  book:{
      padding: 20, 
      flex:1,
      justifyContent: 'center'
  },
  name:{
      fontSize:20,
      textAlign: 'center'
  },
  author:{
    fontSize:15,
    margin:10
  },
  paginate:{
    width: '100%',
    // flex:1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  page:{
    width: 30,
    marginTop: 20,
    fontSize:20,
    height:30
  }
});