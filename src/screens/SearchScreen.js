import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StyleSheet, View, Button} from 'react-native';
import FreeScreen from './FreeScreen';
import QuestionScreen from './QuestionScreen';
import CertificationScreen from './CertificationScreen';
import RecruitScreen from './RecruitScreen';
import WriteScreen from './WriteScreen';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function SearchScreen() {
  return (
    <Tab.Navigator initialRouteName="Free">
      <Tab.Screen
        name="Free"
        component={FreeScreen}
        options={{
          headerTitleAlign: 'center',
          title: '자유게시판',
          headerBackVisible: false,
        }}
      />
      <Tab.Screen
        name="Question"
        component={QuestionScreen}
        options={{
          headerTitleAlign: 'center',
          title: '질문게시판',
          headerBackVisible: false,
        }}
      />
      <Tab.Screen
        name="Certification"
        component={CertificationScreen}
        options={{
          headerTitleAlign: 'center',
          title: '인증게시판',
          headerBackVisible: false,
        }}
      />
      <Tab.Screen
        name="Recruit"
        component={RecruitScreen}
        options={{
          headerTitleAlign: 'center',
          title: '모집게시판',
          headerBackVisible: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default SearchScreen;
