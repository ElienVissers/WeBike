import React from "react";
import { View, Text, Button, Image, TextInput, TouchableWithoutFeedback } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import {FadeInImage} from './fadeinimage';
import {ProfileLogo} from './profilelogo';

let isNewUser = true;

class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                <FadeInImage source={require('./assets/bike.png')} style={{flex:1, height: 150, width: 150}} resizeMode="contain" />
                <View style={{flex: 2}}>
                    <Text>Welcome Screen</Text>
                    <Text>welcome message and current weather info blabla</Text>
                    <TextInput
                        style={{height: 40, color: 'black'}}
                        placeholder="Type your name!"
                        onChangeText={text => this.setState({
                            text: text,
                            typedName: true
                        })}
                    />
                    <Button
                        title="Create profile"
                        onPress={this.onPress}
                    />
                    <Button
                        title="Update the title"
                        onPress={() => this.props.navigation.setParams({title: 'Updated!'})}
                    />
                </View>
            </View>
        );
    }
}

class ProfileScreen extends React.Component {
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
            <FadeInImage source={require('./assets/bike.png')} style={{flex:1, height: 150, width: 150}} resizeMode="contain" />
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

class CurrentWeatherScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Current weather for Berlin'
        };
    };
    render() {
        return (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
            <FadeInImage source={require('./assets/bike.png')} style={{flex:1, height: 150, width: 150}} resizeMode="contain" />
            <View style={{flex: 2}}>
                <Text>Profile Screen</Text>
            </View>
          </View>
        );
    }
}


const AppNavigator = createStackNavigator(
    {
        WelcomeRoute: WelcomeScreen,
        ProfileRoute: ProfileScreen,
        CurrentWeatherRoute: CurrentWeatherScreen
    },
    {
        initialRouteName: isNewUser ? "WelcomeRoute" : "CurrentWeatherRoute",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'skyblue'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

// STYLING HEADER IN SCREEN COMPONENTS: headerTitle instead of title when you want an image instead of just a text title --> headerTitle: <LogoTitle />
