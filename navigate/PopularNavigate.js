import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderScreenStyles } from '../support/HeaderScreenStyles';

// Экраны 
import PopularBookScreen from '../screens/PopularBookScreen'
import BookInfoScreen from '../screens/BookInfoScreen';

//Названия Экрнаов
const Stack = createNativeStackNavigator();

export default function PopularNavigate() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        key={435}
        name={'Сейчас читают'}
        component={PopularBookScreen}
        options={HeaderScreenStyles()}
      />
      <Stack.Screen
        key={123}
        name={'Аннотация'}
        component={BookInfoScreen}
        options={HeaderScreenStyles()}
      />
    </Stack.Navigator>

  );
}