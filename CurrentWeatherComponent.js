import React from 'react';
import { View, StyleSheet, Text, AsyncStorage } from 'react-native';

import {API_key} from './secrets';

import {FadeInImage} from './FadeInImage';
import axios from 'axios';

export class CurrentWeatherComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log('CurrentWeatherComponent mounted');
        console.log('this.props.city: ', this.props.city);
        var self = this;
        if (!this.props.city) {
            AsyncStorage.getItem('userProfile').then(profileString => {
                if (profileString) {
                    var profile = JSON.parse(profileString);
                    return this.setState({
                        city: profile["city"]
                    });
                } else {
                    AsyncStorage.getItem('firstProfile').then(firstProfileString => {
                        var firstProfile = JSON.parse(firstProfileString);
                        return this.setState({
                            city: firstProfile.city
                        });
                    });
                }
            }).then(() => {
                console.log("self.state.city: ", self.state.city);
                axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${self.state.city}&APPID=${API_key}`).then(results => {
                    self.setState({test: "results from OWM!!!"});
                    self.setState({results: results.data.weather[0].description});
                }).catch(err => {
                    console.log('err getting weather results: ', err);
                });
            }).catch(err => {
                console.log('error while mounting CurrentWeatherComponent', err);
            });
        } else {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${self.props.city}&APPID=${API_key}`).then(results => {
                self.setState({test: "results from OWM!!!!"});
                self.setState({results: results.data.weather[0].description});
            }).catch(err => {
                console.log('err getting weather results: ', err);
            });
        }
        //api.openweathermap.org/data/2.5/weather?q=${this.props.city}&APPID=${API_key}
    }
    render() {
        if (!this.state) {
            return null;
        }
        return (
           <View style={styles.container}>
                <FadeInImage source={require('./assets/bike.png')} style={{flex:1, height: 150, width: 150}} />

                <Text>Current Weather Component</Text>

                {this.state.test && <Text>{this.state.test}</Text>}
                {this.state.results && <Text style={{fontSize: 40}}>{this.state.results}</Text>}
                {this.state.error && <Text>{this.state.error}</Text>}
           </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingTop: 0
    }
});
