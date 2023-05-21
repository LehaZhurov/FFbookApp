import { StyleSheet } from 'react-native';


export default function style() {
    return StyleSheet.create({
        img: {
            resizeMode: 'contain'
        },
        book: {
            padding: 20,
            flex: 1,
            justifyContent: 'center'
        },
        h1: {
            fontSize: 20,
            textAlign: 'center'
        },
        span: {
            fontSize: 15,
            margin: 10
        },
        paginate: {
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row'
        },
        page: {
            width: 30,
            marginTop: 20,
            fontSize: 20,
            height: 30
        }
    });
}