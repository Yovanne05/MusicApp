import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { defaultStyles } from "../../../style";
import { songs } from "../../../interfaces/songs";

function MusicPlayer({ song }: { song: songs }) {
    return (
        <View style={defaultStyles.container}>
            <View style={styles.container}>
                <View style={styles.imageContainer}></View>
                <Text style={styles.title}>{song.title}</Text>
                <Text style={styles.artist}>{song.artists}</Text>
            </View>
        </View>
    );
}

export default MusicPlayer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 80,
        backgroundColor: "#000000",
    },
    imageContainer: {
        marginBottom: 15,
        backgroundColor: "#ffffff",
        padding: 180,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        color: "#ffffff",
        marginTop: 20,
    },
    artist: {
        fontSize: 16,
        color: "#555",
        marginTop: 5,
    },
});
