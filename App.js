import React from "react";
import { View, Text, Button, Image, TextInput, TouchableWithoutFeedback } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import {WelcomeScreen} from './WelcomeScreen';
import {ProfileScreen} from './ProfileScreen';
import {CurrentWeatherScreen} from './CurrentWeatherScreen';

let isNewUser = true;

const AppNavigator = createStackNavigator(
    {
        WelcomeRoute: WelcomeScreen,
        ProfileRoute: ProfileScreen,
        CurrentWeatherRoute: CurrentWeatherScreen
    },
    {
        initialRouteName: isNewUser ? "WelcomeRoute" : "CurrentWeatherRoute",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'skyblue'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
