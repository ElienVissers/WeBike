import React from 'react';
import { StyleSheet, Text, ViewPagerAndroid, View } from 'react-native';

export class test extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ViewPagerAndroid initialPage={0} style={styles.viewpager}>
                    <View style={styles.page}>
                        <Text style={styles.text}>Page 1!</Text>
                        <Text style={styles.text}>I love you!</Text>
                        <Text style={styles.text}>Hi Ivan!</Text>
                    </View>
                    <View style={styles.page}>
                        <Text style={styles.text}>Page 2!</Text>
                        <Text style={styles.text}>Hi Ivan!</Text>
                        <Text style={styles.text}>I love you!</Text>
                    </View>
                    <View style={styles.page}>
                        <Text style={styles.text}>Page 3!</Text>
                        <Text style={styles.text}>I love you!</Text>
                    </View>
                </ViewPagerAndroid>
                <View>
                    <Text style={{textAlign: 'center'}}>Menu</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green'
    },
    text : {
        color: 'red'
    },
    viewpager: {
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    page: {
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        flex: 1
    }
});
