import React from "react";
import { View, Text, Button, Image, TextInput, TouchableWithoutFeedback } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import {FadeInImage} from './FadeInImage';
import {ProfileLogo} from './ProfileLogo';

export class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Edit your profile, ' + navigation.getParam('name', 'cyclist')
        };
    };
    render() {
        const name = this.props.navigation.getParam('name', 'cyclist');
        return (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
            <FadeInImage source={require('./assets/bike.png')} style={{flex:1, height: 150, width: 150}} />
            <View style={{flex: 2}}>
                <Text>Profile Screen</Text>
                <Text>Hi {name}, set up your profile here! :)</Text>
                <Text>input name, city and weekly cycling schedule</Text>
                <Text>type of bike? weekly goal in km?</Text>
                <Button
                    title="Go to profile... again"
                    onPress={() => this.props.navigation.push('ProfileRoute')}
                />
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('WelcomeRoute')}
                />
            </View>
          </View>
        );
    }
}
