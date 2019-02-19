import React from "react";
import { View, Text, Image, TextInput, TouchableWithoutFeedback, StyleSheet, ScrollView } from "react-native";
import { Button } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from "react-navigation";

import {AddButton} from './AddButton';
import {NewRoute} from './NewRoute';
import {NotificationSwitch} from './NotificationSwitch';


export class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: [], //or get the routes from redux
            index0: 0,
            index1: 1,
            index2: 2,
            index3: 3,
            notify1hAdvance: false, //or get from redux
            notifyAtStart: false //or get from redux
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
            title: 'Edit your profile, ' + navigation.getParam('name', 'cyclist')
        };
    };
    componentDidMount() {
        this.setState({
            name: this.props.name,
            city: this.props.city
        });
        if (this.state.routes[0]) {
            this.setState({
                index0: "0existing"
            });
        }
        if (this.state.routes[1]) {
            this.setState({
                index1: "1existing"
            });
        }
        if (this.state.routes[2]) {
            this.setState({
                index2: "2existing"
            });
        }
        if (this.state.routes[3]) {
            this.setState({
                index3: "3existing"
            });
        }
    }
    toggleSwitch(value) {
        this.setState({
            notify1hAdvance: value
        }, console.log('this.state.notify1hAdvance: ', this.state.notify1hAdvance));
    }
    toggleSwitch2(value) {
        this.setState({
            notifyAtStart: value
        }, console.log('this.state.notify1hAdvance: ', this.state.notifyAtStart));
    }
    onPress() {
        console.log("local state (this.state.routes): ", this.state.routes);
        // save all the data from local state to redux OR to app?
        // put in a check that the city is real?
        this.props.navigation.navigate('CurrentWeatherRoute', {
            name: this.state.name,
            city: this.state.city
        });
    }
    addRoute() {
        console.log("route added");
        this.setState(prevState => ({
            routes: [...prevState.routes, "tempRoute"]
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
        const name = this.props.navigation.getParam('name', 'cyclist');
        const city = this.props.navigation.getParam('city', 'hometown');
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
                    <View style={{marginTop: 50, marginBottom: 20, flexDirection: 'row'}}>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input}
                                defaultValue={name}
                                placeholder="name"
                                onChangeText={text => this.setState({
                                    name: text
                                })}
                            />
                        </View>
                        <Text style={{flex: 1, marginTop: 11, marginLeft: 10}}> from </Text>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input}
                                defaultValue={city}
                                placeholder="city"
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

                    {this.state.routes.length > 0 && <View>
                        <NewRoute updateBikeRoute={this.updateBikeRoute} removeBikeRoute={this.removeBikeRoute} index={this.state.index0} />
                    </View>}

                    {this.state.routes.length > 1 && <View>
                        <NewRoute updateBikeRoute={this.updateBikeRoute} removeBikeRoute={this.removeBikeRoute} index={this.state.index1} />
                    </View>}

                    {this.state.routes.length > 2 && <View>
                        <NewRoute updateBikeRoute={this.updateBikeRoute} removeBikeRoute={this.removeBikeRoute} index={this.state.index2} />
                    </View>}

                    {this.state.routes.length > 3 && <View>
                        <NewRoute updateBikeRoute={this.updateBikeRoute} removeBikeRoute={this.removeBikeRoute} index={this.state.index3} />
                    </View>}

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
