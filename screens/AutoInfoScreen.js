import { StyleSheet,View ,SafeAreaView ,ScrollView, StatusBar,FlatList,Image,ImageBackground} from 'react-native';
import * as React from 'react';
import { Button,Text } from 'react-native-elements';
import {useState,useEffect} from 'react';

export default function AutoInfoScreen({navigation,route}) {    
  const [book,setBook]    = useState({data : [{'name' : 'Загрузка'}]});
  const [pages,setPage]   = useState();
  const [SB,setSB]        = useState();

  const getAutoBook = (a_code) => {
    setBook(
      {data : {'name' : 'Загрузка'}}
    )
    setSB({})
    fetch('http://flibapi.tmweb.ru/get_book_author/'+a_code, { method: 'GET',})
      .then((response) => response.json())
      .then((responseJson) => {
        setBook({
          data: responseJson
        })
        paginate(responseJson.book,0)
      })
      .catch((error) => {
        setBook({
          data : {'name' : 'Нет интернет подключения'}
        })
        console.log(error)
      });
  };

  const paginate = (bk,page) =>{
    let num_bk = 50
    let lenght = Object.keys(bk).length
    let pg = lenght/num_bk
    pg = pg.toFixed(0)
    let pgarr = []
    for (let i = 0; i < pg; i++) {
            pgarr[i] = {i}        
    }
    let start = num_bk * page
    let end   = page + 1
    let slice = bk.slice(start,end * num_bk);
    setSB(slice)
    if(pg >= 0){
      setPage(pgarr)
    }
    console.log(pg,slice,page)
  }

  useEffect(() => {
    getAutoBook(route.params.a_code,0)
  }, [])
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
      <View style = {styles.book}>
        <Text style = {styles.name}>Автор:{book.data.name}</Text>
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
        </View>
          <FlatList data={SB} renderItem={({item})=> (
            <><View style = {styles.block}>
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