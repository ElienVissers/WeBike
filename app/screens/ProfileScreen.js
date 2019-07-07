import React from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, AsyncStorage } from "react-native";
import { Button } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from "react-navigation";

import {CustomWhiteButton} from '../components/CustomWhiteButton';
import {RoutesContainer} from '../components/RoutesContainer';
import {CustomNotificationSwitch} from '../components/CustomNotificationSwitch';


export class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.saveProfile = this.saveProfile.bind(this);
        this.addRoute = this.addRoute.bind(this);
        this.toggleSwitch1h = this.toggleSwitch1h.bind(this);
        this.toggleSwitchStart = this.toggleSwitchStart.bind(this);
        this.onWillFocus = this.onWillFocus.bind(this);
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Edit your profile'
        };
    };
    _s0: NavigationEventSubscription;
    componentWillMount() {
        var self = this;
        this._s0 = this.props.navigation.addListener('willFocus', this.onWillFocus);
        Promise.all([
            AsyncStorage.getItem('name'),
            AsyncStorage.getItem('city'),
            AsyncStorage.getItem('notify1hAdvance'),
            AsyncStorage.getItem('notifyAtStart'),
            AsyncStorage.getItem('routes')
        ])
        .then(profileString => {
            console.log("profileString: ", profileString);
            var profile = [];
            for (var i = 0; i < 5; i++) {
                profile.push(JSON.parse(profileString[i]));
            }
            console.log("profile: ", profile);
            self.setState({
                name: profile[0] != null ? Object.values(profile[0])[0] : 'cyclist',
                city: profile[1] != null ? Object.values(profile[1])[0] : 'city',
                notify1hAdvance: profile[2] != null ? Object.values(profile[2])[0] : null,
                notifyAtStart: profile[3] != null ? Object.values(profile[3])[0] : null,
                routes: profile[4] != null ? Object.values(profile[4])[0] : []
            }, () => console.log("this.state in ProfileScreen: ", self.state));
        }).catch(err => {
            console.log("err loading profileInfo (componentWillMount): ", err);
        });
    }
    componentWillUnmount() {
        this._s0.remove();
    }
    onWillFocus() {
        console.log("willFocus ProfileScreen");
        var self = this;
        Promise.all([
            AsyncStorage.getItem('name'),
            AsyncStorage.getItem('city'),
            AsyncStorage.getItem('notify1hAdvance'),
            AsyncStorage.getItem('notifyAtStart'),
            AsyncStorage.getItem('routes')
        ])
        .then(profileString => {
            console.log("profileString: ", profileString);
            var profile = [];
            for (var i = 0; i < 5; i++) {
                profile.push(JSON.parse(profileString[i]));
            }
            console.log("profile: ", profile);
            self.setState({
                name: profile[0] != null ? Object.values(profile[0])[0] : 'cyclist',
                city: profile[1] != null ? Object.values(profile[1])[0] : 'city',
                notify1hAdvance: profile[2] != null ? Object.values(profile[2])[0] : null,
                notifyAtStart: profile[3] != null ? Object.values(profile[3])[0] : null,
                routes: profile[4] != null ? Object.values(profile[4])[0] : []
            }, () => console.log("this.state in ProfileScreen: ", self.state));
        }).catch(err => {
            console.log("err loading profileInfo (onWillFocus): ", err);
        });
    }
    toggleSwitch1h(value) {
        this.setState({
            notify1hAdvance: value
        });
    }
    toggleSwitchStart(value) {
        this.setState({
            notifyAtStart: value
        });
    }
    saveProfile() {
        var nameString = JSON.stringify({name: this.state.name});
        var cityString = JSON.stringify({city: this.state.city});
        var notify1hAdvanceString = JSON.stringify({notify1hAdvance: this.state.notify1hAdvance});
        var notifyAtStartString = JSON.stringify({notifyAtStart: this.state.notifyAtStart});
        var routesString = JSON.stringify({routes: this.state.routes});
        Promise.all([
            AsyncStorage.setItem('name', nameString),
            AsyncStorage.setItem('city', cityString),
            AsyncStorage.setItem('notify1hAdvance', notify1hAdvanceString),
            AsyncStorage.setItem('notifyAtStart', notifyAtStartString),
            AsyncStorage.setItem('routes', routesString)
        ]).then(() => {
            this.props.navigation.navigate('CurrentWeatherRoute');
        }).catch(err => {
            console.log("err while saving profile: ", err);
        });
    }
    addRoute() {
        //to do: make this open EditRouteScreen, give default values and routeId = arrayOfRoutes.length +1
        var addedRoute = {
            days: "weekdays",
            start: "7-8",
            arrive: "7-8"
        };
        this.setState(prevState => ({
            routes: [...prevState.routes, addedRoute]
        }));
    }
    render() {
        if (!this.state.routes) {
            return null;
        }
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
                    <View style={{marginTop: 50, marginBottom: 20, flexDirection: 'row'}}>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input}
                                placeholder="name"
                                defaultValue={this.state.name}
                                onChangeText={text => this.setState({
                                    name: text
                                })}
                            />
                        </View>
                        <Text style={{flex: 1, marginTop: 11, marginLeft: 10}}> from </Text>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input}
                                placeholder="city"
                                defaultValue={this.state.city}
                                onChangeText={text => this.setState({
                                    city: text
                                })}
                            />
                        </View>
                    </View>

                    <CustomNotificationSwitch
                        toggleSwitch = {this.toggleSwitch1h}
                        notify = {this.state.notify1hAdvance}
                        text = "notify me 1 hour before"
                    />

                    <CustomNotificationSwitch
                        toggleSwitch = {this.toggleSwitchStart}
                        notify = {this.state.notifyAtStart}
                        text = "notify me when I start"
                    />

                    <Text style={styles.title}>Weekly cycling routes:</Text>

                    <RoutesContainer
                        updateBikeRoute={this.updateBikeRoute}
                        removeBikeRoute={this.removeBikeRoute}
                        openEditRouteScreen={this.openEditRouteScreen}
                        saved={!this.state.addingRoute}
                        arrayOfRoutes={this.state.routes}
                        navigation={this.props.navigation}
                    />

                    <Text style={{color: 'white', fontSize: 20, flex: 1}}>Spacing</Text>

                    <CustomWhiteButton
                        style={{flex: 1, marginBottom: 30}}
                        text="add bike route"
                        onPress={this.addRoute}
                    />

                    <Text style={{color: 'white', fontSize: 20, flex: 1}}>Spacing</Text>

                    <Button buttonStyle={styles.saveButton}
                        title="SAVE"
                        raised={true}
                        onPress={this.saveProfile}
                    />

                    <Text style={{color: 'white', fontSize: 20, flex: 1}}>Spacing</Text>

                </ScrollView>
            </ScrollView>
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
    mainContent: {
        flex: 1
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 15,
        marginTop: 20
    },
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'gold',
        flex: 2
    },
    input: {
        textAlign: 'center',
        color: 'black'
    },
    saveButton: {
        backgroundColor: "#7BC9D3",
        paddingTop: 5,
        paddingBottom: 5
    }
});
