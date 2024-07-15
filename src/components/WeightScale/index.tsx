import React, {useEffect, useReducer, useRef, useState} from 'react';
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

const ITEM_SIZE = SCREEN_WIDTH / 30;

const initialState = {currentNumber: null};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_NUMBER':
      return {...state, currentNumber: action.payload};
    default:
      return state;
  }
};

const Scale = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const scrollX = useRef(new Animated.Value(0)).current;
  const TEMP = Array.from({length: 150}, (_, i) => ({id: i + 1}));

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / ITEM_SIZE);
    console.log(TEMP[index]?.id);
    dispatch({type: 'SET_CURRENT_NUMBER', payload: TEMP[index]?.id});
  };

  return (
    <View
      style={{
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          position: 'absolute',
          zIndex: 9,
          top: 0,
          width: '100%',
          alignItems: 'center',
        }}>
        <Text style={[styles.numbers, {color: '#4B70F5'}]}>
          {state.currentNumber}
        </Text>
      </View>

      <View style={{height: 100}}>
        <Animated.FlatList
          data={TEMP}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
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
            {
              // listener: event => handleScroll(event),
              useNativeDriver: false,
            },
          )}
          contentContainerStyle={{
            paddingHorizontal: (SCREEN_WIDTH - 32) / 2 - ITEM_SIZE / 2 + 17,
          }}
          renderItem={({item, index}) => {
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

            const currentTextInputRange = [
              (index - 2) * ITEM_SIZE - 4,
              (index - 1) * ITEM_SIZE + 4,
              index * ITEM_SIZE - 2,
              (index + 1) * ITEM_SIZE - 4,
              (index + 2) * ITEM_SIZE + 4,
            ];

            const color = scrollX.interpolate({
              inputRange,
              outputRange: ['#686D76', '#ffffff', '#686D76'],
              extrapolate: 'clamp',
            });

            const currentTextOpacity = scrollX.interpolate({
              inputRange: currentTextInputRange,
              outputRange: [0, 0, 1, 0, 0],
              extrapolate: 'clamp',
            });

            const currentTextColor = scrollX.interpolate({
              inputRange: currentTextInputRange,
              outputRange: ['#fff', '#fff', '#4B70F5', '#fff', '#fff'],
              extrapolate: 'clamp',
            });

            const textOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [1, 0, 1],
              extrapolate: 'clamp',
            });

            const numberTranslateY = scrollX.interpolate({
              inputRange,
              outputRange: [0, -25, 0],
              extrapolate: 'clamp',
            });

            const lineHeights = scrollX.interpolate({
              inputRange: LineInputRange,
              outputRange: [25, 35, 50, 35, 25],
              extrapolate: 'clamp',
            });

            const lineTranslateY = scrollX.interpolate({
              inputRange: LineInputRange,
              outputRange: [-25, -35, -50, -35, -25],
              extrapolate: 'clamp',
            });

            const lineColors = scrollX.interpolate({
              inputRange: LineInputRange,
              outputRange: ['#000', '#3FA2F6', '#4B70F5', '#3FA2F6', '#000'],
              extrapolate: 'clamp',
            });

            return (
              <View
                style={{
                  flex: 1,
                  position: 'relative',
                  alignItems: 'center',
                }}
                key={index}>
                {/* <View
                  style={{
                    position: 'absolute',
                    zIndex: 9,
                    top: 0,
                    width: 100,
                    alignItems: 'center',
                  }}>
                  <Animated.Text
                    style={[
                      styles.numbers,
                      {color: '#4B70F5', opacity: currentTextOpacity},
                    ]}>
                    {index + 1}
                  </Animated.Text>
                </View> */}

                <Animated.View
                  style={{
                    position: 'relative',
                    width: ITEM_SIZE,
                    height: SCREEN_HEIGHT / 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: [{translateY: numberTranslateY}],
                  }}>
                  {(index === 0 ? 5 : index + 1) % 5 === 0 && (
                    <View
                      style={{
                        width: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Animated.Text
                        style={[
                          styles.numbers,
                          {
                            color,
                            opacity: textOpacity,
                            transform: [{scale: 0.4}],
                          },
                        ]}>
                        {index + 1}
                      </Animated.Text>
                    </View>
                  )}
                </Animated.View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Animated.View
                    style={[
                      styles.line,
                      {
                        backgroundColor: lineColors,
                        height: lineHeights,
                        transform: [{translateY: lineTranslateY}],
                        marginHorizontal: ITEM_SIZE / 12, // Add margin to create a gap between lines
                      },
                    ]}
                  />
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
