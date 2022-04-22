import React, {useContext} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import FloatingWriteButton from '../components/FloatingWriteButton';
import SearchBar from '../components/SearchBar';
import FeedList from '../components/FeedList';
import LogContext from '../contexts/LogContext';
import SearchContext from '../contexts/SearchContext';

function FreeScreen({navigation}) {
  const {keyword} = useContext(SearchContext);
  const {logs} = useContext(LogContext);

  const filtered =
    keyword === ''
      ? []
      : logs.filter(log =>
          [log.title, log.body].some(text => text.includes(keyword)),
        );
  return (
    <View style={styles.block}>
      <View style={styles.semiblock}>
        <SearchBar />
      </View>

      <View style={styles.item}>
        <FeedList logs={logs} />
      </View>
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

export default FreeScreen;
