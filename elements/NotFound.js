import * as React from 'react'
import { View, StatusBar, StyleSheet, Text } from 'react-native';



export function NotFound() {
    return (
        <View style={[styles.container, styles.horizontal]} >
            <Text>Не найдено</Text>
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