import * as React from 'react'
import { StyleSheet, View, ImageBackground, Image } from 'react-native';
import { Text } from 'react-native-elements';



export function MiniBookPreview({ book, navigation }) {
    return (<>
        <View style={styles.block} key={book.b_code} >
            <Image
                style={styles.img}
                source={{
                    uri: book.b_cover
                }}
                defaultSource={{
                    uri: 'https://flibusta.club/img/no_cover.jpg'
                }}

            />
            <Text
                style={styles.h1}
                onPress={() => {
                    navigation.navigate('Аннотация', { 'b_code': book.b_code })
                }}>
                {book.b_name}
            </Text>
        </View>
    </>);
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        width: '100%'
    },
    h1: {
        fontSize: 15,
        margin: 5,
        flex: 1,
        flexWrap: 'wrap'
    },
    img: {
        width: 100,
        height: 150,
        marginRight: 10
    },
    book: {
        padding: 20,
        flex: 1,
        justifyContent: 'center'
    },
    h1: {
        fontSize: 20,
        textAlign: 'left'
    },
    span: {
        fontSize: 15,
        margin: 10
    },
});