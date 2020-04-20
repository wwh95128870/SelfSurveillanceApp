import React from 'react';
import {View,Text,StyleSheet,SafeAreaView, TouchableOpacity} from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'
import {styles} from './AppStyle'
import { Input } from 'react-native-elements';
import {  Button,Snackbar } from 'react-native-paper';

export default class SentRequestScreen extends React.Component{

    state = {
        visible: false,
        message:""
    };

    render(){
        return(
            <View style={styles.container}>
                <SafeAreaView style={{flex:1}}>
                    <TouchableOpacity 
                        style={styles.menuBar}
                        onPress={this.props.navigation.openDrawer}
                    >
                        <Text style={styles.appMoreIcon}>     <FontAwesome5 name="bars" style={styles.appMoreIcon}/></Text>
                        <Text style={styles.appHeader}>Request</Text>
                        <Text style={styles.appHeader}></Text>
                    </TouchableOpacity>
                    <View style={styles.screen}>
                        <View style={styles.inputGroup}>
                            <View style={styles.inputView}>
                                <Input
                                label="Your Message"
                                labelStyle = {styles.inputTitle}
                                placeholder='Your message here'
                                onChangeText={text => this.setState({message:text})}
                                value={this.state.message}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <View style={styles.rowGroupView}>
                                    <View style={{ flex:2, }} >
                                        <Input
                                            label = "GPS Location"
                                            labelStyle = {styles.inputTitle}
                                            disabled = "true"
                                        />
                                    </View>
                                    <View style={{ flex:1}} >
                                        <Button
                                            mode="outlined"
                                        >
                                            Update GPS
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        )
    }

    submitOnClick(){
        this.setState(state => ({ visible: !state.visible }));
    }

}


const inPageStyles = StyleSheet.create({

})

