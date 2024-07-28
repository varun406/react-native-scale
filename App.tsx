import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Scale from './src/components/Scale';
import WeightScale from './src/components/WeightScale';
import QuestionScreen from './src/components/Questions';
import HeightScale from './src/components/HeightScale';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const ITEM_SIZE = SCREEN_WIDTH / 7;

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {/* <Scale /> */}
        <HeightScale suffix="ft" />
        <HeightScale suffix="in" reverse />
        {/* <WeightScale /> */}
        {/* <QuestionScreen /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    // overflow: 'hidden',
  },
});

export default App;
