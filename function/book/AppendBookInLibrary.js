import AsyncStorage from '@react-native-async-storage/async-storage';

export async function AppendBookInLibrary(book, b_code) {
    try {
        let newBook = { key: b_code, b_name: book.name, b_cover: 'http://flibusta.club' + book.img, b_code: b_code }
        let books = await AsyncStorage.getItem('books');
        if (books == null) {
            await AsyncStorage.setItem('books', JSON.stringify([]))
        }
        books = await AsyncStorage.getItem('books');
        books = JSON.parse(books);
        books.push(newBook);
        await AsyncStorage.setItem('books', JSON.stringify(books))
    } catch (e) {
        console.log('Ошибка', e)
    }
}