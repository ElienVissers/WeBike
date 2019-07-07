import React from "react";
import { View, Text, Button, Image, TextInput, TouchableWithoutFeedback, AsyncStorage } from "react-native";
import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";

import { registerRootComponent } from 'expo';

import {WelcomeScreen} from './screens/WelcomeScreen';
import {ProfileScreen} from './screens/ProfileScreen';
import {CurrentWeatherScreen} from './screens/WeatherScreen';
import {EditRouteScreen} from './screens/EditRouteScreen';
import {LoadingScreen} from './screens/LoadingScreen';

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
