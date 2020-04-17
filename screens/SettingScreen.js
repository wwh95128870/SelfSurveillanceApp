import React from 'react';
import {AsyncStorage ,View,Text,StyleSheet,SafeAreaView, TouchableOpacity} from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'
import {styles} from './AppStyle'
import {VALUES} from "../Value"
import { Input } from 'react-native-elements';
import {  Button,Snackbar } from 'react-native-paper';

export default class SettingScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            name:"",
            phone:"",
            address:"",
            email:""
        };

        this.init();
    }
    init(){
        AsyncStorage.getItem(VALUES.USER.EMAIL,(err,result) =>{this.setState({email:result})});
        AsyncStorage.getItem(VALUES.USER.NAME,(err,result) =>{this.setState({name:result})});
        AsyncStorage.getItem(VALUES.USER.ADDRESS,(err,result) =>{this.setState({address:result})});
        AsyncStorage.getItem(VALUES.USER.PHONE,(err,result) =>{this.setState({phone:result})});
    }

    render(){
        return(
            <View style={styles.container}>
                <SafeAreaView style={{flex:1}}>
                    <TouchableOpacity 
                        style={styles.menuBar}
                        onPress={this.props.navigation.openDrawer}
                    >
                        <Text style={styles.appMoreIcon}>     <FontAwesome5 name="bars" style={styles.appMoreIcon}/></Text>
                        <Text style={styles.appHeader}>Setting</Text>
                        <Text style={styles.appHeader}></Text>
                    </TouchableOpacity>
                    <View style={styles.screen}>

                        <View style={inPageStyles.inputGroup}>

                            <View style={inPageStyles.inputView}>
                                <Input label="User Name"
                                labelStyle = {inPageStyles.inputTitle}
                                placeholder='Your Name Here'
                                onChangeText={text => this.setState({name:text})}
                                value={this.state.name}
                                />
                            </View>

                            <View style={inPageStyles.inputView}>
                                <Input
                                label="Phone No"
                                labelStyle = {inPageStyles.inputTitle}
                                placeholder='Your Contact number'
                                leftIcon={{ type: 'font-awesome', name: 'phone' }}
                                onChangeText={text => this.setState({phone:text})}
                                value={this.state.phone}
                                />
                            </View>

                            <View style={inPageStyles.inputView}>
                                <Input
                                label="Email Address"
                                labelStyle = {inPageStyles.inputTitle}
                                placeholder='Your Contact email'
                                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                                onChangeText={text => this.setState({email:text})}
                                value={this.state.email}
                                />
                            </View>

                            <View style={inPageStyles.inputView}>
                                <Input
                                label="Address"
                                labelStyle = {inPageStyles.inputTitle}
                                placeholder='Your Contact address'
                                leftIcon={{ type: 'font-awesome', name: 'map-signs' }}
                                onChangeText={text => this.setState({address:text})}
                                value={this.state.address}
                                />
                            </View>

                            <View style={inPageStyles.inputView}>
                                <Button
                                mode="outlined"
                                onPress={() => this.submitOnClick()}
                                >
                                Save
                                </Button>
                                <Button
                                onPress={() => this.submitOnClick2()}
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
        AsyncStorage.setItem(VALUES.USER.NAME,this.state.name);
        AsyncStorage.setItem(VALUES.USER.ADDRESS,this.state.address);
        AsyncStorage.setItem(VALUES.USER.PHONE,this.state.phone);
        AsyncStorage.setItem(VALUES.USER.EMAIL,this.state.email);
        AsyncStorage.setItem("k","v");
    }
    submitOnClick2(){
        AsyncStorage.getItem(VALUES.USER.EMAIL,(err,result) =>{
                alert(result);
        });
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

