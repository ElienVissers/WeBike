import React from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';


export class WeatherSwitch extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
           <View style={styles.container}>
                <Switch
                    onValueChange={this.props.toggleSwitch}
                    value={this.props.futureWeather}
                    trackColor={{false: 'gold', true: 'gold'}}
                    thumbColor="gold"
                />
                {this.props.futureWeather && <Text style={{color:'gold'}}>Weather at next trip:</Text>}
                {!this.props.futureWeather && <Text style={{color:'gold'}}>Current Weather</Text>}
           </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 0,
        marginTop: 40,
        paddingTop: 0,
        paddingBottom: 0
    }
});
