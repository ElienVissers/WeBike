import React from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';


export class NotificationSwitch extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
           <View style={styles.container}>
                <Switch
                    onValueChange={this.props.toggleSwitch}
                    value={this.props.notify}
                    trackColor={{false: 'silver', true: 'gold'}}
                    thumbColor="gold"
                />
                {this.props.notify && <Text style={{color:'gold'}}>{this.props.text}</Text>}
                {!this.props.notify && <Text style={{color:'silver'}}>don't {this.props.text}</Text>}
           </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingTop: 0
    }
});
