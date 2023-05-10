import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderScreenStyles } from '../support/HeaderScreenStyles';
// Экраны 
import NewBookScreen from '../screens/NewBookScreen';
import BookInfoScreen from '../screens/BookInfoScreen';
import AutoInfoScreen from '../screens/AutoInfoScreen';

//Названия Экрнаов
const Stack = createNativeStackNavigator();

export default function HomeNavigate() {
  return (
    <Stack.Navigator
      screenOptions={{
      }}
    >
      <Stack.Screen
        name={'Новинки'}
        component={NewBookScreen}
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
    </Stack.Navigator>
  );
}