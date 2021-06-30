import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';


import { connect } from 'react-redux';

import ResultDetail from "./ResultDetail";
import axios from 'axios';


const ResultBar = ({ title, cat, navigation }) => {

    const [catData, setCatData] = useState([]);

    useEffect(() => {
        async function fetchAPI() {
            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
                setCatData(response.data.meals);
            } catch (err) {
                console.log(error);
            }
        }
        fetchAPI();
    }, [])

    if (catData.length < 1) {
        return null;
    }


    return (

        <View style={style.container}>
            <View >
                <View style={style.top}>
                    <Text style={style.title}>{title} { } </Text>
                    {catData.length < 5 ? null :
                        <TouchableOpacity onPress={() => navigation.navigate('ViewCat', { cat })}>
                            <Text style={{ fontWeight: 'bold' }} >View All </Text>
                        </TouchableOpacity>
                    }
                </View>
                <View style={style.flat}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={catData.slice(0, 5)}
                        keyExtractor={result => result.idMeal}
                        renderItem={({ item }) => {

                            return (
                                <View style={{ width: 120, height: "100%" }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Detail', { getId: item.idMeal, getName: item.strMeal })}>
                                        <ResultDetail result={item}></ResultDetail>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}>
                    </FlatList>
                </View>
            </View >
        </View>
    );

    // else {
    //     return (
    //         <View style={style.screen}>
    //             <View style={style.container}>
    //                 <View style={style.loading}>
    //                     <ActivityIndicator size="large" color="#0000ff" />
    //                 </View>

    //             </View>
    //         </View>
    //     )
    // }
};

const style = StyleSheet.create({
    title: {
        marginLeft: 15,
        fontSize: 18,
        fontWeight: 'bold',
    },
    container: {
        marginBottom: 10,
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10,
        paddingBottom: 8,

    },


});

const mapStateToProps = state => {
    return { getMeal: state.meals }
}

export default connect(mapStateToProps)(ResultBar);
