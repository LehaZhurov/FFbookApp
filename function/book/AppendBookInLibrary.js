import AsyncStorage from '@react-native-async-storage/async-storage';

export async function AppendBookInLibrary(book) {
    try {
        let data = { h1: book.name, img: book.img, b_code: book.b_code }
        await AsyncStorage.setItem('@' + book.b_code, JSON.stringify(data))
    } catch (e) {
        console.log('Ошибка', e)
    }
}