import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { useMusic } from '../provider/MusicContext';
import {unknownTrackImageUri} from "../../../constants/Image";

const MusicPlayer = () => {
    const { actualSong } = useMusic();

    if (!actualSong) {
        return <Text>No song selected</Text>;
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.imageContainer}
                source={{
                    uri: typeof actualSong.artwork === 'string' ? actualSong.artwork : unknownTrackImageUri,
                }}
            />
            <Text style={styles.title}>{actualSong.title}</Text>
            <Text style={styles.artist}>{actualSong.artist}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    imageContainer: {
        marginBottom: 15,
        backgroundColor: "#ffffff",
        padding: 180,
        borderRadius: 10,
    },
    title: {
        color: '#fff',
        fontSize: 20,
    },
    artist: {
        color: '#ccc',
        fontSize: 16,
    },
});

export default MusicPlayer;
