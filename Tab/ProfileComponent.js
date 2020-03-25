import React, { Component, useEffect, useState } from 'react';
import { Container, Header, Content, Button, Text, Icon, Left, Right, Body, Title } from 'native-base';

import { AsyncStorage } from 'react-native';

import firebase from 'firebase';

const ProfileComponent = ({ navigation }) => {

    [user, setUser] = useState({})

    useEffect(() => {

        console.log('in effect')

        async function _retrieveData() {
            try {
                console.log('in try')
                const value = await AsyncStorage.getItem('user:key');
                console.log('value from login', value)
                if (value !== null) {
                    // We have data!!
                    console.log('user data', value);
                    setUser(JSON.parse(value))
                }
            } catch (error) {
                // Error retrieving data
                console.log(error)
            }
        }

        _retrieveData()

    }, []);

    const gotoLogin = async() => {
        try {
            await AsyncStorage.removeItem('user:key');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            alert('Some error plz try again');
        }
    }

    const signout = async () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            gotoLogin();

        }).catch(function (error) {
            // An error happened.
            alert('Some error plz try again ' + error);
        });

    }


    return (
        <Container>
            <Header>
                <Left />
                <Body>
                    <Title>Profile</Title>
                </Body>
                <Right />
            </Header>
            <Content>
                <Text>New User: {user.new ? 'New' : 'Existing'}</Text>
                <Button bordered success onPress={signout}>
                    <Text>Success</Text>
                </Button>
            </Content>
        </Container>
    )
}

export default ProfileComponent;