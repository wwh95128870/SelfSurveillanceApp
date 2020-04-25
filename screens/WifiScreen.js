import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import { styles } from './AppStyle'
import { FontAwesome5 } from '@expo/vector-icons'
import { Button } from 'react-native-paper';
import { WebView } from 'react-native-webview';




export default class WifiScreen extends React.Component {

    state = {
        payload: "default"
    };

    onSelect = data => {
        this.setState(data);
    };

    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={styles.menuBar}
                        onPress={this.props.navigation.openDrawer}
                    >
                        <Text style={styles.appMoreIcon}>     <FontAwesome5 name="bars" style={styles.appMoreIcon} /></Text>
                        <Text style={styles.appHeader}> </Text>
                        <Text style={styles.appHeader}> </Text>
                    </TouchableOpacity>
                    {/* <Text style={{ fontSize: 20, alignContent:"center",alignSelf:'center'}}>Infected Person Nearby</Text> */}
                    <WebView source={{ uri: 'https://chp-dashboard.geodata.gov.hk/covid-19/en.html' }} />
                </SafeAreaView>
            </View>
        )
    }

    myFunction() {
        Alert.alert("Save", "No any Infected Person surrounding you");
    }

}


