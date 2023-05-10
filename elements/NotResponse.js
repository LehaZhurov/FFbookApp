import * as React from 'react'
import { View, StatusBar, StyleSheet } from 'react-native';



export function NotResponse() {
  return (
    <View style={[styles.container, styles.horizontal]} >
      <ActivityIndicator size="large" color="#008d83" />
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
 
});