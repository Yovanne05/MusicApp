import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { defaultStyles } from "../../../style";
import { songs } from "../../../interfaces/songs";
import TrackPlayer, {Track} from 'react-native-track-player';

function MusicPlayer() {
    const [actualSong, setSong] = useState<Track>({
        url: "default",
        artist: "default",
        id: 0,
        title: "Default Song",
        artwork: "Default Artwork",
    });

    useEffect(() => {
        const fetchCurrentTrack = async () => {
            const trackId = await TrackPlayer.getCurrentTrack();
            if (trackId !== null) {
                const track = await TrackPlayer.getTrack(trackId);
                if (track) {
                    setSong(track);
                }
            }
        };
        fetchCurrentTrack();
    }, []);

    return (
        <View style={defaultStyles.container}>
            <View style={styles.container}>
                <View style={styles.imageContainer}></View>
                <Text style={styles.title}>{actualSong.title}</Text>
                <Text style={styles.artist}>{actualSong.artist}</Text>
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
