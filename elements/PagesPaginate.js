import { StyleSheet, View, FlatList } from 'react-native';
import * as React from 'react';
import { Button } from 'react-native-elements';


export const PagesPaginate = ({ collection, pages, paginator }) => {

    return (
        <View style={styles.paginate}>
            <View style={styles.list}>
                <FlatList data={pages} horizontal={true} renderItem={({ item }) => (
                    <Button
                        key={item.key}
                        title={item.i + 1}
                        onPress={() => {
                            paginator(collection, item.i)
                        }}
                        buttonStyle={styles.but_p}
                    />
                )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    paginate: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    but_p: {
        width: 50,
        padding: 5,
        borderRadius: 0,
        backgroundColor: '#008d83',
    },
    list: {
        width: '100%',

    },
    paginate: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20
    },
});