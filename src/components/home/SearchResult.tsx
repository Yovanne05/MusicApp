import React from "react";
import {View, Text, ScrollView, Button} from "react-native";
import library from "../../data/library.json";
import { StyleSheet } from "react-native";
import {style} from "./Search";

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

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View>
                    {result.map((value) => (
                        <View key={value.id} style={styles.songContainer}>
                            <View style={styles.textContainer}>
                                <Text style={styles.tile}>{value.title}</Text>
                                <Text style={styles.artist}>{value.artist}</Text>
                            </View>

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
        marginTop:30,
        margin: 10,
        width: "90%",
        borderRadius: 10,
        backgroundColor: "#2c2c2c",
        flex: 1,
        justifyContent: 'flex-start',
    },
    songContainer: {
        marginVertical: 8,
        padding: 8,
        backgroundColor: "#7e7e7e",
        borderRadius: 8
    },
    scrollContent: {
        flexGrow: 1,
        padding: 10,
    },
    tile: {
        color: "#ffffff",
        fontSize: 16,
    },
    artist: {
        fontSize: 12,
        color: "#cccccc"
    },
    textContainer: {
        marginVertical: 4,
        paddingHorizontal: 8
    }
});
