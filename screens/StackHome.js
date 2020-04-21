import React from 'react';
import {View,Text,SafeAreaView,TouchableOpacity} from 'react-native'
import {styles} from './AppStyle'
import {FontAwesome5} from '@expo/vector-icons'
import {  Button } from 'react-native-paper';
import TestStackScreen from './TestStackScreen'



export default class StackHome extends React.Component{

    state = {

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
                        <Text style={styles.appHeader}> </Text>
                        <Text style={styles.appHeader}> </Text>
                    </TouchableOpacity>
                <View style={styles.screen}>
                <Text>hi</Text>
                <Button
                    onPress={
                        () => this.props.navigation.navigate('TestStackScreen',{
                            payload:"{'key':'value'}"
                        })
                    }
                >
                    Click234
                </Button>
                </View>
                </SafeAreaView>
            </View>
        )
    }


}


