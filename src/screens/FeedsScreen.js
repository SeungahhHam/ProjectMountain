import React, {useContext} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import FeedList from '../components/FeedList';
import LogContext from '../contexts/LogContext';

function FeedScreen() {
  const {logs} = useContext(LogContext);
  console.log(JSON.stringify(logs, null, 2));
  return <View style={styles.block}></View>;
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

export default FeedScreen;
