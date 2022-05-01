import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Экраны 
import BookInfoScreen from '../screens/BookInfoScreen';
import MyLibScreen from '../screens/MyLibScreen';
import AutoInfoScreen from '../screens/AutoInfoScreen';
// import ReadScreen from '../screens/ReadScreen';

//BНазвания Экрнаов
const Stack = createNativeStackNavigator();

export default function MyLibNavigate(){
    return (
          <Stack.Navigator 
            screenOptions={{
              }}
                  >
                <Stack.Screen 
                    name = {'Моя библиотека'} 
                    component = {MyLibScreen}
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