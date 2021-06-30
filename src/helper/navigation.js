import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Colors from '../colors/index';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


import HomeScreen from '../screens/HomeScreen';
import ViewCategory from '../screens/ViewCategory';
import DetailScreen from '../screens/DetailScreen';
import FavoriteScreen from '../screens/FavoriteScreen';

//test



const StackTabs = () => {
    return (
        <Stack.Navigator mode="modal"
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Your Favourite", headerTitleAlign: "center", headerShown: false }}
            />


        </Stack.Navigator>
    )
}

const SecondStacks = () => {
    return (
        <Stack.Navigator
        >
            <Stack.Screen
                name="Favourite2"
                component={FavoriteScreen}
                options={{
                    title: "Your Favourite", headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: Colors.fourthColor
                    }
                }}
            />

        </Stack.Navigator>
    )
}

const BottomTabs = () => {
    return (
        < Tab.Navigator
            activeColor="#f0edf6"
            inactiveColor="#000"
            barStyle={{ backgroundColor: '#694fad' }}
            shifting={true}
        >
            <Tab.Screen
                name="HomeTab"
                component={StackTabs}
                options={{
                    tabBarColor: Colors.primaryColor,
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="md-list-outline" size={23} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Favourite"
                component={SecondStacks}
                options={{
                    tabBarColor: Colors.primaryColor,
                    tabBarLabel: 'Favorite ',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="md-star-outline" size={24} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

const navigation = () => {
    return (
        <Stack.Navigator mode="modal" headerMode="float"
        >
            <Stack.Screen
                name="Show"
                component={BottomTabs}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ViewCat"
                component={ViewCategory}
                options={({ route }) => ({
                    title: route.params.cat + " Category", headerTitleAlign: "center", headerStyle: {
                        backgroundColor: Colors.fourthColor
                    }
                })}
            />
            < Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={({ route }) => ({
                    title: 'Detail', headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: Colors.fourthColor
                    }
                })}
            />
        </Stack.Navigator>


    )
}

export default navigation;