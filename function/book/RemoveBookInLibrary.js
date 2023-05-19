import AsyncStorage from '@react-native-async-storage/async-storage';

export async function RemoveBookInLibrary(book) {
    await AsyncStorage.removeItem('@' + book.b_code)
}