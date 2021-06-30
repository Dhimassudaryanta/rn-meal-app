import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';

import { Card } from 'react-native-paper';

const ResultDetail = ({ result }) => {


    return (
        <View style={style.container}>
            <Card style={{ backgroundColor: '#F2F6FF' }}
                mode="outlined"
            >
                <Card.Cover
                    source={{ uri: result.strMealThumb }} style={{ margin: 5, height: Dimensions.get('window').height / 7.7 }}
                />

                <Text
                    style={{ marginHorizontal: 5 }}
                    numberOfLines={1}
                >
                    {result.strMeal}
                </Text>
            </Card>

        </View>
    );

};

const style = StyleSheet.create({
    container: {
        marginLeft: 15,
    },

    image: {
        height: 100,
        width: 100,
        borderRadius: 4,
        marginBottom: 5,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 14,
    }

});

export default ResultDetail;
