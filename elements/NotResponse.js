import * as React from 'react'
import { View, StatusBar, StyleSheet, Text } from 'react-native';



export function NotResponse() {
  return (
    <View style={[styles.container, styles.horizontal]} >
      <Text style={styles.text}>Нет подключения</Text>
    </View >
  )
}

const styles = StyleSheet.create({


  block: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    width: '100%'
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  text: {
    textAlign: 'center',
    fontSize: 20
  }
});