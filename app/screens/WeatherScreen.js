import React from "react";
import { View, Text, Button, Image, TextInput, TouchableWithoutFeedback, AsyncStorage } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import axios from 'axios';

import {ProfileLogo} from '../components/ProfileLogo';
import {CustomWeatherSwitch} from '../components/CustomWeatherSwitch';
import {CurrentWeatherComponent} from '../components/CurrentWeatherComponent';
import {FutureWeatherComponent} from '../components/FutureWeatherComponent';

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
        var self = this;
        this.props.navigation.setParams({ editProfile: this.onPress });
        this._s0 = this.props.navigation.addListener('willFocus', this.onWillFocus);
        Promise.all([
            AsyncStorage.getItem('name'),
            AsyncStorage.getItem('city'),
            AsyncStorage.getItem('notify1hAdvance'),
            AsyncStorage.getItem('notifyAtStart'),
            AsyncStorage.getItem('routes')
        ])
        .then(profileString => {
            var profile = [];
            for (var j = 0; j < 5; j++) {
                profile.push(JSON.parse(profileString[j]));
            }
            this.setState({
                name: profile[0] != null ? Object.values(profile[0])[0] : 'cyclist',
                city: profile[1] != null ? Object.values(profile[1])[0] : 'city',
                notify1hAdvance: profile[2] != null ? Object.values(profile[2])[0] : null,
                notifyAtStart: profile[3] != null ? Object.values(profile[3])[0] : null,
                routes: profile[4] != null ? Object.values(profile[4])[0] : []
            });
        }).then(() => {
            if (this.state.routes.length > 0) {
                var now = new Date();
                var startDay;
                var startTime;
                if (this.state.routes[0]) {
                    startDate0 = this.getStartDay(now, this.state.routes[0]);
                    var delta0 = startDate0 - now;
                    var startDate00 = new Date(startDate0);
                }
                if (this.state.routes[1]) {
                    startDate1 = this.getStartDay(now, this.state.routes[1]);
                    var delta1 = startDate1 - now;
                    var startDate11 = new Date(startDate1);
                }
                if (this.state.routes[2]) {
                    startDate2 = this.getStartDay(now, this.state.routes[2]);
                    var delta2 = startDate2 - now;
                    var startDate22 = new Date(startDate2);
                }
                if (this.state.routes[3]) {
                    startDate3 = this.getStartDay(now, this.state.routes[3]);
                    var delta3 = startDate3 - now;
                    var startDate33 = new Date(startDate3);
                }
                // decide which startDate comes first (in comparison to now) --> startDay and startTime
                var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                if (delta0 && delta1 && delta2 && delta3) {
                    var delta = Math.min(delta0, delta1, delta2, delta3);
                } else if (delta0 && delta1 && delta2) {
                    var delta = Math.min(delta0, delta1, delta2);
                } else if (delta0 && delta1) {
                    var delta = Math.min(delta0, delta1);
                } else if (delta0) {
                    var delta = delta0
                }
                if (delta == delta0) {
                    this.setState({
                        startDay: weekday[startDate00.getDay()],
                        startTime: startDate00.getHours(),
                        nextTrip: startDate00
                    });
                } else if (delta == delta1) {
                    this.setState({
                        startDay: weekday[startDate11.getDay()],
                        startTime: startDate11.getHours(),
                        nextTrip: startDate11
                    });
                } else if (delta == delta2) {
                    this.setState({
                        startDay: weekday[startDate22.getDay()],
                        startTime: startDate22.getHours(),
                        nextTrip: startDate22
                    });
                } else if (delta == delta3) {
                    this.setState({
                        startDay: weekday[startDate33.getDay()],
                        startTime: startDate33.getHours(),
                        nextTrip: startDate33
                    });
                }
            }
        }).catch(err => {
            console.log("err while mounting CurrentWeatherScreen: ", err);
        });
    }
    componentWillUnmount() {
        this._s0.remove();
        this.state.isMounted = false;
    }
    onWillFocus() {
        var self = this;
        Promise.all([
            AsyncStorage.getItem('name'),
            AsyncStorage.getItem('city'),
            AsyncStorage.getItem('notify1hAdvance'),
            AsyncStorage.getItem('notifyAtStart'),
            AsyncStorage.getItem('routes')
        ])
        .then(profileString => {
            var profile = [];
            for (var i = 0; i < 5; i++) {
                profile.push(JSON.parse(profileString[i]));
            }
            return self.setState({
                name: profile[0] != null ? Object.values(profile[0])[0] : 'cyclist',
                city: profile[1] != null ? Object.values(profile[1])[0] : 'city',
                notify1hAdvance: profile[2] != null ? Object.values(profile[2])[0] : null,
                notifyAtStart: profile[3] != null ? Object.values(profile[3])[0] : null,
                routes: profile[4] != null ? Object.values(profile[4])[0] : []
            });
        }).then(() => {
            if (this.state.routes.length > 0) {
                var now = new Date();
                var startDay;
                var startTime;
                if (this.state.routes[0]) {
                    startDate0 = this.getStartDay(now, this.state.routes[0]);
                    var delta0 = startDate0 - now;
                    var startDate00 = new Date(startDate0);
                }
                if (this.state.routes[1]) {
                    startDate1 = this.getStartDay(now, this.state.routes[1]);
                    var delta1 = startDate1 - now;
                    var startDate11 = new Date(startDate1);
                }
                if (this.state.routes[2]) {
                    startDate2 = this.getStartDay(now, this.state.routes[2]);
                    var delta2 = startDate2 - now;
                    var startDate22 = new Date(startDate2);
                }
                if (this.state.routes[3]) {
                    startDate3 = this.getStartDay(now, this.state.routes[3]);
                    var delta3 = startDate3 - now;
                    var startDate33 = new Date(startDate3);
                }
                // decide which startDate comes first (in comparison to now) --> startDay and startTime
                var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                if (delta0 && delta1 && delta2 && delta3) {
                    var delta = Math.min(delta0, delta1, delta2, delta3);
                } else if (delta0 && delta1 && delta2) {
                    var delta = Math.min(delta0, delta1, delta2);
                } else if (delta0 && delta1) {
                    var delta = Math.min(delta0, delta1);
                } else if (delta0) {
                    var delta = delta0
                }
                if (delta == delta0) {
                    this.setState({
                        startDay: weekday[startDate00.getDay()],
                        startTime: startDate00.getHours(),
                        nextTrip: startDate00
                    });
                } else if (delta == delta1) {
                    this.setState({
                        startDay: weekday[startDate11.getDay()],
                        startTime: startDate11.getHours(),
                        nextTrip: startDate11
                    });
                } else if (delta == delta2) {
                    this.setState({
                        startDay: weekday[startDate22.getDay()],
                        startTime: startDate22.getHours(),
                        nextTrip: startDate22
                    });
                } else if (delta == delta3) {
                    this.setState({
                        startDay: weekday[startDate33.getDay()],
                        startTime: startDate33.getHours(),
                        nextTrip: startDate33
                    });
                }
            }
        }).catch(err => {
            console.log('err during willFocus CurrentWeatherScreen: ', err);
        })
    }
    getStartDay(now, route) {
        var routeStartTime = Number(route.start.split("-")[0]);
        var nowTime = now.getHours();
        if (now.getDay() == 5) {
            if (route.days == "weekend") {
                // startDay = "Sat";
                startDay = new Date();
                startDay.setHours(0, 0, 0, 0);
                startDay.setDate(startDay.getDate()+1);
            } else if (route.days == "weekdays") {
                if (nowTime > routeStartTime) {
                    // startDay = "Mon";
                    startDay = new Date();
                    startDay.setHours(0, 0, 0, 0);
                    startDay.setDate(startDay.getDate()+3);
                } else {
                    // startDay = "Fri";
                    startDay = new Date();
                    startDay.setHours(0, 0, 0, 0);
                }
            }
        } else if (now.getDay() == 0) {
            if (route.days == "weekdays") {
                // startDay = "Mon";
                startDay = new Date();
                startDay.setHours(0, 0, 0, 0);
                startDay.setDate(startDay.getDate()+1);
            } else if (route.days == "weekend") {
                if (nowTime > routeStartTime) {
                    // startDay = "Sat";
                    startDay = new Date();
                    startDay.setHours(0, 0, 0, 0);
                    startDay.setDate(startDay.getDate()+6);
                } else {
                    // startDay = "Sun";
                    startDay = new Date();
                    startDay.setHours(0, 0, 0, 0);
                }
            }
        } else if (now.getDay() == 1 || now.getDay() == 2 || now.getDay() == 3 || now.getDay() == 4) {
            if (route.days == "weekdays") {
                if (nowTime > routeStartTime) {
                    if (now.getDay() == 1) {
                        // startDay = "Tue"
                        startDay = new Date();
                        startDay.setHours(0, 0, 0, 0);
                        startDay.setDate(startDay.getDate()+1);
                    }
                    if (now.getDay() == 2) {
                        // startDay = "Wed"
                        startDay = new Date();
                        startDay.setHours(0, 0, 0, 0);
                        startDay.setDate(startDay.getDate()+1);
                    }
                    if (now.getDay() == 3) {
                        // startDay = "Thu"
                        startDay = new Date();
                        startDay.setHours(0, 0, 0, 0);
                        startDay.setDate(startDay.getDate()+1);
                    }
                    if (now.getDay() == 4) {
                        // startDay = "Fri"
                        startDay = new Date();
                        startDay.setHours(0, 0, 0, 0);
                        startDay.setDate(startDay.getDate()+1);
                    }
                } else {
                    if (now.getDay() == 1) {
                        // startDay = "Mon"
                        startDay = new Date();
                        startDay.setHours(0, 0, 0, 0);
                    }
                    if (now.getDay() == 2) {
                        // startDay = "Tue"
                        startDay = new Date();
                        startDay.setHours(0, 0, 0, 0);
                    }
                    if (now.getDay() == 3) {
                        // startDay = "Wed"
                        startDay = new Date();
                        startDay.setHours(0, 0, 0, 0);
                    }
                    if (now.getDay() == 4) {
                        // startDay = "Thu"
                        startDay = new Date();
                        startDay.setHours(0, 0, 0, 0);
                    }
                }
            } else if (route.days == "weekend") {
                // startDay = "Sat";
                if (now.getDay() == 1) {
                    startDay = new Date();
                    startDay.setHours(0, 0, 0, 0);
                    startDay.setDate(startDay.getDate()+5);
                }
                if (now.getDay() == 2) {
                    startDay = new Date();
                    startDay.setHours(0, 0, 0, 0);
                    startDay.setDate(startDay.getDate()+4);
                }
                if (now.getDay() == 3) {
                    startDay = new Date();
                    startDay.setHours(0, 0, 0, 0);
                    startDay.setDate(startDay.getDate()+3);
                }
                if (now.getDay() == 4) {
                    startDay = new Date();
                    startDay.setHours(0, 0, 0, 0);
                    startDay.setDate(startDay.getDate()+2);
                }
            }
        } else if (now.getDay() == 6) {
            if (route.days == "weekdays") {
                // startDay = "Mon";
                startDay = new Date();
                startDay.setHours(0, 0, 0, 0);
                startDay.setDate(startDay.getDate()+2);
            } else if (route.days == "weekend") {
                if (nowTime > routeStartTime) {
                    // startDay = "Sun";
                    startDay = new Date();
                    startDay.setHours(0, 0, 0, 0);
                    startDay.setDate(startDay.getDate()+1);
                } else {
                    // startDay = "Sat"
                    startDay = new Date();
                    startDay.setHours(0, 0, 0, 0);
                }
            }
        }
        var startTime = Number(route.start.split("-")[0]);
        var nextDate = startDay.setHours(startTime);

        return nextDate;
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
        var now = new Date();
        var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        if (this.state.startDay == weekday[now.getDay()]) {
            var today = true;
        } else {
            var today = false;
        }
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
                <View style={{flex: 3}}>
                    {!this.state.futureWeather && this.state.city && <CurrentWeatherComponent city={this.state.city} key={this.state.city} />}
                    {this.state.futureWeather && this.state.nextTrip && this.state.routes && <FutureWeatherComponent city={this.state.city} startDay={this.state.startDay} startTime={this.state.startTime} nextTrip={this.state.nextTrip} key={this.state.nextTrip + this.state.city} />}
                </View>
                <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
                    {this.state.routes && this.state.routes.length > 0 && <CustomWeatherSwitch
                        toggleSwitch = {this.toggleSwitch}
                        futureWeather = {this.state.futureWeather}
                    />}
                    {this.state.routes && this.state.routes.length > 0 && this.state.futureWeather && !today && <Text style={{color: 'gold', marginBottom: 50}}>{this.state.startDay} at {this.state.startTime}h</Text>}
                    {this.state.routes && this.state.routes.length > 0 && this.state.futureWeather && today && <Text style={{color: 'gold', marginBottom: 50}}>Today at {this.state.startTime}h</Text>}
                    {this.state.routes && this.state.routes.length > 0 && !this.state.futureWeather && <Text style={{color: 'white', marginBottom: 50, marginTop: 0}}>Next Trip: {this.state.startDay} at {this.state.startTime}h.</Text>}
                </View>
            </View>
        );
    }
}

// reset AsyncStorage --> <Button onPress={this.clear} title="Clear Async Storage" />
