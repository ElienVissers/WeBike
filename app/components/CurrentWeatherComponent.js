import React from 'react';
import { View, StyleSheet, Text, AsyncStorage } from 'react-native';

import {API_key} from '../../secrets';

import {WeatherComponent} from './WeatherComponent';
import axios from 'axios';

export class CurrentWeatherComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        var self = this;
        AsyncStorage.getItem('city').then(cityString => {
            if (cityString) {
                var city = JSON.parse(cityString);
                return this.setState({
                    city: city["city"]
                });
            } else {
                console.log("cannot find city in AsyncStorage (componentDidMount CurrentWeatherComponent)");
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
                    error: "Oops, something went wrong while getting the weather data! Please make sure your city is spelled correctly."
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
        flex: 1,
        color: 'grey',
        textAlign: 'center',
        paddingTop: 200,
        width: 300
    }
});
