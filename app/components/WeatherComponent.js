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
        if (now.getHours() >= 18 || now.getHours() < 7) {
            this.setState({
                isDay: false
            });
        } else {
            this.setState({
                isDay: true
            });
        }
    }
    render() {
        console.log("id: ", this.props.id, typeof this.props.id);
        if (!this.props.id) {
            return null;
        }
        var source;
        var message;
        var future_message;
        var id = this.props.id
        if (id == 800 && this.state.isDay && !this.props.future || id == 800 && this.props.future && this.props.futureDay) {
            source = require('./assets/800_clear_day.png');
            message = "What a nice day to cycle!";
            future_message = "It will be a nice day to cycle!";
        }
        else if (id == 800 && !this.state.isDay && !this.props.future || id == 800 && this.props.future && !this.props.futureDay) {
            source = require('./assets/800_clear_night.png');
            message = "What a nice evening to cycle!";
            future_message = "It will be a nice evening to cycle!";
        }
        else if (id == 801 && this.state.isDay && !this.props.future || id == 801 && this.props.future && this.props.futureDay) {
            source = require('./assets/801_fewclouds_day.png');
            message = "Don't be afraid of a few clouds!";
            future_message = "Don't be afraid of a few clouds!";
        }
        else if (id == 801 && !this.state.isDay && !this.props.future || id == 801 && this.props.future && !this.props.futureDay) {
            source = require('./assets/801_fewclouds_night.png');
            message = "Don't be afraid of a few clouds!";
            future_message = "Don't be afraid of a few clouds!";
        }
        else if (id == 802) {
            source = require('./assets/802_scattered.png');
            message = "Don't be afraid of a few clouds!";
            future_message = "Don't be afraid of a few clouds!";
        }
        else if (id > 802) {
            source = require('./assets/80x_clouds.png');
            message = "Just clouds. No rain, no excuses!";
            future_message = "Just clouds. No rain, no excuses!";
        }
        else if (id >= 700) {
            source = require('./assets/700_mist.png');
            message = "Don't forget your lights!";
            future_message = "Don't forget your lights!";
        }
        else if (id >= 600) {
            source = require('./assets/600_snow.png');
            message = "Biking in the snow? Be carefull, and be proud!";
            future_message = "Biking in the snow? Be carefull, and be proud!";
        }
        else if (id >= 510) {
            source = require('./assets/5xx_rain.png');
            message = "Don't forget to wear waterproof clothes today!";
            future_message = "Don't forget to wear waterproof clothes!";
        }
        else if (id >= 500 && this.state.isDay && !this.props.future || id >= 500 && this.props.future && this.props.futureDay) {
            source = require('./assets/50x_rain_day.png');
            message = "Not scared of some rain? That's the spirit!";
            future_message = "Not scared of some rain? That's the spirit!";
        }
        else if (id >= 500 && !this.state.isDay && !this.props.future || id >= 500 && this.props.future && !this.props.futureDay) {
            source = require('./assets/50x_rain_night.png');
            message = "Not scared of some rain? That's the spirit!";
            future_message = "Not scared of some rain? That's the spirit!";
        }
        else if (id >= 300) {
            source = require('./assets/300_drizzle.png');
            message = "Drizzle is no excuse, enjoy the ride!";
            future_message = "Drizzle will be no excuse, enjoy the ride!";
        }
        else if (id >= 200) {
            source = require('./assets/200_thunder.png');
            message = "There might be thunder. Drive safely!";
            future_message = "There might be thunder. Drive safely!";
        }

        return (
           <View style={styles.container}>
                <FadeInImage source={source} style={{flex: 1, height: 180, width: 180, marginBottom: 0, paddingBottom: 0}} />
                <Text style={styles.degrees}>{Math.round(this.props.temp)}°C</Text>
                <Text style={styles.description}>{this.props.description}</Text>
                {this.props.future && <Text style={styles.message}>{future_message}</Text>}
                {!this.props.future && <Text style={styles.message}>{message}</Text>}

                {this.state.error && <Text>Oops, something went wrong!</Text>}
           </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    degrees: {
        fontSize: 40,
        marginTop: 0,
        paddingTop: 0
    },
    description: {
        fontSize: 25
    },
    message: {
        width: 260,
        textAlign: 'center'
    },
    error: {
        color: 'gray'
    }
});
