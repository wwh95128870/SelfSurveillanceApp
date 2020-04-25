import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import { styles } from './AppStyle'
import { FontAwesome5 } from '@expo/vector-icons'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet } from 'react-native'
import * as WebBrowser from 'expo-web-browser';


export default class NewsScreen extends React.Component {

    state = {
        payload: "default",
        newsArray: null
    };

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this._fetchNews();
    }

    onSelect = data => {
        this.setState(data);
    };


    render() {
        var newArray = [];
        if (this.state.newsArray != null) {
            newArray = this.state.newsArray.map((item, key) => {
                return (
                    <Card key={key} style={inpageStyles.card} elevation={5} onPress={() => {
                        WebBrowser.openBrowserAsync(item.url).catch();
                    }}>
                        <Card.Cover source={{ uri: item.img }} />
                        <Card.Content>
                            <Title>{item.title}</Title>
                            <Paragraph>{item.content}</Paragraph>
                        </Card.Content>
                    </Card>
                );
            });
        }




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
                    <ScrollView style={inpageStyles.ScrollView}>

                        <View style={styles.screen}>
                        <Title style={styles.title}>News</Title>
                            {/* <Card style={inpageStyles.card} elevation={5}>
                                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                                <Card.Content>
                                    <Title>Card title</Title>
                                    <Paragraph>Card content</Paragraph>
                                </Card.Content>
                                <Card.Actions>
                                <Button>Cancel</Button>
                                <Button>Ok</Button>
                            </Card.Actions>
                            </Card> */}

                            {
                                newArray
                            }
                        </View>

                        <Button onPress={()=>{this.render()}}>Refresh</Button>

                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }



    _fetchNews() {
        //http://192.168.0.100:8080/api/news.json
        //http://awari.algebragame.app/IBM/DashBoard/news/news.json
        fetch('http://awari.algebragame.app/IBM/DashBoard/news/news.json', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

        })
            .then(response => response.json())
            .then(res => {
                this.setState({ newsArray: res })
                console.log(JSON.stringify(res));

            })
            .catch(err => {
                console.log(err)
            })
    }

}


const inpageStyles = StyleSheet.create({
    card: {
        width: "90%",
        maxWidth: 600,
        marginTop: 5,
        marginBottom:20
    },
    Cover: {
        alignContent: "center",
        alignItems: "center",

    },
    ScrollView: {
        paddingBottom: 40,
    }
});