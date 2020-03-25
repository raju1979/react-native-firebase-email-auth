import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

import { createAppContainer, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { CustomHeader } from './Tab/CustomHeader';
import LoginComponent from './auth/LoginComponent';
import ProfileComponent from './Tab/ProfileComponent';

import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';

import * as Font from 'expo-font';

import firebase from 'firebase';
import {firebaseConfig} from './config';

firebase.initializeApp(firebaseConfig);



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

async function loadResourcesAsync() {
    await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto.ttf'),
    });
}

function handleLoadingError(error) {
    console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
}

export default function App(props) {

    const storage = new Storage({
        // maximum capacity, default 1000
        size: 1000,
       
        // Use AsyncStorage for RN apps, or window.localStorage for web apps.
        // If storageBackend is not set, data will be lost after reload.
        storageBackend: AsyncStorage, // for web: window.localStorage
       
        // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
        // can be null, which means never expire.
        defaultExpires: 1000 * 3600 * 24,
       
        // cache data in the memory. default is true.
        enableCache: true,
       
        // if data was not found in storage or expired data was found,
        // the corresponding sync method will be invoked returning
        // the latest data.
        sync: {
          // we'll talk about the details later.
        }
      });

      global.storage = storage;

    const [isLoadingComplete, setLoadingComplete] = useState(false);

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadingComplete)}
            />
        );
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
