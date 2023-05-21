import AsyncStorage from '@react-native-async-storage/async-storage';

export async function RemoveBookInLibrary(b_code) {
    let books = await AsyncStorage.getItem('books');
    books = JSON.parse(books);
    for (let i = 0; i < books.length; i++) {
        let book = books[i];
        if (book.key === b_code) {
            books.splice(i, 1);
        }
    }
    await AsyncStorage.setItem('books', JSON.stringify(books))
}