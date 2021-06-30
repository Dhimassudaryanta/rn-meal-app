import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { Card } from 'react-native-paper';

const FavoriteScreen = ({ getFavorite, navigation }) => {

    const onPressHandler = (gotId) => {
        navigation.navigate('Detail', { idCatched: gotId })
    };


    if (getFavorite.length > 0) {
        return (
            <View style={style.screen}>
                <View style={style.container2}>
                    <FlatList
                        horizontal={false}
                        numColumns={2}
                        data={getFavorite}
                        keyExtractor={(moment) => moment.idMeal.toString()}
                        renderItem={({ item }) => {
                            return (
                                <View style={style.card2} >
                                    <TouchableOpacity onPress={() => navigation.navigate('Detail', { getId: item.idMeal })}>
                                        <Card mode="outlined">
                                            <Card.Cover
                                                source={{ uri: item.strMealThumb }}>
                                            </Card.Cover>
                                            <Text numberOfLines={1} style={{ padding: 5 }}>{item.strMeal} </Text>

                                        </Card>

                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    >
                    </FlatList>
                </View>
            </View>

        );
    } else {
        return (
            <View style={style.screen}>
                <View style={style.container}>
                    <Text>You dont have any favourites food yet !</Text>
                </View>
            </View>
        );
    }
};

const style = StyleSheet.create({

    // batas
    screen: {
        backgroundColor: '#F2F6FF',
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        width: "90%",
        alignItems: "center",
    },
    //batas
    card: {
        padding: 5,
        flex: 1
    },
    image: {
        flex: 1,
        width: null,
        height: Dimensions.get('window').height / 3.5
    },
    container2: {
        flex: 1,
        width: "100%",
        backgroundColor: '#F2F6FF'
    },
    card2: {
        width: '100%',
        maxWidth: '50%',
        padding: 5,
    },


});

const mapStateToProps = state => {
    return { getFavorite: state.meals }
}

export default connect(mapStateToProps)(FavoriteScreen);