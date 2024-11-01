import React from "react";
import { View, Text, ScrollView } from "react-native";
import library from "../data/library.json";
import { StyleSheet } from "react-native";
import TrackPlayer, {Capability} from "react-native-track-player";

function SearchResult({ search }: { search: string }) {
    const filteredResults = library.filter(
        (item) => item.title.toLowerCase().includes(search.toLowerCase()) ||
            (item.artist && item.artist.toLowerCase().includes(search.toLowerCase()))
    );

    const result = filteredResults.map(value => ({
        title: value.title,
        artist: value.artist || " ",
        id: value.id
    }));

    const playerMusic = async () =>{
        await TrackPlayer.play();
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View>
                    {result.map((value) => (
                        <View key={value.id} style={styles.songContainer}>
                            <Text style={styles.tile}>{value.title}</Text>
                            <Text>{value.artist}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

export default SearchResult;

const styles = StyleSheet.create({
    container: {
        margin: 20,
        width: "90%",
        borderRadius: 10,
        backgroundColor: "#2c2c2c",
        flex: 1,
        justifyContent: 'flex-start',
    },
    songContainer: {
        margin: 10,
        padding: 10,
        backgroundColor: "#7e7e7e",
        borderRadius: 8
    },
    scrollContent: {
        flexGrow: 1,
        padding: 10,
    },
    tile: {
        color: "#ffffff",
        fontSize: 20,
    }
});
