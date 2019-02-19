import React from "react";
import { View, Text, Button, Image, TextInput, TouchableWithoutFeedback, AsyncStorage } from "react-native";
import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";

import {WelcomeScreen} from './WelcomeScreen';
import {ProfileScreen} from './ProfileScreen';
import {CurrentWeatherScreen} from './CurrentWeatherScreen';
import {LoadingScreen} from './LoadingScreen';

const AppStack = createStackNavigator(
    {
        ProfileRoute: ProfileScreen,
        CurrentWeatherRoute: CurrentWeatherScreen
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

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }
    componentDidMount() {
        var isNewUser;
        AsyncStorage.getItem('userProfile').then(profileString => {
            if (profileString) {
                var profile = JSON.parse(profileString);
                console.log("profile in App: ", profile);
                this.setState({
                    name: profile["name"] || 'cyclist',
                    city: profile["city"] || 'city',
                    notify1hAdvance: profile["notify1hAdvance"] || false,
                    notifyAtStart: profile["notifyAtStart"] || false,
                    routes: profile["routes"] || []
                }, () => {
                    isNewUser = false;
                    console.log("isNewUser: ", isNewUser);
                });
            }
            else {
                isNewUser = true;
            }
        }).catch(err => {
            console.log("err loading app: ", err);
        })
    }
    render() {
        return <AppContainer />;
    }
}
