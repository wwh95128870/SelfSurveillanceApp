import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import { styles } from './AppStyle'
import { FontAwesome5 } from '@expo/vector-icons'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet } from 'react-native'


export default class NewsScreen extends React.Component {

    state = {
        payload: "default",
        newsArray: null
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this._fetchNews()
    }

    onSelect = data => {
        this.setState(data);
    };


    render() {
        var newArray = [];
        if (this.state.newsArray != null) {
            newArray = this.state.newsArray.map((item, key) => {
                return (
                    <Card key={key} style={inpageStyles.card} elevation={5} onPress={()=>{
                        alert(item.url);
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
                    <ScrollView >
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
                                {/* <Card.Actions>
                                <Button>Cancel</Button>
                                <Button>Ok</Button>
                            </Card.Actions> */}
                            </Card>

                            {
                                newArray
                            }
                        </View>



                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }

    myFunction() {
        alert();
    }

    cards() {
        var id = 0;
        for (let cardinfo of this.state.newsArray) {
            console.log(id + ":" + JSON.stringify(cardinfo));
            this.generateCard(cardinfo);
        }
    }

    generateCard(cardinfo) {
        return (
            <Card style={inpageStyles.card} elevation={5}>
                <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
                <Card.Content>
                    <Title>cardinfo.title</Title>
                    <Paragraph>cardinfo.content</Paragraph>
                </Card.Content>
                {/* <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
            </Card.Actions> */}
            </Card>
        )
    }


    _fetchNews() {
        fetch('http://192.168.0.100:8080/api/news.json', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

        })
            .then(response => response.json())
            .then(res => {
                this.setState({ newsArray: res })
                alert(JSON.stringify(this.state.newsArray));
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
        marginTop: 20
    },
    Cover: {
        alignContent: "center",
        alignItems: "center",

    }
});