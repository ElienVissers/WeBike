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
        this.getStartDay = this.getStartDay.bind(this);
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
            //////////////////////////////////////////////////////////////////// TO DO: calculate the next start of trip////////////////////////////////////////////////////
            if (this.state.routes.length > 0) {
                var now = new Date();
                var startDay;
                var startTime;
                console.log("current date: ", now);
                console.log("routes: ", this.state.routes);
                if (this.state.routes[0]) {
                    startDay0 = this.getStartDay(now, this.state.routes[0]);
                    startTime0 = this.state.routes[0].start.split("-")[0];
                }
                if (this.state.routes[1]) {
                    startDay1 = this.getStartDay(now, this.state.routes[1]);
                    startTime1 = this.state.routes[1].start.split("-")[0];
                }
                if (this.state.routes[2]) {
                    startDay2 = this.getStartDay(now, this.state.routes[2]);
                    startTime2 = this.state.routes[2].start.split("-")[0];
                }
                if (this.state.routes[3]) {
                    startDay3 = this.getStartDay(now, this.state.routes[3]);
                    startTime3 = this.state.routes[3].start.split("-")[0];
                }
                // decide which startDayx and startTimex comes first (in comparison to now) --> startDay and startTime
                this.setState({
                    startDay: startDay,
                    startTime: startTime
                })
            }
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// end of calculation ///////////////////
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
                var profile = JSON.parse(profileString);
                return self.setState({
                    name: profile["name"] || 'cyclist',
                    city: profile["city"] || 'city',
                    notify1hAdvance: profile["notify1hAdvance"] || null,
                    notifyAtStart: profile["notifyAtStart"] || null,
                    routes: profile["routes"] || []
                });
            }
        }).then(() => {
            //////////////////////////////////////////////////////////////////// TO DO: calculate the next start of trip//////////////////////////////////
        }).catch(err => {
            console.log('err during willFocus CurrentWeatherScreen: ', err);
        })
    }
    getStartDay(now, route) {
        var routeStartTime = Number(route.start.split("-")[0]);
        var nowTime = now.getHours();
        if (now.getDay() == 5) {
            if (route.days == "weekend") {
                startDay = "Sat";
            } else if (route.days == "weekdays") {
                if (nowTime > routeStartTime) {
                    startDay = "Mon";
                } else {
                    startDay = "Fri";
                }
            }
        } else if (now.getDay() == 0) {
            if (route.days == "weekdays") {
                startDay = "Mon";
            } else if (route.days == "weekend") {
                if (nowTime > routeStartTime) {
                    startDay = "Sat";
                } else {
                    startDay = "Sun";
                }
            }
        } else if (now.getDay() == 1 || now.getDay() == 2 || now.getDay() == 3 || now.getDay() == 4) {
            if (route.days == "weekdays") {
                if (nowTime > routeStartTime) {
                    if (now.getDay() == 1) {startDay = "Tue"}
                    if (now.getDay() == 2) {startDay = "Wed"}
                    if (now.getDay() == 3) {startDay = "Thu"}
                    if (now.getDay() == 4) {startDay = "Fri"}
                } else {
                    if (now.getDay() == 1) {startDay = "Mon"}
                    if (now.getDay() == 2) {startDay = "Tue"}
                    if (now.getDay() == 3) {startDay = "Wed"}
                    if (now.getDay() == 4) {startDay = "Thu"}
                }
            } else if (route.days == "weekend") {
                startDay = "Sat";
            }
        } else if (now.getDay() == 6) {
            if (route.days == "weekdays") {
                startDay = "Mon";
            } else if (route.days == "weekend") {
                if (nowTime > routeStartTime) {
                    startDay = "Sun";
                } else {
                    startDay = "Sat"
                }
            }
        }
        return startDay;
    }
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
        // console.log("this.state CurrentWeatherScreen: ", this.state);
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
                <View style={{flex: 3}}>
                    {!this.state.futureWeather && <CurrentWeatherComponent city={this.state.city}/>}
                    {this.state.futureWeather && this.state.routes && <FutureWeatherComponent city={this.state.city} startDay={this.state.startDay} startTime={this.state.startTime} />}
                </View>
                <View style={{flex:1}}>
                    {this.state.routes && this.state.routes.length > 0 && <WeatherSwitch
                        toggleSwitch = {this.toggleSwitch}
                        futureWeather = {this.state.futureWeather}
                    />}
                </View>
            </View>
        );
    }
}

// reset AsyncStorage --> <Button onPress={this.clear} title="Clear Async Storage" />
