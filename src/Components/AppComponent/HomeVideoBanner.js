import React from 'react';
import {View, StyleSheet} from 'react-native';
import Video from 'react-native-video';

export default function HomeVideoBanner() {
  return (
    <View style={styles.container}>
      <Video
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        style={styles.videoContainer}
        playInBackground={false}
        repeat={true}
        resizeMode="cover"
        muted={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  videoContainer: {
    width: '100%',
    height: 300,
  },
});
