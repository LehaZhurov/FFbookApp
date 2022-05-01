import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View ,FlatList ,Image} from 'react-native';
import { Button, Card,Badge, Icon , Text } from 'react-native-elements';
import * as React from 'react';
import {useState,useEffect} from 'react';


export default function PopularBookScreen({navigation}) {
  const [book,setBook] = useState({data : [{'name' : 'Загрузка'}]});
  const [page,setPage] = useState(0);
  const GetPopularBook = (page) => {

    fetch('http://flibapi.tmweb.ru/get_popular_book/'+page, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
      for (let i = 0; i  < responseJson.length; i++) {
          responseJson[i]['key'] = i;
          responseJson[i]['author'] = 'Автор:'+responseJson[i]['author'];

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
      setTimeout(GetPopularBook,5000)
    });
  };
  ////////////////////////////////
  const upPage = () => {
    setBook({
        data : [{'name' : 'Загрузка'}]
      })
    GetPopularBook(page+1)
    setPage(page+1);
  }
  const downPage = () => {
    setBook({
        data : [{'name' : 'Загрузка'}]
      })
    if(page != 0){
      GetPopularBook(page-1)
      setPage(page-1);
    }else{
      setPage(0);
      GetPopularBook(page)
    }
  }
  ///////////////////////////////////
  useEffect(() => {
    GetPopularBook(page)
    }, [])
  return (
    <><FlatList data={book.data} renderItem={({ item }) => (
      <Card>
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
                  title = {'Аннтоция'} 
                  onPress={()=>{
                    navigation.navigate('Аннотация', {'b_code' : item.b_code})
                  }}
                  icon={<Icon name="book" color="#008d83" iconStyle={{ marginRight: 10 }} />}
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
    )} />
    <View style={styles.paginate}>
        <Button 
            title={''} 
            onPress={downPage}
            icon={<Icon name="arrow-back" color="#008d83" iconStyle={{ marginRight: 10 }} />}
            buttonStyle={{
              borderColor: '#f2f2f2',
            }}
            type="outline"
            titleStyle={{ color: 'rgba(78, 116, 289, 1)' }}
              containerStyle={{
              // marginHorizontal: 50,
            }}
        />
        <Badge textStyle ={{fontSize:20}} badgeStyle = {styles.page} value={page + 1} status="primary" />
        <Button 
            title={''} 
            onPress={upPage}
            icon={<Icon name="arrow-forward" color="#008d83" iconStyle={{ marginRight: 10 }} />}
            buttonStyle={{
              borderColor: '#f2f2f2',
            }}
            type="outline"
        />
      </View></>
  );
}

const styles = StyleSheet.create({
  img:{
    //   height : ratio, 
    //   width: "100%",
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
    height:30,
    backgroundColor:'#008d83'
  }
});