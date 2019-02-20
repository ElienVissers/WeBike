import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import {API_key} from './secrets';
import data from './filteredCities';

import {FadeInImage} from './FadeInImage';
import axios from 'axios';

export class CurrentWeatherComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getCityId = this.getCityId.bind(this);
    }
    componentDidMount() {
        console.log('CurrentWeatherComponent mounted');
        console.log('this.props.city: ', this.props.city);

        var city = this.props.city.charAt(0).toUpperCase() + this.props.city.slice(1);

        console.log('city: ', city);
        var city_id = this.getCityId(city);

        console.log('city_id: ', city_id);

        var self = this;

        axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${city_id}&APPID=${API_key}`).then(results => {
            self.setState({test: "results from OWM!!!!"});
            self.setState({results: results.data.weather[0].description});
        }).catch(err => {
            console.log('err getting weather results: ', err);
        });
    }
    getCityId(city) {
        var cities = JSON.parse(data)
        for (var i = 0; i < cities.length; i++) {
            if (cities[i].name == city) {
                return data[i].id
            }
        }
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
