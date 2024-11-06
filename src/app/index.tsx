import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaView} from "react-native";
import SearchScreen from "./(tabs)/search/SearchScreen";
import PlaylistsScreen from "./(tabs)/playlists/PlaylistsScreen";
import MusicPlayer from "./(tabs)/musicplayer/MusicPlayer";
import TrackPlayer from "react-native-track-player";
import {MusicProvider} from "./(tabs)/provider/MusicContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {backgroundColor: '#2c2c2c'},
                tabBarActiveTintColor: '#ffffff',
                tabBarInactiveTintColor: '#888888'
            }}
        >
            <Tab.Screen name="Search" component={SearchScreen} options={{headerShown: false}}/>
            <Tab.Screen name="Playlists" component={PlaylistsScreen} options={{headerShown: false}}/>
            <Tab.Screen name="Player" component={MusicPlayer} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
}

const setup = async () => {
    await TrackPlayer.setupPlayer();
}

export default function App() {
    setup();
    return (
        <SafeAreaView style={{flex: 1}}>
            <MusicProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Main" component={Tabs} options={{headerShown: false}}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </MusicProvider>
        </SafeAreaView>
    );
}
