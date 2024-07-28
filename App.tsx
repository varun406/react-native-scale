import React from 'react';
import {StyleSheet, View} from 'react-native';
import HeightScaleInFeet from './src/components/HeightScaleInFeet';
import HeightScaleInCm from './src/components/HeightScaleInCm';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {/* <Scale /> */}
        {/* <HeightScaleInFeet suffix="ft" />
        <HeightScaleInFeet suffix="in" reverse /> */}
        <HeightScaleInCm />
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
    justifyContent: 'space-around',
  },
});

export default App;
