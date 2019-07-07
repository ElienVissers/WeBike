import React from 'react';
import { Animated, Image, View } from 'react-native';

export class CustomFadeInImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          fadeValue: new Animated.Value(0)
        }
        this.onLoad = this.onLoad.bind(this);
    }

    onLoad() {
        Animated.timing(
            this.state.fadeValue,
            {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true
            }
        ).start();
    }

    render() {
        return (
            <Animated.Image
                {...this.props}
                onLoad={this.onLoad}
                resizeMode="contain"
                style={[
                    {
                        opacity: this.state.fadeValue,
                        transform: [{
                            scale: this.state.fadeValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.85, 1]
                            })
                        }]
                    },
                    this.props.style
                ]}
            />
        );
    }
}
