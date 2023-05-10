import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderScreenStyles } from '../support/HeaderScreenStyles';
// Экраны 
import GenreScreen from '../screens/GenreScreen';
import BookInfoScreen from '../screens/BookInfoScreen';
import GenreBookScreen from '../screens/GenreBookScreen';

//Названия Экрнаов
const Stack = createNativeStackNavigator();

export default function GenreNavigate() {
  return (
    <Stack.Navigator
      screenOptions={{
      }}
    >
      <Stack.Screen
        name={'Жанры'}
        component={GenreScreen}
        options={HeaderScreenStyles()}
      />
      <Stack.Screen
        name={'Книги жанра'}
        component={GenreBookScreen}
        options={HeaderScreenStyles()}
      />
      <Stack.Screen
        name={'Аннотация'}
        component={BookInfoScreen}
        options={HeaderScreenStyles()}
      />
    </Stack.Navigator>
  );
}