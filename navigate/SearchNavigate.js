import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderScreenStyles } from '../support/HeaderScreenStyles';

// Экраны 
import BookInfoScreen from '../screens/BookInfoScreen';
import SearchPageScreen from '../screens/SearchPageScreen';
import AutoInfoScreen from '../screens/AutoInfoScreen';
import SeriesInfoScreen from '../screens/SeriesInfoScreen';

//BНазвания Экрнаов
const Stack = createNativeStackNavigator();

export default function SearchNavigate() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name={'Что ищем?'}
        component={SearchPageScreen}
        options={HeaderScreenStyles()}
      />
      <Stack.Screen
        name={'Аннотация'}
        component={BookInfoScreen}
        options={HeaderScreenStyles()}
      />
      <Stack.Screen
        name={'Книги Автора'}
        component={AutoInfoScreen}
        options={HeaderScreenStyles()}
      />
      <Stack.Screen
        name={'Книги Серии'}
        component={SeriesInfoScreen}
        options={HeaderScreenStyles()}
      />
    </Stack.Navigator>
  );
}