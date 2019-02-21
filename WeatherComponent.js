import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import {FadeInImage} from './FadeInImage';

export class WeatherComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        var now = new Date();
        if (now.getHours() > 18 || now.getHours() < 6) {
            this.setState({
                isDay: false
            });
        } else {
            this.setState({
                isDay: true
            });
        }
    }
    // componentDidUpdate() {
    //     if (!this.props.description && !this.props.id && !this.props.temp) {
    //         this.setState({
    //             error: true
    //         });
    //     } else {
    //         this.setState({
    //             error: false
    //         });
    //     }
    // }
    render() {
        console.log("id: ", this.props.id, typeof this.props.id);
        if (!this.props.id) {
            return null;
        }
        var source;
        var id = this.props.id
        if (id == 800 && this.state.isDay) {source = require('./assets/800_clear_day.png')}
        else if (id == 800 && !this.state.isDay) {source = require('./assets/800_clear_night.png')}
        else if (id == 801 && this.state.isDay) {source = require('./assets/801_fewclouds_day.png')}
        else if (id == 801 && !this.state.isDay) {source = require('./assets/801_fewclouds_night.png')}
        else if (id == 802) {source = require('./assets/802_scattered.png')}
        else if (id > 802) {source = require('./assets/80x_clouds.png')}
        else if (id >= 700) {source = require('./assets/700_mist.png')}
        else if (id >= 600) {source = require('./assets/600_snow.png')}
        else if (id >= 510) {source = require('./assets/5xx_rain.png')}
        else if (id >= 500 && this.state.isDay) {source = require('./assets/50x_rain_day.png')}
        else if (id >= 500 && !this.state.isDay) {source = require('./assets/50x_rain_night.png')}
        else if (id >= 300) {source = require('./assets/300_drizzle.png')}
        else if (id >= 200) {source = require('./assets/200_thunder.png')}

        return (
           <View style={styles.container}>
                <FadeInImage source={source} style={{flex:1, height: 150, width: 150}} />
                <Text style={styles.degrees}>{Math.round(this.props.temp)}°C</Text>
                <Text style={styles.description}>{this.props.description}</Text>

                {this.state.error && <Text>Oops, something went wrong!</Text>}
           </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    degrees: {
        fontSize: 40
    },
    description: {
        fontSize: 30
    },
    error: {
        color: 'gray'
    }
});
