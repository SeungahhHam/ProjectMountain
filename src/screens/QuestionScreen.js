import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import FloatingWriteButton from '../components/FloatingWriteButton';

function QuestionScreen({navigation}) {
  return (
    <View style={styles.block}>
      <View style={styles.semiblock}></View>

      <View style={styles.item}></View>
      <FloatingWriteButton />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flex: 1,
  },
  semiblock: {
    alignItems: 'center',
  },
});

export default QuestionScreen;
