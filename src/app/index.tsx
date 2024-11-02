import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from "react-native";
import SearchScreen from "./(tabs)/search/SearchScreen";
import PlaylistsScreen from "./(tabs)/playlists/PlaylistsScreen";
import MusicPlayer from "./(tabs)/musicplayer/MusicPlayer";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
    const [defaultSong] = useState({
        id: 0,
        title: "Default Song",
        artists: "Default Artist",
        url: "default",
        duration: 180,
        artworks: "default"
    });

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: '#2c2c2c' },
                tabBarActiveTintColor: '#ffffff',
                tabBarInactiveTintColor: '#888888'
            }}
        >
            <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Playlists" component={PlaylistsScreen} options={{ headerShown: false }} />
            <Tab.Screen
                name="Player"
                options={{ headerShown: false }}
                children={() => <MusicPlayer song={defaultSong} />}
            />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Main" component={Tabs} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}
