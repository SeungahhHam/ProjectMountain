import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

function UserInfoScreen() {
  const navigation = useNavigation();
  const onGoLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View>
      <Button title="로그아웃" onPress={onGoLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {},
});

export default UserInfoScreen;
