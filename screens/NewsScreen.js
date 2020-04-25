import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { styles } from './AppStyle'
import { FontAwesome5 } from '@expo/vector-icons'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {StyleSheet} from 'react-native'



export default class NewsScreen extends React.Component {

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
                    <View style={styles.screen}>

                        <Card style={inpageStyles.card} elevation={5}>
                            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                            <Card.Content>
                                <Title>Card title</Title>
                                <Paragraph>Card content</Paragraph>
                            </Card.Content>
                            <Card.Actions>
                                <Button>Cancel</Button>
                                <Button>Ok</Button>
                            </Card.Actions>
                        </Card>

                    </View>




                </SafeAreaView>
            </View>
        )
    }

    myFunction() {
        alert();
    }

}


const inpageStyles = StyleSheet.create({
    card:{
        width: "60%",
        height: "30%", /* 4:3 Aspect Ratio */
        backgroundColor: "red",
    },
    Cover:{
        alignContent:"center",
        alignItems:"center",

    }
});