import React from "react";
import { View, Text, Image, TextInput, StyleSheet, Alert, AsyncStorage } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from "react-navigation";

import {FadeInImage} from './FadeInImage';

export class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onPress = this.onPress.bind(this);
    }
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Welcome, cyclist!'
        };
    };
    onPress() {
        if (this.state.name && this.state.city) {
            var firstProfileString = JSON.stringify({
                name: this.state.name,
                city: this.state.city
            });
            AsyncStorage.setItem('firstProfile', firstProfileString).then(() => {
                this.props.navigation.navigate('ProfileRoute');
            }).catch(err => {
                console.log("err while saving name and city in WelcomeScreen: ", err);
            });
        } else {
            Alert.alert(
                'Please fill in your name and city',
                "We will send you personalised motivation messages and local weather forecasts to motivate you to get on your bike!"
            );
        }
    }
    render() {
        return (
            <KeyboardAwareScrollView contentContainerStyle={styles.container} enableOnAndroid={true}>
                <FadeInImage source={require('./assets/bike.png')} style={styles.mainImage} />
                <View style={styles.mainContent}>
                    <Text style={styles.title}>Welcome to WeBike</Text>
                    <Text style={styles.text}>Please fill in your name and city!</Text>
                    <View style={{marginTop: 50, marginBottom: 50}}>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input}
                                placeholder="name"
                                onChangeText={text => this.setState({
                                    name: text
                                })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input}
                                placeholder="city"
                                onChangeText={text => this.setState({
                                    city: text
                                })}
                            />
                        </View>
                    </View>
                    <Button buttonStyle={styles.button}
                        title="Start cycling!"
                        raised={true}
                        onPress={this.onPress}
                    />
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white"
    },
    mainImage : {
        flex:2,
        height: 200,
        width: 200
    },
    mainContent: {
        flex: 3
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center'
    },
    text: {
        textAlign: 'center'
    },
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'gold'
    },
    input: {
        textAlign: 'center',
        height: 40,
        color: 'black'
    },
    button: {
        backgroundColor: "#7BC9D3"
    }
});
