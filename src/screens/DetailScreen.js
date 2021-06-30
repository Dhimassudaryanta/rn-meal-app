import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import axios from 'axios';
import YoutubePlayer from 'react-native-youtube-iframe';
import { connect } from 'react-redux';

import { saveFood } from '../actions/index';
import { removeFood } from '../actions/index';

const DetailScreen = ({ route, getFavorite, navigation, saveFood, removeFood }) => {
    const { getId } = route.params;

    const [detail, setDetail] = useState('');
    const [title, setTitle] = useState('')

    const favouriteHandler = () => {
        if (Filter) {
            removeFood(getId, () => navigation.navigate('Favourite'))
        }
        else {
            saveFood(detail)
            navigation.navigate('Favourite')
        }
    };

    const Filter = getFavorite.find(
        (Detail) => Detail.idMeal === getId
    );

    useEffect(() => {
        if (Filter) {
            setTitle("Remove from favourite")
            console.log(Filter);
            setDetail(Filter);
        }
        else {
            setTitle("Add to Favorite")

            async function fetchAPI() {

                try {
                    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${getId}`)

                    const haha = await response.data.meals.map((data) =>
                        setDetail(data)
                    );
                } catch (err) {
                    console.log(error);
                }
            }
            fetchAPI();
        }

    }, [route, getFavorite])

    return (
        <ScrollView>
            <View style={style.screen}>
                <View style={style.container}>
                    <View style={style.row}>
                        <View>
                            <Avatar
                                rounded
                                size="xlarge"
                                icon={{ name: "user", type: "font-awesome" }}
                                source={{
                                    uri:
                                        detail.strMealThumb,
                                }}
                            >

                            </Avatar>
                        </View>
                        <View style={{ maxWidth: "50%", alignItems: 'center' }}>
                            <Text
                                style={style.text}
                                numberOfLines={2}
                                ellipsizeMode="tail"
                            >{detail.strMeal} </Text>
                        </View>
                    </View>
                    <View style={style.border}></View>

                    <View><Text style={style.textContent}>Area : {detail.strArea}</Text>
                        <Text style={style.textContent}>Category : {detail.strCategory}</Text>
                        <Text style={style.textContent}>Tag : {detail.strTags}</Text>

                    </View>
                    <View style={style.border}></View>

                    <View>
                        {detail.strYoutube ?
                            <YoutubePlayer
                                height={200}
                                play={true}
                                videoId={detail.strYoutube.substr(32)}
                            />
                            :
                            <Text>Sorry .. Video not available</Text>
                        }
                    </View>

                    <View style={style.border}></View>
                    <View>
                        <Text style={style.textContent} >Instructions : {detail.strInstructions}</Text>
                    </View>
                </View>
                <View style={{ paddingTop: 15, paddingBottom: 15, alignItems: "center", width: "100%" }}>
                    <View style={{ width: "80%" }}>

                        <Button
                            title={title}
                            onPress={favouriteHandler}
                            color="#f0ad4e"
                        ></Button>

                    </View>
                </View>
            </View >
        </ScrollView>
    );
}

const style = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F2F6FF'
    },
    container: {
        flex: 1,
        width: "90%",
        paddingTop: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    text: {

        fontSize: 20,
        fontWeight: "bold",
    },
    textContent: {

        fontSize: 14,
        color: "black",
        textAlign: "justify"
    },
    border: {
        marginVertical: 30,
        borderBottomWidth: 2,
        borderColor: "#ccc"
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    videoContainer: {
        flex: 1,
        width: "100%",
        height: 200,
        justifyContent: 'center',
    },
    video: {
        alignSelf: 'center',
        width: 320,
        height: 200,
    }
});

const mapStateToProps = state => {
    return { getFavorite: state.meals }
}

export default connect(mapStateToProps, { saveFood, removeFood })(DetailScreen);