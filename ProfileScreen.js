import React from "react";
import { View, Text, Image, TextInput, TouchableWithoutFeedback, StyleSheet, ScrollView } from "react-native";
import { Button } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from "react-navigation";

import {AddButton} from './AddButton';
import {NewRoute} from './NewRoute';


export class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: [] //or get the routes from redux
        };
        this.onPress = this.onPress.bind(this);
        this.addRoute = this.addRoute.bind(this);
        this.updateBikeRoute = this.updateBikeRoute.bind(this);
        this.removeBikeRoute = this.removeBikeRoute.bind(this);
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Edit your profile, ' + navigation.getParam('name', 'cyclist')
        };
    };
    onPress() {
        // save all the data from local state to redux
        this.props.navigation.navigate('CurrentWeatherRoute', {
            name: this.state.name,
            city: this.state.city
        });
    }

    ////fix addRoute, updateBikeRoute and removeBikeRoute (updating local state)
    addRoute() {
        console.log("route added");
        this.setState(prevState => ({
            routes: [...prevState.routes, "tempRoute"]
        }));
    }
    updateBikeRoute(routeObject) {
        this.setState(prevState => ({
            routes: prevState.routes.push(routeObject)
        }));
    }
    removeBikeRoute(route_id) {
        this.setState(prevState => ({
            routes: prevState.routes.filter(route_id)
        }));
    }
    ////////////////////////////////////////////////////////////////////////////

    render() {
        const name = this.props.navigation.getParam('name', 'cyclist');
        const city = this.props.navigation.getParam('city', 'hometown');
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <ScrollView style={styles.mainContent}>
                    <View style={{marginTop: 50, marginBottom: 50}}>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input}
                                defaultValue={name}
                                placeholder="name"
                                onChangeText={text => this.setState({
                                    name: text
                                })}
                            />
                        </View>
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
                    <Text style={styles.title}>Weekly cycling routes:</Text>

                    {this.state.routes.length > 0 && <View>
                        <NewRoute updateBikeRoute={this.updateBikeRoute}/>
                    </View>}

                    {this.state.routes.length > 1 && <View>
                        <NewRoute updateBikeRoute={this.updateBikeRoute} />
                    </View>}

                    {this.state.routes.length > 2 && <View>
                        <NewRoute updateBikeRoute={this.updateBikeRoute} />
                    </View>}

                    {this.state.routes.length > 3 && <View>
                        <NewRoute updateBikeRoute={this.updateBikeRoute} />
                    </View>}

                    //add a conditional so that the bike route does NOT render when there is a tempRoute string in the this.state.routes
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
        marginBottom: 15
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
        backgroundColor: "#7BC9D3",
        paddingTop: 5,
        paddingBottom: 5
    }
});
