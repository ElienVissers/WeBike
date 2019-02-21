import React from 'react';
import { View, StyleSheet, Text, AsyncStorage } from 'react-native';

import {API_key} from './secrets';

import {FadeInImage} from './FadeInImage';
import {WeatherComponent} from './WeatherComponent';
import axios from 'axios';

export class CurrentWeatherComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log('CurrentWeatherComponent mounted');
        var self = this;
        AsyncStorage.getItem('userProfile').then(profileString => {
            if (profileString) {
                var profile = JSON.parse(profileString);
                return this.setState({
                    city: profile["city"]
                });
            } else {
                return AsyncStorage.getItem('firstProfile').then(firstProfileString => {
                    var firstProfile = JSON.parse(firstProfileString);
                    return this.setState({
                        city: firstProfile.city
                    });
                });
            }
        }).then(() => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${self.state.city}&units=metric&APPID=${API_key}`).then(results => {
                self.setState({
                    description: results.data.weather[0].description,
                    id: Number(results.data.weather[0].id),
                    temp: results.data.main.temp
                });
            }).catch(err => {
                console.log('err getting weather results: ', err);
                this.setState({
                    error: "Oops, something went wrong while getting the weather data!"
                });
            });
        }).catch(err => {
            console.log('error while mounting CurrentWeatherComponent', err);
        });
    }
    render() {
        if (!this.state) {
            return null;
        }
        return (
           <View style={styles.container}>
                {!this.state.error && <WeatherComponent id={this.state.id} description={this.state.description} temp={this.state.temp} key={this.state.temp} future={false} />}
                {this.state.error && <Text style={styles.error}>{this.state.error}</Text>}
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
    },
    error: {
        color: 'grey'
    }
});
