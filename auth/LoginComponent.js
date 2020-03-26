import React, { useState, useEffect } from 'react';
import { TouchableOpacity, ImageBackground, StyleSheet, View } from "react-native";
import { Container, Header, Content, Card, CardItem, Body, Text, Button, Input, Item, Form, Label, Icon, Toast } from 'native-base';


import {Firebase as firebase} from '../config';

import bgImage from '../images/bg.jpg';

import { AsyncStorage } from 'react-native';


const LoginComponent = (props) => {

  [user, setUser] = useState();

  [email, setEmail] = useState('');
  [password, setPassword] = useState('');

  useEffect(() => {
    async function _retrieveData() {
      try {
        const value = await AsyncStorage.getItem('user:key');
        if (value !== null) {
          // We have data!!
          props.navigation.replace('Profile');
        }
      } catch (error) {
        // Error retrieving data
      }
    }
    _retrieveData();
  }, []);

  const changeEmailHandler = val => {
    setEmail(val)
  };


  const changePasswordHandler = val => {
    setPassword(val)
  };

  const loginPress = () => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(data => {
      _storeData(data, false);
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/user-not-found') {
        // Toast.show({
        //   text: "This Email does not Exist, please press SignUp!",
        //   buttonText: "Okay",
        //   position: "top"
        // })
        alert('This Email does not Exist, please press SignUp!')
      }
    });
  }

  const _storeData = async (data, newuser = false) => {

    try {
      data.user['new'] = 'newuser';
      const user = {
        new: newuser,
        data: data.user
      }
      await AsyncStorage.setItem('user:key', JSON.stringify(user));
      props.navigation.replace('Profile')

    } catch (error) {
      // Error saving data
    }
  };

  const signUp = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(data => {
      _storeData(data, true);


    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode === 'auth/email-already-in-use') {
        alert('This Email already taken!');
      } else {
        alert(errorMessage);
      }

      // ...
    });
  }



  return (
    <Container style={{ flex: 1, width: '100%' }}>

      <ImageBackground source={bgImage} style={styles.backgroundContainer}>

        <Container transparent style={{ flex: 1, width: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
          <Card style={{ width: '80%' }}>
            <CardItem style={{ justifyContent: 'center' }} header bordered button onPress={() => alert("This is Card Header")}>
              <Text style={{ fontFamily: 'Roboto', textAlign: 'center' }}>Welcome</Text>
            </CardItem>
            <CardItem body>
              <Content>
                <Form>
                  <Item floatingLabel>
                    <Label>Email</Label>
                    <Input onChangeText={changeEmailHandler} />
                  </Item>
                  <Item floatingLabel last>
                    <Label>Password</Label>
                    <Input onChangeText={changePasswordHandler} secureTextEntry={true} />
                  </Item>
                </Form>
              </Content>
            </CardItem>
            <CardItem footer style={{ justifyContent: 'space-around' }}>
              <Button iconRight primary onPress={loginPress}>
                <Text>Sign In</Text>
              </Button>
              <Button iconRight info onPress={signUp} disabled={password.length < 6}>
                <Text>Sign Up</Text>
              </Button>
            </CardItem>
          </Card>
        </Container>


      </ImageBackground>
    </Container>


  )

}

export default LoginComponent;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#f5fcff',
    width: null,
    height: null
  }
})
