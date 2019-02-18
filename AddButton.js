import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export class AddButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <Text style={styles.text}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderColor: "#7BC9D3",
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'flex-start',
        marginTop: 10,
        marginBottom: 10
    },
    text: {
        color: "#7BC9D3",
        alignSelf: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5
    }
});
