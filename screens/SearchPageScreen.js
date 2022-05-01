import * as React from 'react';
import {useState,useEffect} from 'react';  
import { StyleSheet, View ,FlatList ,TextInput,StatusBar,SafeAreaView,ScrollView,TouchableOpacity,Image,ImageBackground} from 'react-native';
import { Dimensions } from 'react-native';
const win = Dimensions.get('window');
import { Button,Badge, Icon , Text } from 'react-native-elements';
import { set } from 'react-native-reanimated';
export default function SearchPageScreen({navigation,route}) {  

  const [query,setQuery]  =    useState('');
  const [book,setBook]    =    useState({data : {'name' : 'Найдется все,но не точно'}});
  const [page,setPage]    =    useState(0);
  const [SB,setSB]        =    useState(0)
  const [SA,setSA]        =    useState(0)
  const [SS,setSS]        =    useState(0)
  const [display,setDis]  =    useState({opacity:0})
  const AllSearch = (query,page) => {
    if(query[0]){ setBook( { data : {'name' : 'Загрузка'      }  }  )
    }else       { setBook( { data : {'name' : 'Заполните поле'}  }  ) 
      return true
    }
    fetch( 'http://flibapi.tmweb.ru/search/'+query+'/'+page, { method: 'GET' } )
      .then((response) => response.json())  
      .then((responseJson) => {
          console.log(responseJson)
          if(responseJson.error){
            setBook( {data : {'name' : 'Нечего не найдено'}} )
            setDis({opacity:0})
          }else{
            setBook( { data : responseJson } )
            setDis({
              opacity:1, 
              width: '100%',
              justifyContent: 'space-between',
              flexDirection: 'row'})
          }
      })
      .catch((error) => { setBook( {data : {'name' : 'Нет интернета'}} )
    });
    setSS(0)
    setSB(0)
    setSA(0)
    setPage(page)
    return true;
  };
  const BSearch = (query,page) => {
    if(query[0]){ setBook( { data : {'name' : 'Загрузка'      }  }  )
    }else       { setBook( { data : {'name' : 'Заполните поле'}  }  ) 
      return true
    }
    fetch( 'http://flibapi.tmweb.ru/search_book/'+query+'/'+page, { method: 'GET' } )
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          setBook( {data : {'name' : 'Нечего не найдено'}} )
          setDis({opacity:0})
        }else{
          setBook( { data :{book : responseJson }} )
          setDis({
            opacity:1, 
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row'})
        }
      })
      .catch((error) => { setBook( {data : {'name' : 'Нет интернета'}} )
    });
    setSS(0)
    setSB(1)
    setSA(0)
    setPage(page)
    return true;
  };
  const ASearch = (query,page) => {
    if(query[0]){ setBook( { data : {'name' : 'Загрузка'      }  }  )
    }else       { setBook( { data : {'name' : 'Заполните поле'}  }  ) 
      return true
    }
    fetch( 'http://flibapi.tmweb.ru/search_author/'+query+'/'+page, { method: 'GET' } )
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          setBook({data : {'name' : 'Нечего не найдено'}} )
          setDis({opacity:0})
        }else{
          setBook( { data :{auto : responseJson }} )
          setDis({
            opacity:1, 
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row'})
        }
      })
      .catch((error) => { setBook( {data : {'name' : 'Нет интернета'}} )
    });
    setSS(0)
    setSB(0)
    setSA(1)
    setPage(page)
    
    return true;
  };
  const SSearch = (query,page) => {
    if(query[0]){ setBook( { data : {'name' : 'Загрузка'      }  }  )
    }else       { setBook( { data : {'name' : 'Заполните поле'}  }  ) 
      return true
    }
    fetch( 'http://flibapi.tmweb.ru/search_serial/'+query+'/'+page, { method: 'GET' } )
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          setBook( {data : {'name' : 'Нечего не найдено'}} )
          setDis({opacity:0})
        }else{
          setBook( { data :{series : responseJson }} )
          setDis({
            opacity:1, 
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row'})
        }
      })
      .catch((error) => { setBook( {data : {'name' : 'Нет интернета'}} )
    });
    setSS(1)
    setSB(0)
    setSA(0)
    setPage(page)
    return true;
  };
  
  const upPage = () => {
    setBook({
        data : [{'name' : 'Загрузка'}]
    })
    let thispage = page + 1
    if(SB === 1){
      BSearch(query,thispage)
    }else if(SA === 1){
      ASearch(query,thispage) 
    }else if(SS === 1){
      SSearch(query,thispage)
    }else{
      AllSearch(query,thispage)
    }
    setPage(thispage);
  }
  const downPage = () => {
    setBook({
        data : [{'name' : 'Загрузка'}]
      })
    let thispage = page - 1 
    if(page != 0){
      setPage(thispage);
    }else{
      thispage = 0;
      setPage(thispage);
    }
    if(SB === 1){
      BSearch(query,thispage)
    }else if(SA === 1){
      ASearch(query,thispage)    
    }else if(SS === 1){
      SSearch(query,thispage)
    }else{
      AllSearch(query,thispage)
    }
  }                
  return (
    <>       
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <View>
              <TextInput 
                placeholder="Поиск"
                blurOnSubmit
                autoCorrect={false}
                maxLength={30}
                autoCapitalized="words"
                style ={styles.input}
                onChangeText={(text)=>setQuery(text)}
              />
              <View style = {styles.block_search_from}>
                <Text>Поиск по:</Text>
                <TouchableOpacity style={styles.sort_item} onPress={ async ()=>{BSearch(query,0)}}><Text style = {styles.sort_item_text}>Книгам</Text></TouchableOpacity>
                <TouchableOpacity style={styles.sort_item} onPress={ async ()=>{ASearch(query,0)}}><Text style = {styles.sort_item_text}>Авторам</Text></TouchableOpacity>
                <TouchableOpacity style={styles.sort_item} onPress={ async ()=>{SSearch(query,0)}}><Text style = {styles.sort_item_text}>Сериям</Text></TouchableOpacity>
              </View>
              <Button 
                buttonStyle = {styles.but_search}
                title={'Искать везде'} 
                onPress={ ()=>{AllSearch(query,0)} } 
              />
            </View>
            <Text style = {styles.h2}>
                {book.data.name}
            </Text>
            <FlatList style = {{width:'100%'}} data={book.data.book} renderItem={({ item }) => (
              <View style = {styles.block} key={item.b_code}>
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
                <Text style = {styles.name}>{item.b_name}</Text>
                <Button
                  key = {item.key}
                  title = {'Книга'} 
                  onPress={()=>{
                    navigation.navigate('Аннотация', {'b_code' : item.b_code})
                  }}
                  buttonStyle ={styles.page_but}
                />
              </View>
            )} />
            <FlatList data={book.data.auto} renderItem={({ item }) => (
            <>
              <View style={styles.block} key={item.a_code}>
                <Text style = {styles.name}>{item.a_name}</Text>
                <Button 
                  title={'Автор'}
                  onPress={() => {
                    navigation.navigate('Книги Автора', { 'a_code': item.a_code });
                  }}
                  buttonStyle = {styles.page_but} 
                />
              </View>
            </>
            )} />
            <FlatList data={book.data.series} renderItem={({ item }) => (
            <>
              <View style={styles.block} key={item.s_code}>
               <Text style = {styles.name}>{item.s_name}</Text>
               <Button 
                title={'Серия'}
                onPress={() => {
                  navigation.navigate('Книги Серии', { 's_code': item.s_code });
                }}
                buttonStyle = {styles.page_but} 
               />
              </View>
            </>
            )} />
            <View style={styles.paginate,display}>
              <Button 
                title={''} 
                onPress={downPage}
                icon={<Icon name="arrow-back" color="#008d83" iconStyle={{ marginRight: 10 }} />}
                buttonStyle={{
                  borderColor: '#f2f2f2',
                }}
                type="outline"
                titleStyle={{ color: 'rgba(78, 116, 289, 1)' }}
              />
              <Badge 
                textStyle ={{fontSize:20}} 
                badgeStyle = {styles.page} 
                value={page + 1} 
                status="primary" 
              />
              <Button 
                title={''} 
                onPress={upPage}
                icon={<Icon name="arrow-forward" color="#008d83" iconStyle={{ marginRight: 10 }} />}
                buttonStyle={{
                  borderColor: '#f2f2f2',
                }}
                type="outline"
              />
            </View>
        </ScrollView>
      </SafeAreaView> 
    </>
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop:10,
      width:'100%'
  },
  but:{
        // margin:10,
        borderRadius: 50,
        color: 'rgb(32, 137, 220)',
        flexShrink:1, flexWrap: 'wrap'
  },
  but_search:{
    borderRadius: 50,
    color: 'rgb(32, 137, 220)',
    flexShrink:1, flexWrap: 'wrap',
    backgroundColor:'#008d83'
  },
  name:{
      fontSize:15,
      margin: 5,
      flex: 1, 
      flexWrap: 'wrap'
  },
  h2:{
      fontSize:20,
      textAlign: 'center',
      margin:20  
  },
  author:{
      textAlign: "center"
  },
  paginate:{
    width: '100%',
    // flex:1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  input:{
      // margin: 20,
      // height : 60,
      marginTop: 40,
      marginRight:20,
      marginLeft:20,
      borderBottomWidth: 2,
      borderBottomColor: '#008d83'
  },
  container: {
    flex: 1,
    // width: '90%',
    paddingTop: StatusBar.currentHeight,
    margin : 10
  },
  scrollView:{
      width:'100%'
  },
  page:{
    width: 30,
    marginTop: 20,
    fontSize:20,
    height:30,
    backgroundColor:'#008d83'
  },
  block_search_from:{
    margin:10,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  sort_item:{
    marginLeft:10,
    // padding:10,
    // flex:1,
    // alignItems: 'center',
  },
  sort_item_text:{
    color:'#008d83'
  },
  page_but:{
    backgroundColor:'#008d83'
  }
});