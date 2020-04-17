import React from 'react';
import {View,Text,StyleSheet,SafeAreaView, TouchableOpacity} from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'
import {styles} from './AppStyle'
import { Input } from 'react-native-elements';
import {  Button,Snackbar } from 'react-native-paper';

export default class SentRequestScreen extends React.Component{

    state = {
        visible: false,
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
                        <Text style={styles.appHeader}>SentRequestScreen</Text>
                        <Text style={styles.appHeader}></Text>
                    </TouchableOpacity>
                    <View style={styles.screen}>

                        <View style={inPageStyles.inputGroup}>

                            <View style={inPageStyles.inputView}>
                                <Input label="User Name"
                                labelStyle = {inPageStyles.inputTitle}
                                placeholder='Your Name Here'
                                />
                            </View>

                            <View style={inPageStyles.inputView}>
                                <Input
                                label="Phone No"
                                labelStyle = {inPageStyles.inputTitle}
                                placeholder='Your Contact number'
                                leftIcon={{ type: 'font-awesome', name: 'phone' }}
                                />
                            </View>

                            <View style={inPageStyles.inputView}>
                                <Input
                                label="Email Address"
                                labelStyle = {inPageStyles.inputTitle}
                                placeholder='Your Contact email'
                                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                                />
                            </View>

                            <View style={inPageStyles.inputView}>
                                <Input
                                label="Address"
                                labelStyle = {inPageStyles.inputTitle}
                                placeholder='Your Contact address'
                                leftIcon={{ type: 'font-awesome', name: 'map-signs' }}
                                />
                            </View>

                            <View style={inPageStyles.inputView}>
                                <Button
                                mode="outlined"
                                onPress={() => this.submitOnClick()}
                                >
                                Save
                                </Button>

                            </View>
                        </View>

                    </View>
                </SafeAreaView>
                <Snackbar
                    visible={this.state.visible}
                    onDismiss={() => this.setState({ visible: false })}
                    duration={5000}
                    >
                    Information Saved
                </Snackbar>
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
        fontSize:24,
        color:"#161924",

    },
    submitButton:{
        flex:1,
        width:"90%",
        maxWidth: 600,
    }
})

