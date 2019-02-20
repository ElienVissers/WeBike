import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import {FadeInImage} from './FadeInImage';
import axios from 'axios';

export class FutureWeatherComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log('FutureWeatherComponent mounted');
        // console.log(this.props.city, this.props.startDay, this.props.startTime);
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
