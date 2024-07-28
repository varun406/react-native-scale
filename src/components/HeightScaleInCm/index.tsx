import React, {useCallback, useReducer, useRef} from 'react';
import {Animated, Dimensions, FlatList, StyleSheet, View} from 'react-native';

const CONTAINER_HEIGHT = 100;

const ITEM_SIZE = CONTAINER_HEIGHT / 14;

const initialState = {value: null};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_CURRENT_NUMBER':
      return {...state, value: action.payload};
    default:
      return state;
  }
};

const HeightScaleInCm = () => {
  const flatListRef = useRef<FlatList>(null);
  const [heightState, dispatch] = useReducer(reducer, initialState);
  const scrollY = useRef(new Animated.Value(0)).current;
  const TEMP = Array.from({length: 300}, (_, i) => ({id: i + 1}));

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_SIZE);
    console.log(event.nativeEvent.contentOffset.y);
    const currentNumber = TEMP[index]?.id;
    dispatch({type: 'SET_CURRENT_NUMBER', payload: currentNumber});
  };

  const renderItem = useCallback(({_, index}: {_: any; index: number}) => {
    const inputRange = [
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
      (index + 1) * ITEM_SIZE,
    ];

    const LineInputRange = [
      (index - 2) * ITEM_SIZE,
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
      (index + 1) * ITEM_SIZE,
      (index + 2) * ITEM_SIZE,
    ];

    const textOpacity = scrollY.interpolate({
      inputRange: LineInputRange,
      outputRange: [1, 0, 0, 0, 1],
      extrapolate: 'clamp',
    });

    const centerNumberOpacity = scrollY.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    });

    const centerNumberScale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1.9, 1],
      extrapolate: 'clamp',
    });

    const numberTranslateX = scrollY.interpolate({
      inputRange,
      outputRange: [-20, 7, -20],
      extrapolate: 'clamp',
    });

    const lineTranslateY = scrollY.interpolate({
      inputRange: LineInputRange,
      outputRange: [-25, -35, -42, -35, -25],
      extrapolate: 'clamp',
    });

    const lineHeight = scrollY.interpolate({
      inputRange: LineInputRange,
      outputRange: [5, 8, 11, 8, 5],
      extrapolate: 'clamp',
    });

    return (
      <View style={{flex: 1}} key={index}>
        <View
          style={{
            height: ITEM_SIZE,
            flexDirection: 'row',
            columnGap: 10,
          }}>
          <View style={styles.lineContainer}>
            <Animated.View
              style={[
                styles.line,
                {
                  width: 15,
                  height: 2,
                  transform: [
                    {translateX: lineTranslateY},
                    {scaleX: lineHeight},
                  ],
                },
              ]}
            />
          </View>
          <Animated.View style={[styles.restNumberContainer]}>
            {(index === 0 ? 5 : index + 1) % 5 === 0 && (
              <Animated.View
                style={[
                  styles.restNumbers,
                  {
                    opacity: textOpacity,
                    transform: [{translateX: numberTranslateX}],
                  },
                ]}>
                <Animated.Text style={[styles.numbers]}>
                  {index + 1}
                </Animated.Text>
              </Animated.View>
            )}
            <Animated.View
              style={[
                styles.restNumbers,
                {
                  opacity: centerNumberOpacity,
                  transform: [{scale: centerNumberScale}],
                },
              ]}>
              <Animated.Text style={[styles.numbers, styles.centerNumber]}>
                {index + 1}
              </Animated.Text>
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    );
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: CONTAINER_HEIGHT,
      }}>
      <View style={{height: CONTAINER_HEIGHT}}>
        <Animated.FlatList
          ref={flatListRef}
          data={TEMP}
          showsVerticalScrollIndicator={false}
          //   onMomentumScrollEnd={onMomentumScrollEnd}
          snapToInterval={ITEM_SIZE}
          decelerationRate="fast"
          scrollEventThrottle={16}
          initialScrollIndex={50}
          onScrollToIndexFailed={() => {
            setTimeout(() => {
              flatListRef?.current?.scrollToIndex({
                index: 30,
                animated: true,
              });
            }, 500);
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {
              listener: event => handleScroll(event),
              useNativeDriver: true,
            },
          )}
          contentContainerStyle={{
            paddingVertical: CONTAINER_HEIGHT / 2 - ITEM_SIZE / 2,
          }}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default HeightScaleInCm;

const styles = StyleSheet.create({
  numbers: {
    fontSize: 13,
    fontWeight: '900',
    color: '#686D76',
  },
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  line: {
    width: 2,
    backgroundColor: '#B5C0D0',
    alignSelf: 'flex-end',
    marginVertical: ITEM_SIZE / 12,
  },
  restNumberContainer: {
    position: 'relative',
    right: '0%',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  restNumbers: {
    position: 'absolute',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerNumber: {
    color: '#4B70F5',
  },
});
