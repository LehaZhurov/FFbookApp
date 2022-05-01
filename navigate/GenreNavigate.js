import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Экраны 
import GenreScreen from '../screens/GenreScreen';
import BookInfoScreen from '../screens/BookInfoScreen';
import GenreBookScreen from '../screens/GenreBookScreen';

//BНазвания Экрнаов
const Stack = createNativeStackNavigator();

export default function GenreNavigate(){
    return (
          <Stack.Navigator 
            screenOptions={{
              }}
                  >
                <Stack.Screen 
                    name = {'Жанры'} 
                    component = {GenreScreen}
                    options={{
                        headerStyle: {
                        //   backgroundColor: '#f4511e', //Set Header color
                          height: 30,
                          textAlign: "center",
                          backgroundColor:'#008d83',
                        },
                        // headerTintColor: '#fff', //Set Header text color
                        headerTitleStyle: {
                        //   fontWeight: 'bold', //Set Header text style
                        color:'white', //Set Header text
                        textAlingt:'center'
                        },
                      }}
                />
                <Stack.Screen 
                    name = {'Книги жанра'} 
                    component = {GenreBookScreen}
                    options={{
                        headerStyle: {
                        //   backgroundColor: '#f4511e', //Set Header color
                          height: 30,
                          textAlign: "center",
                          backgroundColor:'#008d83',
                        },
                        // headerTintColor: '#fff', //Set Header text color
                        headerTitleStyle: {
                        //   fontWeight: 'bold', //Set Header text style
                        color:'white', //Set Header text
                        textAlingt:'center'
                        },
                      }}
                />
                <Stack.Screen
                    options={{
                        headerStyle: {
                        //   backgroundColor: '#f4511e', //Set Header color
                          height: 30,
                          textAlign: "center",
                          backgroundColor:'#008d83',

                        },
                        // headerTintColor: '#fff', //Set Header text color
                        headerTitleStyle: {
                        //   fontWeight: 'bold', //Set Header text style
                        color:'white', //Set Header text
                        textAlign:'center'
                        },
                      }}
                    name = {'Аннотация'} 
                    component = {BookInfoScreen} 
                  />
            </Stack.Navigator>
    );
}