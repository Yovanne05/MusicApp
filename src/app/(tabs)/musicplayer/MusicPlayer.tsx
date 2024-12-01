import React from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';
import { useMusic } from '../provider/MusicContext';
import {unknownTrackImageUri} from "../../../constants/Image";
import AntDesign from 'react-native-vector-icons/AntDesign';

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
            <View style={styles.containerIcon}>
                <AntDesign name='stepbackward' style={{color : '#fff', fontSize:40}}/>
                <AntDesign name='caretright' style={{color : '#fff', fontSize:40}}/>
                <AntDesign name='stepforward' style={{color : '#fff', fontSize:40}}/>
            </View>

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
    containerIcon : {
        marginTop:80,
        flexDirection: 'row',
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
