import { StyleSheet,View ,SafeAreaView ,ScrollView, StatusBar,FlatList,Image,ImageBackground} from 'react-native';
import * as React from 'react';
import { Button,Text } from 'react-native-elements';
import {useState,useEffect} from 'react';

export default function GenreScreen({navigation,route}) {    
  const [genre,setGenre]    = useState({data : [{'name' : 'Загрузка'}]});

  const getGenre = () => {
    setGenre(
      {data : {'name' : 'Загрузка'}}
    )
    fetch('http://flibapi.tmweb.ru/get_genre', { method: 'GET',})
      .then((response) => response.json())
      .then((responseJson) => {
        setGenre({
          data: responseJson
        })
      })
      .catch((error) => {
        setGenre({
          data : {'name' : 'Нет интернет подключения'}
        })
        console.log(error)
      });
  };
  useEffect(() => {
    getGenre()
  }, [])
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
      <View style = {styles.book}>
        {/*<Text style = {styles.name}>Автор:{book.data.name}</Text>
        <Text style = {styles.name}>{book.data.error}</Text>
        <Text style = {styles.author} >О себе:{book.data.discription}</Text>
        <Text style = {styles.author} >Книги</Text>
        <View style={styles.paginate}>
          <View style = {styles.list}>
            <FlatList data={pages} horizontal={true} renderItem={({item})=> (
              <Button
                key = {item.key}
                title = {item.i + 1} 
                onPress={()=>{
                    paginate(book.data.book,item.i)
                }}
                buttonStyle ={styles.but_p}
              />
            )}
            />
          </View>
        </View>*/}
          <FlatList data={genre.data} renderItem={({item})=> (
            <><View style = {styles.block}>
                <Text style = {styles.author}>{item.g_name}</Text>
                <Button
                  key = {item.key}
                  title = {'Жанр'} 
                  onPress={()=>{
                    navigation.navigate('Книги жанра', {'g_code' : item.g_href})
                  }}
                  buttonStyle ={styles.but}
                />
            </View></>
          )} />
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
  },
  paginate:{
    width: '100%',
    flex:1,
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  list:{
    width: '100%',

  },
  but_p:{
    width: 50,
    padding:5,
    borderRadius: 0,
    backgroundColor:'#008d83',
  }
});