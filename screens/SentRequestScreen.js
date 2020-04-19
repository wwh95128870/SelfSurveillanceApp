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
                        <View style={inPageStyles.inputGroup}>
                            <View style={inPageStyles.inputView}>
                                <Input
                                label="Your Message"
                                labelStyle = {inPageStyles.inputTitle}
                                placeholder='Your message here'
                                onChangeText={text => this.setState({message:text})}
                                value={this.state.message}
                                />
                            </View>
                            
                            <View Style={inPageStyles.inputRow}>
                                <Input
                                    label = "GPS Location"
                                    
                                />
                                <Button
                                    mode="outlined"
                                >
                                    Update GPS
                                </Button>
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
    inputGroup:{
        height:"100%",
        width:"90%",
        maxWidth: 600,
        alignItems:"center",
        justifyContent:"flex-start",
        flexDirection:"column",
    },
    inputView:{
        width:"100%",
        margin: 20
    },
    inputTitle:{
        // fontSize:24,
        color:"#161924",
    },
    submitButton:{
        flex:1,
        width:"90%",
        maxWidth: 600,
    },
    inputRow:{
        flexDirection:"row",
    },
    rowInput:{
        flex:1,
    },
    rowButton:{
        flex:1,
    }
})

