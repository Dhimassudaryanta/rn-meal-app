import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ViewRender from '../Components/ViewCat.component';


const ViewCategory = ({ route, navigation }) => {

    const { cat } = route.params;

    return (
        <View style={style.screen}>
            <ViewRender cat={cat} navigation={navigation} />
        </View>
    );
}

const style = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        width: "100%",
        backgroundColor: '#F2F6FF'
    },
    container: {
        width: "100%",
        flex: 1,
    },
});

export default ViewCategory;