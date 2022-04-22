import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, View, Button} from 'react-native';
import WriteScreen from './WriteScreen';
import SearchScreen from './SearchScreen';

const Stack = createNativeStackNavigator();

function CommunityStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Write"
        component={WriteScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default CommunityStack;
