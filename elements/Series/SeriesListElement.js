import { StyleSheet, View, Button, Text } from 'react-native';
import * as React from 'react';



export function SeriesListElement({series, navigation}) {
    return (<>
        <View style={styles.block} key={series.s_code}>
            <Text
                style={styles.h1}
                onPress={() => {
                    navigation.navigate('Книги Серии', { 's_code': series.s_code });
                }}>
                {series.s_name}
            </Text>
        </View>
    </>);
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: '100%'
    },
    h1: {
        fontSize: 25,
        margin: 5,
        flex: 1,
        flexWrap: 'wrap',
        // border: '1px solid black',
        boxShadow: "0px 5px 5px -5px rgba(34, 60, 80, 0.6)",
        padding: '10px',
    },
    button: {
        backgroundColor: 'black'
    }
});