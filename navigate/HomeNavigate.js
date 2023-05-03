import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Экраны 
import NewBookScreen from '../screens/NewBookScreen';
import BookInfoScreen from '../screens/BookInfoScreen';
import AutoInfoScreen from '../screens/AutoInfoScreen';
// import ReadScreen from '../screens/ReadScreen';

//BНазвания Экрнаов
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
        options={{
          headerStyle: {
            //   backgroundColor: '#f4511e', //Set Header color
            height: 30,
            textAlign: "center",
            backgroundColor: '#008d83',
          },
          // headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            //   fontWeight: 'bold', //Set Header text style
            color: 'white', //Set Header text
            textAlingt: 'center'
          },
        }}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            //   backgroundColor: '#f4511e', //Set Header color
            height: 30,
            textAlign: "center",
            backgroundColor: '#008d83',

          },
          // headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            //   fontWeight: 'bold', //Set Header text style
            color: 'white', //Set Header text
            textAlign: 'center'
          },
        }}
        name={'Аннотация'}
        component={BookInfoScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            //   backgroundColor: '#f4511e', //Set Header color
            height: 30,
            textAlign: "center",
            backgroundColor: '#008d83',

          },
          // headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            //   fontWeight: 'bold', //Set Header text style
            color: 'white', //Set Header text
            textAlingt: 'center'
          },
        }}
        name={'Книги Автора'}
        component={AutoInfoScreen}
      />
      {/* <Stack.Screen
                    options={{
                        headerStyle: {
                        //   backgroundColor: '#f4511e', //Set Header color
                          height: 30,
                          textAlign: "center",
                        },
                        // headerTintColor: '#fff', //Set Header text color
                        headerTitleStyle: {
                        //   fontWeight: 'bold', //Set Header text style
                        },
                      }}
                    name = {'Читать онлайн'} 
                    component = {ReadScreen} 
                  /> */}

    </Stack.Navigator>
  );
}