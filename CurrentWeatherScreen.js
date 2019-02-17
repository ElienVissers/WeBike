import React from "react";
import { View, Text, Button, Image, TextInput, TouchableWithoutFeedback } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import {FadeInImage} from './FadeInImage';
import {ProfileLogo} from './ProfileLogo';

export class CurrentWeatherScreen extends React.Component {
    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
    }
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('title', 'Welcome!'),
            headerRight: (
                <TouchableWithoutFeedback
                    onPress={navigation.getParam('editProfile')}
                >
                    <ProfileLogo/>
                </TouchableWithoutFeedback>
            )
        };
    };
    componentDidMount() {
        this.props.navigation.setParams({ editProfile: this.onPress });
    }
    onPress() {
        if (this.state.typedName) {
            this.props.navigation.navigate('ProfileRoute', {
                name: this.state.text
            });
        } else {
            this.props.navigation.navigate('ProfileRoute');
        }
    }
    render() {
        return (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
            <FadeInImage source={require('./assets/bike.png')} style={{flex:1, height: 150, width: 150}} />
            <View style={{flex: 2}}>
                <Text>Profile Screen</Text>
            </View>
          </View>
        );
    }
}
