import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width - 32;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const ITEM_SIZE = SCREEN_WIDTH / 7;

const Scale = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const TEMP = Array.from({length: 10}, (_, i) => ({id: i + 1}));

  const onMomentumScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / ITEM_SIZE);
    setCurrentNumber(TEMP[index]?.id);
  };

  console.log('currentNumber', currentNumber);
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <View style={{height: 100}}>
        <Animated.FlatList
          data={TEMP}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onMomentumScrollEnd}
          snapToInterval={ITEM_SIZE}
          decelerationRate="fast"
          scrollEventThrottle={16}
          horizontal
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {x: scrollX},
                },
              },
            ],
            {useNativeDriver: false},
          )}
          contentContainerStyle={{
            paddingHorizontal: (SCREEN_WIDTH - 32) / 2 - ITEM_SIZE / 2 + 10,
          }}
          renderItem={({item, index}) => {
            const inputRange = [
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
              (index + 1) * ITEM_SIZE,
            ];

            const color = scrollX.interpolate({
              inputRange,
              outputRange: ['#686D76', '#4B70F5', '#686D76'],
              extrapolate: 'clamp',
            });

            const numberTranslateY = scrollX.interpolate({
              inputRange,
              outputRange: [0, -25, 0],
              extrapolate: 'clamp',
            });

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.4, 1, 0.4],
              extrapolate: 'clamp',
            });

            const lineHeights = [
              scrollX.interpolate({
                inputRange,
                outputRange: [15, 20, 15],
                extrapolate: 'clamp',
              }),
              scrollX.interpolate({
                inputRange,
                outputRange: [15, 30, 15],
                extrapolate: 'clamp',
              }),
              scrollX.interpolate({
                inputRange,
                outputRange: [15, 40, 15],
                extrapolate: 'clamp',
              }),
              scrollX.interpolate({
                inputRange,
                outputRange: [15, 30, 15],
                extrapolate: 'clamp',
              }),
              scrollX.interpolate({
                inputRange,
                outputRange: [15, 20, 15],
                extrapolate: 'clamp',
              }),
            ];

            const lineTranslateY = [
              scrollX.interpolate({
                inputRange,
                outputRange: [-15, -20, -15],
                extrapolate: 'clamp',
              }),
              scrollX.interpolate({
                inputRange,
                outputRange: [-15, -30, -15],
                extrapolate: 'clamp',
              }),
              scrollX.interpolate({
                inputRange,
                outputRange: [-15, -40, -15],
                extrapolate: 'clamp',
              }),
              scrollX.interpolate({
                inputRange,
                outputRange: [-15, -30, -15],
                extrapolate: 'clamp',
              }),
              scrollX.interpolate({
                inputRange,
                outputRange: [-15, -20, -15],
                extrapolate: 'clamp',
              }),
            ];

            const lineColors = [
              scrollX.interpolate({
                inputRange,
                outputRange: ['#000', '#4B70F5', '#000'],
                extrapolate: 'clamp',
              }),
              scrollX.interpolate({
                inputRange,
                outputRange: ['#000', '#4B70F5', '#000'],
                extrapolate: 'clamp',
              }),
              scrollX.interpolate({
                inputRange,
                outputRange: ['#000', '#4B70F5', '#000'],
                extrapolate: 'clamp',
              }),
              scrollX.interpolate({
                inputRange,
                outputRange: ['#000', '#4B70F5', '#000'],
                extrapolate: 'clamp',
              }),
              scrollX.interpolate({
                inputRange,
                outputRange: ['#000', '#4B70F5', '#000'],
                extrapolate: 'clamp',
              }),
            ];

            return (
              <View style={{flex: 1, alignItems: 'center'}} key={index}>
                <Animated.View
                  style={{
                    width: ITEM_SIZE,
                    height: SCREEN_HEIGHT / 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: [{translateY: numberTranslateY}],
                  }}>
                  <Animated.Text
                    style={[styles.numbers, {color, transform: [{scale}]}]}>
                    {item.id}
                  </Animated.Text>
                </Animated.View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {Array.from({length: 5}).map((_, i) => (
                    <Animated.View
                      key={i}
                      style={[
                        styles.line,
                        {
                          backgroundColor: lineColors[i],
                          height: lineHeights[i],
                          transform: [{translateY: lineTranslateY[i]}],
                          marginHorizontal: ITEM_SIZE / 12, // Add margin to create a gap between lines
                        },
                      ]}
                    />
                  ))}
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Scale;

const styles = StyleSheet.create({
  numbers: {
    fontSize: 35,
    fontWeight: '900',
    color: '#000',
  },
  line: {
    width: 2,
    backgroundColor: '#000',
  },
});
