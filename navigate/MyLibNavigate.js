import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderScreenStyles } from '../support/HeaderScreenStyles';

// Экраны 
import BookInfoScreen from '../screens/BookInfoScreen';
import MyLibScreen from '../screens/MyLibScreen';
// import AutoInfoScreen from '../screens/AutoInfoScreen';
// import ReadScreen from '../screens/ReadScreen';

//Названия Экрнаов
const Stack = createNativeStackNavigator();

export default function MyLibNavigate() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name={'Моя библиотека'}
        component={MyLibScreen}
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