import React from 'react';
import {View,Text,StyleSheet,SafeAreaView, TouchableOpacity} from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'
import {styles} from './AppStyle'
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Screen extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <SafeAreaView style={{flex:1}}>
                <TouchableOpacity 
                        style={styles.menuBar}
                        onPress={this.props.navigation.openDrawer}
                    >
                        <Text style={styles.appMoreIcon}>     <FontAwesome5 name="bars" style={styles.appMoreIcon}/></Text>
                        <Text style={styles.appHeader}> </Text>
                        <Text style={styles.appHeader}> </Text>
                    </TouchableOpacity>
                <View style={styles.screen}>
                <Text>{this.props.name}</Text>
                </View>
                </SafeAreaView>
            </View>
        )
    }


    someFunction(){
        alert();
    }
}



