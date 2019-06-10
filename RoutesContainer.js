import React from "react";
import { Text, Picker, StyleSheet, View, ScrollView, Alert } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import {AddButton} from './AddButton';
import {EditRouteScreen} from './EditRouteScreen';

export class RoutesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saved: true,
            days: this.props.days || "weekdays",
            start: this.props.start || "7-8",
            arrive: this.props.arrive || "7-8"
        };
        this.saveRoute = this.saveRoute.bind(this);
        this.removeRoute = this.removeRoute.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.saved !== this.props.saved) {
            this.setState({
                saved: this.props.saved
            });
        }
    }
    saveRoute() {
        let start = parseInt(this.state.start.split("-")[0], 10);
        let arrive = parseInt(this.state.arrive.split("-")[1], 10);
        if (start < arrive) {
            this.props.updateBikeRoute({
                days: this.state.days,
                start: this.state.start,
                arrive: this.state.arrive,
                index: this.props.index
            });
            this.setState({
                saved: true
            });
        } else {
            Alert.alert(
                'Wow, you cycle impossibly fast!',
                "The arrival time must be after the departure time."
            );
        }
    }
    removeRoute() {
        this.setState({
            saved: true
        });
        this.props.removeBikeRoute(this.props.index);
    }
    render() {
        const {arrayOfRoutes} = this.props;
        return (
            <ScrollView>
                {arrayOfRoutes.map((route, index) => {
                    return (
                        <View style={styles.row}>
                            <Route
                                start={route.start}
                                arrive={route.arrive}
                                days={route.days}
                                key={index}
                            />
                            <AddButton
                                text="edit"
                                onPress={this.props.openEditRouteScreen}
                            />
                        </View>
                    )
                })}
            </ScrollView>
        );
    }
}


export class Route extends React.Component {
    render() {
        const {days, start, arrive} = this.props;
        return(
            <View>
                {days == "weekdays" &&
                <Text style={styles.savedText}>On weekdays from {start}h untill {arrive}h.</Text>}
                {days == "weekend" &&
                <Text style={styles.savedText}>In the weekend from {start}h untill {arrive}h.
                </Text>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    savedText: {
        marginTop: 15,
        marginBottom: 10,
        marginRight: 10
    }
});
