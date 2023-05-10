import { StyleSheet, View, ActivityIndicator, StatusBar } from 'react-native';
import * as React from 'react';



export function LoadScreen() {
  return (
    <View style={[styles.container, styles.horizontal]} >
      <ActivityIndicator size="large" color="#008d83" />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 10,
    width: '100%',
    height: '100%',
  },
  screenMessageText: {
    fontSize: '30px',
    textAlign: 'center'
  }
});