import React from 'react';
import {View,Text,SafeAreaView,TouchableOpacity} from 'react-native'
import {styles} from './AppStyle'
import {FontAwesome5} from '@expo/vector-icons'
import {  Button } from 'react-native-paper';




export default class WifiScreen extends React.Component{

    state = {
        payload:"default"
    };

    onSelect = data => {
        this.setState(data);
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
                <Text>Title</Text>
                <Button
                    onPress={
                        () => myFunction()
                    }
                >
                    Click
                </Button>
                </View>
                </SafeAreaView>
            </View>
        )
    }

    myFunction(){
        alert();
    }

}


