import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import {API_key} from './secrets';

import {FadeInImage} from './FadeInImage';
import {WeatherComponent} from './WeatherComponent';
import axios from 'axios';

export class FutureWeatherComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log('FutureWeatherComponent mounted');
        var self = this;
        var now = new Date();
        console.log("this.props.nextTrip: ", this.props.nextTrip);
        if (this.props.nextTrip - now >  432000000) {
            this.setState({
                isTooSoon: true
            });
        }
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.props.city}&units=metric&APPID=${API_key}`).then(results => {
            console.log("results from API received");
            var nextForecast = [432000000, 0];
            for (let i = results.data.list.length - 1; i >= 0; i--) {
                var delta = this.props.nextTrip - (results.data.list[i].dt * 1000);
                if (delta >= 0 && delta < nextForecast[0]) {
                    nextForecast[0] = delta;
                    nextForecast[1] = i;
                }
            }
            nextForecastIndex = nextForecast[1];
            console.log("nextForecastIndex: ", nextForecastIndex);
            var forecastDate = new Date(results.data.list[nextForecastIndex].dt*1000);
            console.log("forecast date: ", forecastDate);
            if (forecastDate.getHours() >= 18 || forecastDate.getHours() < 7) {
                var futureDay = false;
            } else {
                var futureDay = true;
            }
            self.setState({
                description: results.data.list[nextForecastIndex].weather[0].description,
                id: results.data.list[nextForecastIndex].weather[0].id,
                temp: results.data.list[nextForecastIndex].main.temp,
                futureDay: futureDay
            });
        }).catch(err => {
            console.log('err getting weather results: ', err);
            self.setState({
                error: 'Oops, something went wrong while getting the weather data!'
            });
        });
    }
    render() {
        if (!this.state) {
            return null;
        }
        console.log("state during render: ", this.state.description, this.state.id, this.state.temp);
        return (
           <View style={styles.container}>
                {!this.state.error && <WeatherComponent id={this.state.id} description={this.state.description} temp={this.state.temp} key={this.state.temp} future={true} futureDay={this.state.futureDay} />}
                {this.state.isTooSoon && <Text style={styles.error}>It's too early to get relevant weather data. Try again within 5 days of your trip!</Text>}
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
        color: 'gray'
    }
});
