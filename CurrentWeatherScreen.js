import React from "react";
import { View, Text, Button, Image, TextInput, TouchableWithoutFeedback, AsyncStorage } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import axios from 'axios';

import {FadeInImage} from './FadeInImage';
import {ProfileLogo} from './ProfileLogo';
import {WeatherSwitch} from './WeatherSwitch';
import {CurrentWeatherComponent} from './CurrentWeatherComponent';
import {FutureWeatherComponent} from './FutureWeatherComponent';

export class CurrentWeatherScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            futureWeather: false
        };
        this.onPress = this.onPress.bind(this);
        this.clear = this.clear.bind(this);
        this.toggleSwitch = this.toggleSwitch.bind(this);
        this.onWillFocus = this.onWillFocus.bind(this);
    }
    static navigationOptions = ({navigation}) => {
        return {
            title: 'WeBike',
            headerRight: (
                <TouchableWithoutFeedback
                    onPress={navigation.getParam('editProfile')}
                >
                    <ProfileLogo/>
                </TouchableWithoutFeedback>
            )
        };
    };
    _s0: NavigationEventSubscription;
    componentDidMount() {
        this.props.navigation.setParams({ editProfile: this.onPress });
        this._s0 = this.props.navigation.addListener('willFocus', this.onWillFocus);
        AsyncStorage.getItem('userProfile').then(profileString => {
            if (profileString) {
                var profile = JSON.parse(profileString);
                return this.setState({
                    name: profile["name"] || 'cyclist',
                    city: profile["city"] || 'city',
                    notify1hAdvance: profile["notify1hAdvance"] || null,
                    notifyAtStart: profile["notifyAtStart"] || null,
                    routes: profile["routes"] || []
                });
            } else {
                AsyncStorage.getItem('firstProfile').then(firstProfileString => {
                    var firstProfile = JSON.parse(firstProfileString);
                    return this.setState({
                        name: firstProfile.name,
                        city: firstProfile.city,
                        notify1hAdvance: null,
                        notifyAtStart: null,
                        routes: []
                    });
                });
            }
        }).then(() => {
            //////////////////////////////////////////////////////////////////// TO DO: calculate the next start of trip//////////////////////////////////
            this.setState({
                startDay: "monday",
                startTime: "8"
            })
        }).catch(err => {
            console.log("err while mounting CurrentWeatherScreen: ", err);
        });
    }
    componentWillUnmount() {
        this._s0.remove();
    }
    onWillFocus() {
        var self = this;
        console.log('willFocus CurrentWeatherScreen');
        AsyncStorage.getItem('userProfile').then(profileString => {
            if (profileString) {
                console.log('running if block');
                var profile = JSON.parse(profileString);
                return self.setState({
                    name: profile["name"] || 'cyclist',
                    city: profile["city"] || 'city',
                    notify1hAdvance: profile["notify1hAdvance"] || null,
                    notifyAtStart: profile["notifyAtStart"] || null,
                    routes: profile["routes"] || []
                }, () => console.log("this.state after setState in WillFocus: ", self.state));
            }
        }).catch(err => {
            console.log('err during willFocus CurrentWeatherScreen: ', err);
            console.log('this.state in catch WillFocus: ', self.state);
        })
    };
    onPress() {
        this.props.navigation.navigate('ProfileRoute');
    }
    toggleSwitch(value) {
        this.setState({
            futureWeather: value
        });
    }
    clear() {
        AsyncStorage.clear();
    }
    render() {
        if (!this.state) {
            return null;
        }
        console.log("this.state: ", this.state);
        return (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
            {!this.state.futureWeather && <CurrentWeatherComponent city={this.state.city}/>}
            {this.state.futureWeather && this.state.routes && <FutureWeatherComponent city={this.state.city} startDay={this.state.startDay} startTime={this.state.startTime} />}

            {this.state.routes && this.state.routes.length > 0 && <WeatherSwitch
                toggleSwitch = {this.toggleSwitch}
                futureWeather = {this.state.futureWeather}
            />}

            <Button onPress={this.clear}
                title="Clear Async Storage"
            />
          </View>
        );
    }
}
