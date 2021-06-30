import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native';

import axios from 'axios';

import { Card } from 'react-native-paper';
import navigation from '../helper/navigation';


const ViewCategory = ({ cat, navigation }) => {

    const [allData, setAllData] = useState([]);

    useEffect(() => {
        async function fetchAPI() {
            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
                setAllData(response.data.meals);
            } catch (err) {
                console.log(error);
            }
        }
        fetchAPI();
    }, [])




    return (
        <FlatList
            horizontal={false}
            numColumns={3}
            data={allData}
            keyExtractor={result => result.idMeal}
            renderItem={({ item }) => {

                return (
                    <View style={style.card} >
                        <TouchableOpacity onPress={() => navigation.navigate('Detail', { getId: item.idMeal, strMeal: item.strMeal })}>
                            <Card style={{ backgroundColor: '#F2F6FF' }} mode="outlined">

                                <Card.Cover source={{ uri: item.strMealThumb }}
                                    style={{ margin: 5, height: Dimensions.get('window').height / 7.7 }} />

                                <Text
                                    style={{ marginHorizontal: 5 }}
                                    numberOfLines={1}
                                >
                                    {item.strMeal}
                                </Text>
                            </Card>
                        </TouchableOpacity>

                    </View >

                );
            }}>
        </FlatList >
    );
}

const style = StyleSheet.create({
    card: {
        width: '34%',
        padding: 5,
    },

});

export default ViewCategory;