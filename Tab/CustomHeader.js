import React, { Component } from 'react';
import { Text, View, TouchableOpacity , ScrollView, Button } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const CustomHeader = ({ title, isHome, navigation }) => {
    return (
        <View style={
            {flexDirection: 'row', height: 50, backgroundColor:"#ccc", borderBottomWidth: 1, borderBottomColor: 'red'}
        }>
            <View style={{ flex: 1 }}></View>
            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{title}</Text>
            </View>
            <View style={{ flex: 1.5 }}></View>
        </View>
    )
}

export {CustomHeader};