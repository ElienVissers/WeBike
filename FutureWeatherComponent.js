import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import {API_key} from './secrets';

import {FadeInImage} from './FadeInImage';
import axios from 'axios';

export class FutureWeatherComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log('FutureWeatherComponent mounted');
        console.log(this.props.city, this.props.startDay, this.props.startTime, this.props.nextTrip);

        //if nextTrip is more than 5 days (432 000 000 milliseconds) away, setState to render a message
        //else do axios request to api

        axios.get(`api.openweathermap.org/data/2.5/forecast?q=${this.props.city}&units=metric&APPID=${API_key}`).then(results => {

            var nextForecast = [432000000, null];

            //loop over all dt*1000 (= date in ms)
            for (let i = results.data.list.length - 1; i >= 0; i--) {
                var delta = this.props.nextTrip - (results.data.list[i].dt * 1000);
                if (delta > 0 && delta < nextForecast[0]) {
                    nextForecast[0] = delta;
                    nextForecast[1] = i;
                }
            }

            nextForecastIndex = nextForecast[1];

            this.setState({results: results.data.list[nextForecastIndex].weather[0].description});


            // var forecastDate = new Date(1550998800*1000);
            // console.log("forecast date: ", forecastDate);


            this.setState({test: "results from OWM!!!!!!!"});

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
    }
    render() {
        if (!this.state) {
            return null;
        }
        return (
           <View style={styles.container}>
                <FadeInImage source={require('./assets/bike.png')} style={{flex:1, height: 150, width: 150}} />

                <Text>Future Weather Component</Text>
                <Text>Next Trip: {this.props.startDay} at {this.props.startTime}h.</Text>

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
