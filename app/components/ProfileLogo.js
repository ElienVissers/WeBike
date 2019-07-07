import React from 'react';
import {Image} from 'react-native';

export class ProfileLogo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
        <Image
            {...this.props}
            source={require('../../assets/bike.png')}
            style={{flex:1, width: 50, height: 35, margin: 10}}
            resizeMode="contain"
        />
        );
    }

}
