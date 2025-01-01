import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useMusic} from '../provider/MusicContext';
import {unknownTrackImageUri} from '../../../constants/Image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TrackPlayer, {State} from 'react-native-track-player';

const MusicPlayer = () => {
  const {actualSong} = useMusic();
  const [playerState, setPlayerState] = useState<State>(State.None);

  useEffect(() => {
    const updatePlayerState = async () => {
      const state = await TrackPlayer.getState();
      setPlayerState(state);
    };

    updatePlayerState();
  }, []);

  const togglePlayPause = async () => {
    try {
      const state = await TrackPlayer.getState();
      if (state === State.Playing) {
        await TrackPlayer.pause();
        setPlayerState(State.Paused);
      } else {
        await TrackPlayer.play();
        setPlayerState(State.Playing);
      }
    } catch (error) {
      console.error('Error toggling play/pause:', error);
    }
  };

  const skipToPrevious = async () => {
    try {
      await TrackPlayer.skipToPrevious();
      setPlayerState(State.Playing);
    } catch (error) {
      console.error('Erreur skip previous:', error);
    }
  };

  const skipToNext = async () => {
    try {
      await TrackPlayer.skipToNext();
      setPlayerState(State.Playing);
    } catch (error) {
      console.error('Erreur skip next:', error);
    }
  };

  if (!actualSong) {
    return <Text style={styles.noSongText}>Aucun son selectionner</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageContainer}
        source={{
          uri:
            typeof actualSong.artwork === 'string'
              ? actualSong.artwork
              : unknownTrackImageUri,
        }}
      />
      <Text style={styles.title}>{actualSong.title}</Text>
      <Text style={styles.artist}>{actualSong.artist}</Text>
      <View style={styles.containerIcon}>
        <AntDesign
          name="stepbackward"
          style={styles.icon}
          onPress={skipToPrevious}
        />
        <AntDesign
          name={playerState === State.Playing ? 'pausecircle' : 'caretright'}
          style={styles.icon}
          onPress={togglePlayPause}
        />
        <AntDesign
          name="stepforward"
          style={styles.icon}
          onPress={skipToNext}
        />
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
  containerIcon: {
    marginTop: 80,
    flexDirection: 'row',
  },
  imageContainer: {
    marginBottom: 15,
    backgroundColor: '#ffffff',
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
  icon: {
    color: '#fff',
    fontSize: 40,
    marginHorizontal: 20,
  },
  noSongText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MusicPlayer;
