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
                backgroundColor: "#7BC9D3"
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
    constructor() {
        super();
        this.state = {};
    }
    // componentDidMount() {
    //     axios.get('/user').then(results => {
    //         this.setState({
    //             first: results.data.rows[0].first,
    //             last: results.data.rows[0].last,
    //             pictureUrl: results.data.rows[0].url,
    //             bio: results.data.rows[0].bio,
    //             color: results.data.rows[0].color,
    //             shape: results.data.rows[0].shape
    //         });
    //     }).catch(err => {
    //         console.log('error in mount app: ', err);
    //     });
    // }
    render() {
        return <AppContainer />;
    }
}
