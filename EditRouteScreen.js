import React from "react";
import { View, Text, Button, Image, Picker, TextInput, TouchableWithoutFeedback, AsyncStorage, StyleSheet, Alert } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import {AddButton} from './AddButton';

export class EditRouteScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routeId: this.props.navigation.getParam('routeId', "default"),
            days: this.props.navigation.getParam('days', "default"),
            start: this.props.navigation.getParam('start', "default"),
            arrive: this.props.navigation.getParam('arrive', "default"),
            arrayOfRoutes: this.props.navigation.getParam('arrayOfRoutes', "default")
        };
        this.saveRoute = this.saveRoute.bind(this);
        this.removeRoute = this.removeRoute.bind(this);
    }
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Edit route'
        };
    };
    saveRoute() {
        if (parseInt(this.state.start.split("-")[0], 10) < parseInt(this.state.arrive.split("-")[1], 10)) {
            this.state.arrayOfRoutes.splice(this.state.routeId, 1, {
                days: this.state.days,
                start: this.state.start,
                arrive: this.state.arrive
            });
            console.log("new arrayOfRoutes: ", this.state.arrayOfRoutes);
            var routesString = JSON.stringify({routes: this.state.arrayOfRoutes});
            AsyncStorage.setItem('routes', routesString).then(() => {
                this.props.navigation.navigate('ProfileRoute');
            }).catch(err => {
                console.log("err while saving route");
            });
        } else {
            Alert.alert(
                'Wow, you cycle impossibly fast!',
                "The arrival time must be after the departure time."
            );
        }
    }
    removeRoute() {
        this.state.arrayOfRoutes.splice(this.state.routeId, 1);
        console.log("new arrayOfRoutes: ", this.state.arrayOfRoutes);
        var routesString = JSON.stringify({routes: this.state.arrayOfRoutes});
        AsyncStorage.setItem('routes', routesString).then(() => {
            this.props.navigation.navigate('ProfileRoute');
        }).catch(err => {
            console.log("err while removing route");
        });
    }
    render(){
        const {days, start, arrive} = this.state;
        return(
            <View style={styles.container}>
                <Text style={styles.text}>When do you cycle (or want to)?</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={days}
                    onValueChange={(value) => this.setState({days: value})}
                >
                    <Picker.Item label="weekdays" value="weekdays" />
                    <Picker.Item label="weekend" value="weekend" />
                </Picker>
                <Text style={styles.text}>What time do you start?</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={start}
                    onValueChange={(value) => this.setState({start: value})}
                >
                    <Picker.Item label="7-8" value="7-8" />
                    <Picker.Item label="8-9" value="8-9" />
                    <Picker.Item label="9-10" value="9-10" />
                    <Picker.Item label="10-11" value="10-11" />
                    <Picker.Item label="11-12" value="11-12" />
                    <Picker.Item label="12-13" value="12-13" />
                    <Picker.Item label="13-14" value="13-14" />
                    <Picker.Item label="14-15" value="14-15" />
                    <Picker.Item label="15-16" value="15-16" />
                    <Picker.Item label="16-17" value="16-17" />
                    <Picker.Item label="17-18" value="17-18" />
                    <Picker.Item label="18-19" value="18-19" />
                    <Picker.Item label="19-20" value="19-20" />
                    <Picker.Item label="20-21" value="20-21" />
                    <Picker.Item label="21-22" value="21-22" />
                    <Picker.Item label="22-23" value="22-23" />
                </Picker>
                <Text style={styles.text}>What time do you arrive?</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={arrive}
                    onValueChange={(value) => this.setState({arrive: value})}
                >
                    <Picker.Item label="7-8" value="7-8" />
                    <Picker.Item label="8-9" value="8-9" />
                    <Picker.Item label="9-10" value="9-10" />
                    <Picker.Item label="10-11" value="10-11" />
                    <Picker.Item label="11-12" value="11-12" />
                    <Picker.Item label="12-13" value="12-13" />
                    <Picker.Item label="13-14" value="13-14" />
                    <Picker.Item label="14-15" value="14-15" />
                    <Picker.Item label="15-16" value="15-16" />
                    <Picker.Item label="16-17" value="16-17" />
                    <Picker.Item label="17-18" value="17-18" />
                    <Picker.Item label="18-19" value="18-19" />
                    <Picker.Item label="19-20" value="19-20" />
                    <Picker.Item label="20-21" value="20-21" />
                    <Picker.Item label="21-22" value="21-22" />
                    <Picker.Item label="22-23" value="22-23" />
                    <Picker.Item label="23-00" value="23-00" />
                </Picker>
                <AddButton
                    text="save this route"
                    onPress={this.saveRoute}
                />
                <AddButton
                    text="remove this route"
                    onPress={this.removeRoute}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    picker: {
        width: 150,
        color: "#7BC9D3"
    },
    text: {
        paddingTop: 5,
        paddingBottom: 5,
    },
    container: {
        paddingTop: 20,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 10
    }
});
