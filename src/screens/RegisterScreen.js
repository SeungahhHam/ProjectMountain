import React, {useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

function RegisterScreen({navigation}) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const WelcomeAlert = () =>
    Alert.alert('회원가입이 완료되었습니다!', '로그인 페이지로 돌아갑니다', [
      {
        text: '확인',
        onPress: () => navigation.navigate('Login'),
        style: 'cancel',
      },
    ]);

  const registerButton = () => {
    if (!userName) {
      alert('이름을 입력해주세요');
      return;
    }
    if (!userEmail) {
      alert('이메일을 입력해주세요');
      return;
    }
    if (!userPassword) {
      alert('비밀번호를 입력해주세요');
      return;
    }

    var dataToSend = {
      name: userName,
      email: userEmail,
      password: userPassword,
    };

    console.log(dataToSend);

    fetch(`http://172.16.197.168:5000/api/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    }).then(async res => {
      try {
        const jsonRes = await res.json();
        console.log(jsonRes);
        console.log('yes');
        setLoading(true);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
      {
        loading ? WelcomeAlert : console.log('실패');
      }
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          onChangeText={userName => setUserName(userName)}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter email"
          onChangeText={userEmail => setUserEmail(userEmail)}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter password"
          onChangeText={userPassword => setUserPassword(userPassword)}
        />

        <Button title="회원가입" onPress={registerButton}></Button>
        <Button title="테스팅" onPress={WelcomeAlert}></Button>

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: 'blue',
  },
});

export default RegisterScreen;
