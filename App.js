import React from "react";
import { View, Text, Button, Image, TextInput } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import {FadeInImage} from './fadeinimage';

class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onPress = this.onPress.bind(this);
    }
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('title', 'Welcome!')
        };
    };
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
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "pink" }}>
                <FadeInImage source={require('./assets/bike.jpg')} style={{width: 150, height: 100}}/>
                <Text>Welcome Screen</Text>
                <Text>welcome message and current weather info</Text>
                <TextInput
                    style={{height: 40, color: 'white'}}
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
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "lightblue" }}>
            <FadeInImage source={require('./assets/bike.jpg')} style={{width: 150, height: 100}}/>
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
            <Button
                title="Go back"
                onPress={() => this.props.navigation.goBack()}
            />
          </View>
        );
    }
}


const AppNavigator = createStackNavigator(
    {
        WelcomeRoute: WelcomeScreen,
        ProfileRoute: ProfileScreen
    },
    {
        initialRouteName: "WelcomeRoute",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'palevioletred'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerRight: (
                <Button
                    onPress={() => alert('This is a button!')}
                    title="Info"
                    color="black"
                />
            )
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
