import React from 'react';
import {View, StyleSheet, Text, Image, Pressable} from 'react-native';
import UserInfoScreen from '../screens/UserInfoScreen';

function PostCard() {
  const onOpenProfile = () => {};

  return (
    <View style={styles.block}>
      <View style={[styles.head, styles.paddingBlock]}>
        <Pressable style={styles.profile} onPress={onOpenProfile}></Pressable>
      </View>
    </View>
  );
}
