import AsyncStorage from '@react-native-async-storage/async-storage';

export async function BookAddedInLibrary(b_code) {
    let books = await AsyncStorage.getItem('books');
    books = JSON.parse(books);
    if (books == null) {
        await AsyncStorage.setItem('books', JSON.stringify([]))
        return false;
    }
    for (let i = 0; i < books.length; i++) {
        let book = books[i];
        if (book.key === b_code) {
            return true;
        }
    }
    return false;
}