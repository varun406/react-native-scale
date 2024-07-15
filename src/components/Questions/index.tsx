import React, {useRef, useState} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';

const initialQuestions = [
  {id: '1', text: 'Question 1'},
  {id: '2', text: 'Question 2'},
  {id: '3', text: 'Question 3'},
];

const QuestionScreen = () => {
  const flatListRef = useRef(null);
  const [questions, setQuestions] = useState(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const renderItem = ({item}) => (
    <View style={styles.questionCard}>
      <Text>{item.text}</Text>
    </View>
  );

  const handleContinue = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
    } else {
      const newQuestion = {
        id: `${questions.length + 1}`,
        text: `Question ${questions.length + 1} fresher`,
      };
      const updatedQuestions = [...questions, newQuestion];
      setQuestions(updatedQuestions);

      setTimeout(() => {
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);
        flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
      }, 100); // Delay to allow FlatList to update
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={questions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={false}
        pagingEnabled
        snapToInterval={720}
        scrollEnabled={true}
        onScrollToIndexFailed={() => {
          console.log('sdfd');
        }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      />
      <Button title="Continue" onPress={handleContinue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionCard: {
    flex: 1,
    minHeight: 700, // Adjust this height as needed
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    margin: 10,
  },
});

export default QuestionScreen;
