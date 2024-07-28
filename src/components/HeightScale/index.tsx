import React, {useCallback, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';

const CONTAINER_HEIGHT = 100;

const ITEM_SIZE = CONTAINER_HEIGHT / 5; // Each item size based on height constraint

interface HeightScaleProps {
  reverse?: boolean;
  suffix?: string;
}

const HeightScale = ({reverse = false, suffix}: HeightScaleProps) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const TEMP = Array.from({length: 10}, (_, i) => ({id: i + 1}));

  const onMomentumScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_SIZE);
    setCurrentNumber(TEMP[index]?.id);
  };

  console.log('currentNumber', currentNumber);

  const renderItem = useCallback(({item, index}) => {
    const inputRange = [
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
      (index + 1) * ITEM_SIZE,
    ];

    const inputRangeOpacity = [
      (index - 2) * ITEM_SIZE,
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
      (index + 1) * ITEM_SIZE,
      (index + 2) * ITEM_SIZE,
    ];

    const numberColor = scrollY.interpolate({
      inputRange,
      outputRange: ['#686D76', '#4B70F5', '#686D76'],
      extrapolate: 'clamp',
    });

    const numberScale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1.7, 1],
      extrapolate: 'clamp',
    });

    const numberOpacity = scrollY.interpolate({
      inputRange: inputRangeOpacity,
      outputRange: [0.3, 0.8, 1, 0.8, 0.3],
    });

    const lineColors = [
      scrollY.interpolate({
        inputRange,
        outputRange: ['#B5C0D0', '#B5C0D0', '#B5C0D0'],
        extrapolate: 'clamp',
      }),
      scrollY.interpolate({
        inputRange,
        outputRange: ['#B5C0D0', '#3FA2F6', '#B5C0D0'],
        extrapolate: 'clamp',
      }),
      scrollY.interpolate({
        inputRange,
        outputRange: ['#B5C0D0', '#4B70F5', '#B5C0D0'],
        extrapolate: 'clamp',
      }),
      scrollY.interpolate({
        inputRange,
        outputRange: ['#B5C0D0', '#3FA2F6', '#B5C0D0'],
        extrapolate: 'clamp',
      }),
      scrollY.interpolate({
        inputRange,
        outputRange: ['#B5C0D0', '#B5C0D0', '#B5C0D0'],
        extrapolate: 'clamp',
      }),
    ];

    const lineTranslateX = [
      scrollY.interpolate({
        inputRange,
        outputRange: [0, 10, 0],
        extrapolate: 'clamp',
      }),
      scrollY.interpolate({
        inputRange,
        outputRange: [0, 10, 0],
        extrapolate: 'clamp',
      }),
      scrollY.interpolate({
        inputRange,
        outputRange: [0, 10, 0],
        extrapolate: 'clamp',
      }),
      scrollY.interpolate({
        inputRange,
        outputRange: [0, 10, 0],
        extrapolate: 'clamp',
      }),
      scrollY.interpolate({
        inputRange,
        outputRange: [0, 10, 0],
        extrapolate: 'clamp',
      }),
    ];

    const lineTranslateXReverse = [
      scrollY.interpolate({
        inputRange,
        outputRange: [0, 0, 0],
        extrapolate: 'clamp',
      }),
      scrollY.interpolate({
        inputRange,
        outputRange: [0, -3, 0],
        extrapolate: 'clamp',
      }),
      scrollY.interpolate({
        inputRange,
        outputRange: [0, -10, 0],
        extrapolate: 'clamp',
      }),
      scrollY.interpolate({
        inputRange,
        outputRange: [0, -3, 0],
        extrapolate: 'clamp',
      }),
      scrollY.interpolate({
        inputRange,
        outputRange: [0, 0, 0],
        extrapolate: 'clamp',
      }),
    ];

    const lineWidth = [
      scrollY.interpolate({
        inputRange,
        outputRange: [15, 20, 15],
        extrapolate: 'clamp',
      }),
      scrollY.interpolate({
        inputRange,
        outputRange: [15, 28, 15],
        extrapolate: 'clamp',
      }),
      scrollY.interpolate({
        inputRange,
        outputRange: [15, 35, 15],
        extrapolate: 'clamp',
      }),
      scrollY.interpolate({
        inputRange,
        outputRange: [15, 28, 15],
        extrapolate: 'clamp',
      }),
      scrollY.interpolate({
        inputRange,
        outputRange: [15, 20, 15],
        extrapolate: 'clamp',
      }),
    ];

    return (
      <View style={{alignItems: 'center'}} key={index}>
        <View
          style={[
            styles.itemContainer,
            {flexDirection: reverse ? 'row-reverse' : 'row'},
          ]}>
          <View>
            <View
              style={{
                justifyContent: 'space-between',
              }}>
              {Array.from({length: 5}).map((_, i) => (
                <Animated.View
                  key={i}
                  style={[
                    styles.line,
                    {
                      backgroundColor: lineColors[i],
                      height: 1.5,
                      width: lineWidth[i],
                      transform: [
                        {
                          translateX: reverse
                            ? lineTranslateXReverse[i]
                            : lineTranslateX[i],
                        },
                        // {scaleX: lineScaleX[i]},
                      ],
                      marginVertical: ITEM_SIZE / 12, // Add margin to create a gap between lines
                    },
                  ]}
                />
              ))}
            </View>
          </View>
          <View
            style={[
              styles.numberContainer,
              {alignItems: reverse ? 'flex-start' : 'center'},
            ]}>
            <Animated.Text
              style={[
                styles.numbers,
                {
                  color: numberColor,
                  opacity: numberOpacity,
                  transform: [{scale: numberScale}],
                },
              ]}>
              {item?.id}
            </Animated.Text>
          </View>
        </View>
      </View>
    );
  }, []);

  return (
    <View style={[styles.scaleContainer]}>
      <View
        style={{
          height: CONTAINER_HEIGHT,
        }}>
        <Animated.FlatList
          data={TEMP}
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={onMomentumScrollEnd}
          snapToInterval={ITEM_SIZE}
          decelerationRate="fast"
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {y: scrollY},
                },
              },
            ],
            {useNativeDriver: false},
          )}
          renderItem={renderItem}
          contentContainerStyle={styles.listContentContainer}
        />
      </View>
      <View
        style={[
          styles.suffixContainer,
          reverse ? {left: '36%'} : {right: '15%'},
        ]}>
        <Text style={styles.suffixText}>{suffix}</Text>
      </View>
    </View>
  );
};

export default HeightScale;

const styles = StyleSheet.create({
  scaleContainer: {
    width: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: CONTAINER_HEIGHT,
  },
  suffixContainer: {
    position: 'absolute',
    top: '50%',
  },
  suffixText: {
    color: '#4B70F5',
    fontSize: 16,
    fontWeight: '500',
  },
  itemContainer: {
    height: ITEM_SIZE,
    alignItems: 'center',
    columnGap: 15,
  },
  listContentContainer: {
    paddingTop: CONTAINER_HEIGHT / 2,
    paddingBottom: CONTAINER_HEIGHT / 3.2,
  },
  numberContainer: {
    minWidth: 50,
    paddingHorizontal: 5,
    alignItems: 'flex-end',
  },
  numbers: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
  },
  line: {
    width: 2,
    backgroundColor: '#000',
  },
});
