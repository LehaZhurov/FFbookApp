import { StyleSheet, View, Button, Text } from 'react-native';
import * as React from 'react';



export function AuthorListElement(author, navigation) {
    return (<>
        <View style={styles.block} key={author.a_code}>
            <Text style={styles.h1}>{author.a_name}</Text>
            <Button
                title={'Автор'}
                onPress={() => {
                    navigation.navigate('Книги Автора', { 'a_code': author.a_code });
                }}
                buttonStyle={styles.button}
            />
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
        fontSize: 30,
        marginRight: 20
    },
    button: {
        backgroundColor: 'black'
    }
});