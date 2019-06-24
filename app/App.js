import React from "react";
import { View, Text, Button, Image, TextInput, TouchableWithoutFeedback, AsyncStorage } from "react-native";
import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";

import { registerRootComponent } from 'expo';

import {WelcomeScreen} from '../WelcomeScreen';
import {ProfileScreen} from '../ProfileScreen';
import {CurrentWeatherScreen} from '../CurrentWeatherScreen';
import {EditRouteScreen} from '../EditRouteScreen';
import {LoadingScreen} from '../LoadingScreen';

const AppStack = createStackNavigator(
    {
        ProfileRoute: ProfileScreen,
        CurrentWeatherRoute: CurrentWeatherScreen,
        EditRouteRoute: EditRouteScreen
    },
    {
        initialRouteName: "CurrentWeatherRoute",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#7BC9D3"
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }
    }
);

const RegisterStack = createStackNavigator(
    {
        WelcomeRoute: WelcomeScreen
    },
    {
        initialRouteName: "WelcomeRoute",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#7BC9D3"
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }
    }
);

const AppContainer = createAppContainer(createSwitchNavigator(
    {
        LoadingRoute: LoadingScreen,
        App: AppStack,
        Register: RegisterStack
    },
    {
        initialRouteName: "LoadingRoute"
    }
));

class App extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }
    render() {
        return <AppContainer />;
    }
}

registerRootComponent(App);
