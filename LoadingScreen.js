import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View, Image} from 'react-native';

export class LoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.LoadExistingUserInfo();
    }
    
    LoadExistingUserInfo = async () => {
        const firstProfile = await AsyncStorage.getItem('firstProfile');
        this.props.navigation.navigate(firstProfile ? 'App' : 'Register');
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
