import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Экраны 
import HomeNavigate from './HomeNavigate';
import PopularNavigate from './PopularNavigate';
import SearchNavigate from './SearchNavigate';
import MyLibNavigate from './MyLibNavigate.js';
import GenreNavigate from './GenreNavigate.js';



//Названия Экрнаов
const homeName      = 'Главная'
const popbookName   = 'Топ'
const searchName    = 'Поиск'
const MyLib         = 'Моя библиотека'
const Genre         = 'Жанры'


const Tab = createBottomTabNavigator();

export default function MainNavigate(){
    return (
            <NavigationContainer>
                <Tab.Navigator 
                        intialRouteName={homeName} 
                        screenOptions={({ route }) => ({
                                headerShown: false,
                                tabBarIconStyle : {},
                                tabBarLabelStyle:{fontSize:15,marginBottom:10,color:'white',display:'none'},
                                tabBarStyle:{backgroundColor: '#008d83'},
                                // tabBarActiveColor:'#008d83',
                                tabBarActiveBackgroundColor:'#007b6f',
                                tabBarBadgeStyle:{
                                    backgroundColor:'#008d83'
                                }, 
                                headerStyle: {
                                    height: 50,
                                    color:'white',
                                    backgroundColor:'#008d83',
                                    
                                },
                                tabBarIcon: ({ focused, color, size }) => {
                                        let iconName;
                            
                                        if (route.name === 'Главная') {
                                          iconName = focused ? 'home': 'home-outline';
                                        } else if (route.name === 'Топ') {
                                          iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                                        }else if (route.name === 'Поиск') {
                                          iconName = focused ? 'search' : 'search-outline';
                                        }
                                        else if (route.name === 'Моя библиотека') {
                                          iconName = focused ? 'heart' : 'heart-outline';
                                        }
                                        else if (route.name === 'Жанры') {
                                          iconName = focused ? 'reorder-four' : 'reorder-four-outline';
                                        }
                                        // You can return any component that you like here!
                                        return <Ionicons name={iconName} size={size} color={'white'} />;
                                      }
                                    
                        })}   
                >
                    <Tab.Screen 
                            name={homeName} 
                            component={HomeNavigate}
                    />
                    <Tab.Screen 
                            name={popbookName} 
                            component={PopularNavigate} 
                    />
                    <Tab.Screen 
                            name={searchName} 
                            component={SearchNavigate} 
                    />
                    <Tab.Screen 
                             name={MyLib} 
                             component={MyLibNavigate} 
                    />
                    <Tab.Screen 
                            name={Genre} 
                             component={GenreNavigate} 
                    />
                </Tab.Navigator>
            </NavigationContainer>
    );
}