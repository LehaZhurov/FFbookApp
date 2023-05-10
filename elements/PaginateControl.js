import { StyleSheet, View } from 'react-native';
import * as React from 'react';
import { Button, Text, Icon } from 'react-native-elements';



export function PaginateControl({ page, downPage, upPage }) {
    return (
        <View style={styles.paginate}>
            <Button
                title={''}
                onPress={downPage}
                icon={<Icon name="arrow-back" color="#008d83" iconStyle={{ marginRight: 10 }} />}
                buttonStyle={{
                    borderColor: '#f2f2f2',
                }}
                type="outline"
                titleStyle={{ color: 'rgba(78, 116, 289, 1)' }}
                containerStyle={{
                    // marginHorizontal: 50,
                }}
            />
            <Text style={styles.num}>{page + 1}</Text>
            <Button
                title={''}
                onPress={upPage}
                icon={<Icon name="arrow-forward" color="#008d83" iconStyle={{ marginRight: 10 }} />}
                buttonStyle={{
                    borderColor: '#f2f2f2',
                }}
                type="outline"
            />
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
    page: {
        width: 30,
        fontSize: 20,
        backgroundColor: '#008d83',
        fontSize: '30px',
        color: 'white'
    }
});