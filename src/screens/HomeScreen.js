import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { fetchMeal } from '../actions';
import Result from '../Components/Result';

import { SearchBar } from 'react-native-elements';
import Colors from '../colors/index';
import axios from 'axios';
import { Card } from 'react-native-paper';




const HomeScreen = ({ navigation }) => {

    const [term, setTerm] = useState('');
    const [status, setStatus] = useState(false);
    const [data, setData] = useState([])

    const submitHandler = async () => {
        setStatus(true);
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        setData(response.data.meals)


    };


    return (
        <View style={style.screen}>
            <View style={style.container}>
                <SearchBar
                    lightTheme
                    round
                    placeholder="Type Here..."
                    containerStyle={{ backgroundColor: Colors.fourthColor, borderTopColor: "white" }}
                    onChangeText={text => setTerm(text)}
                    value={term}
                    onEndEditing={submitHandler}
                ></SearchBar>
            </View>

            {status === false ?
                <View style={style.flat}>
                    <ScrollView >
                        <Result title="Beef" cat="Beef" navigation={navigation}></Result>
                        <Result title="Chicken" cat="Chicken" navigation={navigation}></Result>
                        <Result title="Dessert" cat="Dessert" navigation={navigation}></Result>
                        <Result title="Goat" cat="Goat" navigation={navigation}></Result>
                        <Result title="Lamb" cat="Lamb" navigation={navigation}></Result>
                        <Result title="Miscellaneous" cat="Miscellaneous" navigation={navigation}></Result>
                        <Result title="Pasta" cat="Pasta" navigation={navigation}></Result>
                        <Result title="Pork" cat="Pork" navigation={navigation}></Result>
                        <Result title="Seafood" cat="Seafood" navigation={navigation}></Result>
                        <Result title="Side" cat="Side" navigation={navigation}></Result>
                        <Result title="Starter" cat="Starter" navigation={navigation}></Result>
                        <Result title="Vegan" cat="Vegan" navigation={navigation}></Result>
                        <Result title="Vegetarian" cat="Vegetarian" navigation={navigation}> </Result>
                    </ScrollView>
                </View>
                :
                term.length < 1 ? setStatus(false) & setData('') :
                    <View style={style.screen}>
                        <View style={style.container2}>

                            <FlatList
                                horizontal={false}
                                numColumns={3}
                                data={data}
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

                        </View>
                    </View>

            }
        </View>
    )


};

const style = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F2F6FF'
    },
    container: {
        marginTop: Dimensions.get('window').height / 19,
        width: "90%",
    },
    container2: {
        flex: 1,
        width: "100%",
        backgroundColor: '#F2F6FF'
    },
    flat: {
        flex: 1,
    },
    card: {
        width: '100%',
        maxWidth: '33%',
        padding: 5,
    },

});

const mapStateToProps = state => {
    return { getMeal: state.meals }
}

export default connect(mapStateToProps, { fetchMeal })(HomeScreen);