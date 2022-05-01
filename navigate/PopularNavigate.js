import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Экраны 
import PopularBookScreen from '../screens/PopularBookScreen'
import BookInfoScreen from '../screens/BookInfoScreen';
import AutoInfoScreen from '../screens/AutoInfoScreen';
//BНазвания Экрнаов
const Stack = createNativeStackNavigator();

export default function PopularNavigate(){
    return (
            <Stack.Navigator>
                <Stack.Screen
                    key={435} 
                    name = {'Сейчас читают'} 
                    component = {PopularBookScreen} 
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
                        headerIconStyle :{
                          color:'white'
                        }
                      }}
                />
                <Stack.Screen 
                    key={123}
                    name = {'Аннотация'} 
                    component = {BookInfoScreen} 
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
                        headerIconStyle :{
                          color:'white'
                        }
                      }}
                />
            </Stack.Navigator>
            
    );
}