import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

import { createAppContainer, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { CustomHeader } from './Tab/CustomHeader';
import LoginComponent from './auth/LoginComponent';
import ProfileComponent from './Tab/ProfileComponent';
import { AsyncStorage } from 'react-native';

import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';

import * as Font from 'expo-font';


const navOptionHandler = () => ({
    headerShown: false
})


const Home = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
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
            <StackHome.Screen name="Profile" component={ProfileComponent} options={navOptionHandler} />
        </StackHome.Navigator>
    )
}

async function loadResourcesAsync(setLoadingComplete) {
  await Font.loadAsync({
    'Roboto': require('native-base/Fonts/Roboto.ttf'),
    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    'Ionicons': require("native-base/Fonts/Ionicons.ttf")
  })
  setLoadingComplete(true);

}

function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading() {
}

export default function App(props) {

    const [isLoadingComplete, setLoadingComplete] = useState(false);

    if(!isLoadingComplete) {
        return (
          <AppLoading
            startAsync={() => loadResourcesAsync(setLoadingComplete)}
            onError={handleLoadingError}
            onFinish={() => handleFinishLoading()}
          />
        )
      } else {
        return (
            <NavigationContainer>
                <HomeStack />
            </NavigationContainer>
        )
    }



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
