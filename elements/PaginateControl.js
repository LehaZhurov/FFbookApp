import { StyleSheet, View } from 'react-native';
import * as React from 'react';
import { Button, Text, Icon } from 'react-native-elements';


export const PaginateControl = ({ page, downPage, upPage }) => {

    return (
        <View style={styles.paginate}>
            <Button
                title={''}
                onPress={downPage}
                icon={<Icon name="arrow-back" color="#008d83" iconStyle={{ marginRight: 10 }} />}
                buttonStyle={styles.buttonStyle}
                type="outline"
            />
            <Text style={styles.num}>{page + 1}</Text>
            <Button
                title={''}
                onPress={upPage}
                icon={<Icon name="arrow-forward" color="#008d83" iconStyle={{ marginRight: 10 }} />}
                buttonStyle={styles.buttonStyle}
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
    num: {
        fontSize: 20,
        color: '#008d83'
    },
    pageNum: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonStyle: {
        borderColor: '#f2f2f2',
    }
});