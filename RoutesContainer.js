import React from "react";
import { Text, StyleSheet, View, ScrollView, Alert } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import {AddButton} from './AddButton';

export class RoutesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const {arrayOfRoutes} = this.props;
        return (
            <ScrollView>
                {arrayOfRoutes.map((route, index) => {
                    return (
                        <View style={styles.row} key={index}>
                            <Route
                                start={route.start}
                                arrive={route.arrive}
                                days={route.days}
                            />
                            <AddButton
                                text="edit"
                                onPress={() => {
                                    this.props.navigation.navigate('EditRouteRoute', {
                                        routeId: index,
                                        days: route.days,
                                        start: route.start,
                                        arrive: route.arrive
                                    });
                                }}
                            />
                        </View>
                    )
                })}
            </ScrollView>
        );
    }
}

export class Route extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
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
