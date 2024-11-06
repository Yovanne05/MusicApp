import React, {useState, useEffect} from "react";
import {View, Text, ScrollView, Button, StyleSheet, ActivityIndicator} from "react-native";
import library from "../../data/library.json";
import TrackPlayer, {State} from "react-native-track-player";
import {songs} from '../../interfaces/songs';
import { useMusic } from '../../app/(tabs)/provider/MusicContext';

function SearchResult({search}: { search: string }) {
    const { setSong, actualSong } = useMusic()
    const [playerState, setPlayerState] = useState<State>(State.None);

    useEffect(() => {
        const checkPlayerState = async () => {
            const state = await TrackPlayer.getState();
            setPlayerState(state);
        };

        checkPlayerState();
    }, []);

    const play = async (song: songs) => {
        try {
            setSong(song);
            if (actualSong) {
                if (actualSong?.url === song.url) {
                    await togglePlayPause();
                } else {
                    // Load a new track
                    await TrackPlayer.reset();
                    await TrackPlayer.add({
                        id: song.id,
                        url: song.url,
                        title: song.title,
                        artist: song.artist,
                        artwork: song.artwork,
                    });
                    await TrackPlayer.play();
                    setPlayerState(State.Playing);
                }
            }
        } catch (error) {
            console.error("Failed to play song:", error);
        }
    };

    const togglePlayPause = async () => {
        try {
            const state = await TrackPlayer.getState();
            setPlayerState(state);

            if (state === State.Playing) {
                await TrackPlayer.pause();
                setPlayerState(State.Paused);
            } else if (state === State.Paused || state === State.Ready || state === State.Stopped) {
                await TrackPlayer.play();
                setPlayerState(State.Playing);
            }
        } catch (error) {
            console.error("Error toggling play/pause:", error);
        }
    };

    const filteredResults = library.filter(
        (item) =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            (item.artist && item.artist.toLowerCase().includes(search.toLowerCase()))
    );

    const result: songs[] = filteredResults.map((value) => ({
        url: value.url,
        title: value.title,
        artist: value.artist || "Unknown Artist",
        artwork: value.artwork || "defaultArtwork.jpg",
        id: value.id
    }));

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View>
                    {result.length === 0 ? (
                        <Text style={styles.noResultsText}>No results found</Text>
                    ) : (
                        result.map((value) => (
                            <View key={value.id} style={styles.songContainer}>
                                <View style={styles.textContainer}>
                                    <Text style={styles.tile}>{value.title}</Text>
                                    <Text style={styles.artist}>{value.artist}</Text>
                                    <Button
                                        title={playerState === State.Playing && actualSong?.url === value.url ? "Pause" : "Play"}
                                        onPress={() => play(value)}
                                    />
                                </View>
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

export default SearchResult;

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
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
        borderRadius: 8,
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
        color: "#cccccc",
    },
    textContainer: {
        marginVertical: 4,
        paddingHorizontal: 8,
    },
    noResultsText: {
        color: "#ffffff",
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
});
