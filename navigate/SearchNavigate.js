import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Экраны 
import BookInfoScreen from '../screens/BookInfoScreen';
import SearchPageScreen from '../screens/SearchPageScreen';
import AutoInfoScreen from '../screens/AutoInfoScreen';
import SeriesInfoScreen from '../screens/SeriesInfoScreen';

//BНазвания Экрнаов
const Stack = createNativeStackNavigator();

export default function SearchNavigate(){
    return (
            <Stack.Navigator>
                <Stack.Screen 
                    name = {'Что ищем?'} 
                    component = {SearchPageScreen}
                    options={{
                        headerStyle: {
                        //   backgroundColor: '#f4511e', //Set Header color
                          height: 30,
                          textAlign: "center",
                          backgroundColor:'#008d83'
                        },
                        // headerTintColor: '#fff', //Set Header text color
                        headerTitleStyle: {
                        //   fontWeight: 'bold', //Set Header text style
                        color:'white'
                        },
                      }}
                />
                <Stack.Screen
                    options={{
                        headerStyle: {
                        //   backgroundColor: '#f4511e', //Set Header color
                          height: 30,
                          textAlign: "center",
                          backgroundColor:'#008d83'
                        },
                        // headerTintColor: '#fff', //Set Header text color
                        headerTitleStyle: {
                        //   fontWeight: 'bold', //Set Header text style
                        color:'white'
                        },
                      }}
                    name = {'Аннотация'} 
                    component = {BookInfoScreen} 
                  />
                  <Stack.Screen
                    options={{
                        headerStyle: {
                        //   backgroundColor: '#f4511e', //Set Header color
                          height: 30,
                          textAlign: "center",
                          backgroundColor:'#008d83'
                        },
                        // headerTintColor: '#fff', //Set Header text color
                        headerTitleStyle: {
                        //   fontWeight: 'bold', //Set Header text style
                        color:'white'
                        },
                      }}
                    name = {'Книги Автора'} 
                    component = {AutoInfoScreen} 
                  />
                  <Stack.Screen
                    options={{
                        headerStyle: {
                        //   backgroundColor: '#f4511e', //Set Header color
                          height: 30,
                          textAlign: "center",
                          backgroundColor:'#008d83'
                        },
                        // headerTintColor: '#fff', //Set Header text color
                        headerTitleStyle: {
                        //   fontWeight: 'bold', //Set Header text style
                        color:'white'
                        },
                      }}
                    name = {'Книги Серии'} 
                    component = {SeriesInfoScreen} 
                  />
            </Stack.Navigator>
    );
}