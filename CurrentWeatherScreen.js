import React from "react";
import { View, Text, Button, Image, TextInput, TouchableWithoutFeedback, AsyncStorage } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import {FadeInImage} from './FadeInImage';
import {ProfileLogo} from './ProfileLogo';


export class CurrentWeatherScreen extends React.Component {
    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
        this.clear = this.clear.bind(this);
    }
    static navigationOptions = ({navigation}) => {
        return {
            title: 'WeBike',
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
        this.props.navigation.navigate('ProfileRoute');
    }
    clear() {
        AsyncStorage.clear();
    }
    render() {
        return (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
            <FadeInImage source={require('./assets/bike.png')} style={{flex:1, height: 150, width: 150}} />
            <View style={{flex: 2}}>
                <Text>Current Weather Screen</Text>
                <Button onPress={this.clear}
                    title="Clear Async Storage"
                />
            </View>
          </View>
        );
    }
}
