import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

import { createAppContainer, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { CustomHeader } from './Tab/CustomHeader';
import LoginComponent from './auth/LoginComponent';


const navOptionHandler = () => ({
  headerShown: false
})


const Home = (props) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader title={'Home'} navigation={props.navigation} />
      <View>
        <Text>Home</Text>
        <Button
          title={'GoTo Profile'}
          onPress={() => props.navigation.push('Profile')}
        />
      </View>
    </SafeAreaView>
  )
}


const Profile = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Profile</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}


const StackHome = createStackNavigator();

function HomeStack() {
  return (
    <StackHome.Navigator initialRouteName="Login">
      <StackHome.Screen name="Login" component={LoginComponent} options={navOptionHandler} />
      <StackHome.Screen name="Home" component={Home} options={navOptionHandler} />
      <StackHome.Screen name="Profile" component={Profile}  options={navOptionHandler} />
    </StackHome.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
