import React from "react";
import { View, Text, Button, Image, TextInput, TouchableWithoutFeedback, AsyncStorage } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import axios from 'axios';

import {FadeInImage} from './FadeInImage';
import {ProfileLogo} from './ProfileLogo';


export class CurrentWeatherScreen extends React.Component {
    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
        this.clear = this.clear.bind(this);
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
    componentDidMount() {
        this.props.navigation.setParams({ editProfile: this.onPress });
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

            axios.get(`https://api.openweathermap.org/data/2.5/weather?id=2950159&APPID=e18ffb68e1205393de8354e0e703f05b`).then(results => {
                // console.log("results from openweathermap: ", results.data);
                this.setState({test: "results from OWM!!!!"});
                this.setState({results: results.data.weather[0].description});
            }).catch(err => {
                console.log('err getting weather results: ', err);
            });



            // console.log("gonna make axios request for city id now!!");
            // axios.get(`http://192.168.50.197:8080/${this.state.city}/id`).then(cityid => {
            //     // console.log(cityid);
            //     axios.get(`http://192.168.50.197:8080/${cityid}/currentweather`).then(data => {
            //         // console.log("data from server: ", data);
            //         this.setState({test: "results from OWM!!!!"});
            //         this.setState({results: data.visibility});
            //     }).catch(err => {
            //         console.log(err => 'error getting weather info: ', err);
            //         this.setState({error: "error getting weather info :("})
            //     });
            // }).catch(err => {
            //     console.log('error getting cityid: ', err);
            //     this.setState({test: "no weather info for your city :("});
            //     //setState so that a custom message appears: "no weather info for your city"
            // });


        }).catch(err => {
            console.log("err while mounting CurrentWeatherScreen: ", err);
        });
    }
    onPress() {
        this.props.navigation.navigate('ProfileRoute');
    }
    clear() {
        AsyncStorage.clear();
    }
    render() {

        if (!this.state) {
            return null;
        }
        console.log("this.state.results: ", this.state.results);
        return (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
            <FadeInImage source={require('./assets/bike.png')} style={{flex:1, height: 150, width: 150}} />
            <View style={{flex: 2}}>
                <Text>Current Weather Screen</Text>
                <Button onPress={this.clear}
                    title="Clear Async Storage"
                />
                {this.state.test && <Text>{this.state.test}</Text>}
                {this.state.results && <Text style={{fontSize: 40}}>{this.state.results}</Text>}
                {this.state.error && <Text>{this.state.error}</Text>}
            </View>
          </View>
        );
    }
}
