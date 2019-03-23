import React from "react";
import { View, Text, Image, TextInput, TouchableWithoutFeedback, StyleSheet, ScrollView, AsyncStorage } from "react-native";
import { Button } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from "react-navigation";

import {AddButton} from './AddButton';
import {RoutesContainer} from './RoutesContainer';
import {NotificationSwitch} from './NotificationSwitch';


export class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addingRoute: false,
            index0: 0,
            index1: 1,
            index2: 2,
            index3: 3
        };
        this.onPress = this.onPress.bind(this);
        this.addRoute = this.addRoute.bind(this);
        this.updateBikeRoute = this.updateBikeRoute.bind(this);
        this.removeBikeRoute = this.removeBikeRoute.bind(this);
        this.toggleSwitch = this.toggleSwitch.bind(this);
        this.toggleSwitch2 = this.toggleSwitch2.bind(this);
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Edit your profile'
        };
    };
    componentWillMount() {
        var self = this;
        AsyncStorage.getItem('userProfile').then(profileString => {
            if (profileString) {
                var profile = JSON.parse(profileString);
                self.setState({
                    name: profile["name"] || 'cyclist',
                    city: profile["city"] || 'city',
                    notify1hAdvance: profile["notify1hAdvance"] || false,
                    notifyAtStart: profile["notifyAtStart"] || false,
                    routes: profile["routes"] || []
                });
            } else {
                AsyncStorage.getItem('firstProfile').then(firstProfileString => {
                    var firstProfile = JSON.parse(firstProfileString);
                    self.setState({
                        name: firstProfile.name,
                        city: firstProfile.city,
                        notify1hAdvance: false,
                        notifyAtStart: false,
                        routes: []
                    });
                });
            }
        }).then(() => {
            // console.log("routes: ", self.state.routes);
            if (self.state.routes[0]) {
                self.setState({
                    index0: "0existing"
                });
            }
            if (self.state.routes[1]) {
                self.setState({
                    index1: "1existing"
                });
            }
            if (self.state.routes[2]) {
                self.setState({
                    index2: "2existing"
                });
            }
            if (self.state.routes[3]) {
                self.setState({
                    index3: "3existing"
                });
            }
        }).catch(err => {
            console.log("err loading profileInfo: ", err);
        })
    }
    toggleSwitch(value) {
        this.setState({
            notify1hAdvance: value
        });
    }
    toggleSwitch2(value) {
        this.setState({
            notifyAtStart: value
        });
    }
    onPress() {
        var userProfileString = JSON.stringify({
            name: this.state.name,
            city: this.state.city,
            notify1hAdvance: this.state.notify1hAdvance,
            notifyAtStart: this.state.notifyAtStart,
            routes: this.state.routes
        });
        AsyncStorage.setItem('userProfile', userProfileString).then(() => {
            this.props.navigation.navigate('CurrentWeatherRoute');
        }).catch(err => {
            console.log("err while saving profile: ", err);
        });
    }
    addRoute() {
        var addedRoute = {
            addingRoute: true,
            days: "weekdays",
            start: "7-8",
            arrive: "7-8"
        };
        this.setState(prevState => ({
            addingRoute: true,
            routes: [...prevState.routes, addedRoute]
        }));
    }
    updateBikeRoute(routeObject) {
        if (typeof routeObject.index == "string") {
            //EXISTING BIKE ROUTE --> replace the routeObject on index arrIndex of the state.routes
            let arrIndex = routeObject.index.slice(0,1);
            this.setState(prevState => ({
                routes: prevState.routes.map((item, index) => {
                    if (index == arrIndex) {
                        return routeObject;
                    } else {
                        return item;
                    }
                })
            }));
        } else {
            //NEW BIKE ROUTE --> replace the tempRoute string in the state.routes with the routeObject
            this.setState(prevState => ({
                routes: prevState.routes.map(
                    i => {
                        if (i == "tempRoute") {
                            return routeObject;
                        } else {
                            return i;
                        }
                    }
                )
            }));
        }
    }
    removeBikeRoute(route_index) {
        console.log("this.state.routes in removeBikeRoute:", this.state.routes);
        console.log("route_index in removeBikeRoute:", route_index);
        if (typeof route_index == "string") {
            //EXISTING BIKE ROUTE
            let arrIndex = route_index.slice(0,1);
            console.log("arrIndex: ", arrIndex);
            this.setState(prevState => ({
                routes: prevState.routes.filter((item, index) => {
                    if (item.index == arrIndex) {
                        return false;
                    } else {
                        return true;
                    }
                })
            }), () => console.log("this.state.routes (existing):", this.state.routes));
        } else {
            //NEW BIKE ROUTE
            this.setState(prevState => ({
                routes: prevState.routes.filter(
                    i => {
                        if (i.index == route_index) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                )
            }), () => console.log("this.state.routes (new):", this.state.routes));
        }
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

                    <NotificationSwitch
                        toggleSwitch = {this.toggleSwitch}
                        notify = {this.state.notify1hAdvance}
                        text = "notify me 1 hour before"
                    />

                    <NotificationSwitch
                        toggleSwitch = {this.toggleSwitch2}
                        notify = {this.state.notifyAtStart}
                        text = "notify me when I start"
                    />

                    <Text style={styles.title}>Weekly cycling routes:</Text>


                    {this.state.routes &&
                        <RoutesContainer
                            updateBikeRoute={this.updateBikeRoute} removeBikeRoute={this.removeBikeRoute}
                            saved={!this.state.addingRoute}
                            arrayOfRoutes={this.state.routes}
                        />
                    }

                    <Text style={{color: 'white', fontSize: 20, flex: 1}}>Spacing</Text>

                    {this.state.routes.length < 4 && <AddButton
                        style={{flex: 1, marginBottom: 30}}
                        text="add bike route"
                        onPress={this.addRoute}
                    />}

                    <Text style={{color: 'white', fontSize: 20, flex: 1}}>Spacing</Text>

                    <Button buttonStyle={styles.button}
                        title="SAVE"
                        raised={true}
                        onPress={this.onPress}
                    />
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
    button: {
        backgroundColor: "#7BC9D3",
        paddingTop: 5,
        paddingBottom: 5
    }
});
