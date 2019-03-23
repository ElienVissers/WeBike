import React from "react";
import { Text, Picker, StyleSheet, View, ScrollView, Alert } from "react-native";

import {AddButton} from './AddButton';

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
        this.editRoute = this.editRoute.bind(this);
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
    editRoute() {
        this.setState({
            saved: false
        });
    }
    removeRoute() {
        this.setState({
            saved: true
        });
        this.props.removeBikeRoute(this.props.index);
    }
    render() {
        const {arrayOfRoutes} = this.props
        const {start, arrive, days} = arrayOfRoutes[0]
        return (
            <ScrollView>
                {this.state.saved &&
                    arrayOfRoutes.map((route, index) => {
                        const {start, arrive, days} = route
                        return (
                            <Route
                                start={start}
                                arrive={arrive}
                                days={days}   key={index}
                            />
                        )

                    })
                }
                {!this.state.saved &&
                    <EditRoute
                        start={start}
                        arrive={arrive}
                        days={days}
                    />
                }

            </ScrollView>
        );
    }
}




export class EditRoute extends React.Component {
    render(){
        const {days, start, arrive} = this.props

        return(
            <View style={styles.yellowContainer}>
                <Text style={styles.text}>When do you cycle (or want to)?</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={days}
                    onValueChange={(value) => this.setState({days: value})}
                >
                    <Picker.Item label="weekdays" value="weekdays" />
                    <Picker.Item label="weekend" value="weekend" />
                </Picker>
                <Text style={styles.text}>What time do you start?</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={start}
                    onValueChange={(value) => this.setState({start: value})}
                >
                    <Picker.Item label="7-8" value="7-8" />
                    <Picker.Item label="8-9" value="8-9" />
                    <Picker.Item label="9-10" value="9-10" />
                    <Picker.Item label="10-11" value="10-11" />
                    <Picker.Item label="11-12" value="11-12" />
                    <Picker.Item label="12-13" value="12-13" />
                    <Picker.Item label="13-14" value="13-14" />
                    <Picker.Item label="14-15" value="14-15" />
                    <Picker.Item label="15-16" value="15-16" />
                    <Picker.Item label="16-17" value="16-17" />
                    <Picker.Item label="17-18" value="17-18" />
                    <Picker.Item label="18-19" value="18-19" />
                    <Picker.Item label="19-20" value="19-20" />
                    <Picker.Item label="20-21" value="20-21" />
                    <Picker.Item label="21-22" value="21-22" />
                    <Picker.Item label="22-23" value="22-23" />
                </Picker>
                <Text style={styles.text}>What time do you arrive?</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={arrive}
                    onValueChange={(value) => this.setState({arrive: value})}
                >
                    <Picker.Item label="7-8" value="7-8" />
                    <Picker.Item label="8-9" value="8-9" />
                    <Picker.Item label="9-10" value="9-10" />
                    <Picker.Item label="10-11" value="10-11" />
                    <Picker.Item label="11-12" value="11-12" />
                    <Picker.Item label="12-13" value="12-13" />
                    <Picker.Item label="13-14" value="13-14" />
                    <Picker.Item label="14-15" value="14-15" />
                    <Picker.Item label="15-16" value="15-16" />
                    <Picker.Item label="16-17" value="16-17" />
                    <Picker.Item label="17-18" value="17-18" />
                    <Picker.Item label="18-19" value="18-19" />
                    <Picker.Item label="19-20" value="19-20" />
                    <Picker.Item label="20-21" value="20-21" />
                    <Picker.Item label="21-22" value="21-22" />
                    <Picker.Item label="22-23" value="22-23" />
                    <Picker.Item label="23-00" value="23-00" />
                </Picker>
                <AddButton
                    text="save this route"
                    onPress={this.saveRoute}
                />
                <AddButton
                    text="remove this route"
                    onPress={this.removeRoute}
                />
            </View>
        )
    }
}

export class Route extends React.Component {
    render() {
        const {days, start, arrive} = this.props

        return(
            <View style={{flexDirection: "row"}}>
                {days == "weekdays" &&
                <Text style={styles.savedText}>On weekdays from {start}h untill {arrive}h.</Text>}
                {days == "weekend" &&
                <Text style={styles.savedText}>In the weekend from {start}h untill {arrive}h.
                </Text>}
                <AddButton
                    text="edit"
                    onPress={this.editRoute}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    picker: {
        width: 150,
        color: "#7BC9D3"
    },
    text: {
        paddingTop: 5,
        paddingBottom: 5,
    },
    savedText: {
        marginTop: 15,
        marginBottom: 10,
        marginRight: 10
    },
    yellowContainer: {
        borderWidth: 1,
        borderColor: 'gold',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 10}
});
