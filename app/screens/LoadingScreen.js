import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View, Image} from 'react-native';

export class LoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.LoadExistingUserInfo();
    }

    LoadExistingUserInfo = async () => {
        const name = await AsyncStorage.getItem('name');
        this.props.navigation.navigate(name ? 'App' : 'Register');
    };

    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
                <Image source={require('./assets/bike.png')} />
            </View>
        );
    }
}
