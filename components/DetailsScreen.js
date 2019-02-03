import React, { PureComponent } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, Dimensions, Platform, ImageBackground } from "react-native";
import { dateAndMonthName } from "../utility/utils"

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;



class Detail extends PureComponent {

    static navigationOptions = {
        headerTransparent: true,
        headerTintColor: "#fff"
    };


    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            _data: {}
        }
    }


    componentWillMount() {

        const data = this.props.navigation.getParam('data', '');
        console.log('data', data);

        this.setState({
            _data: data,
        });

    }


    componentDidMount() {
        this.setState({
            isLoading: false,
        });

    }

    render() {

        //................Loading Bar.........
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>

                    <ImageBackground source={{ uri: this.state._data.url }} style={styles.item}>
                        <View style={styles.sub} >
                            <Text style={styles.title}>{this.state._data.title} </Text>
                            <Text style={styles.date}>{dateAndMonthName(this.state._data.date)} </Text>
                        </View>
                        <View >
                            <Text style={styles.explanation}>{this.state._data.explanation} </Text>
                        </View>
                    </ImageBackground>
                </View>
            );
        }
    }



}

export default Detail;

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    item: {
        width: width,
        height: height,
        justifyContent: "flex-end"
    },
    title: {
        color: "#fff",
        fontSize: 17,
        fontWeight: 'bold',
        margin: 16
    },
    date: {
        alignItems: "flex-end",
        color: "#fff",
        fontSize: 17,
        fontWeight: 'bold',
        margin: 16
    },
    explanation: {
        fontSize: 15,
        color: "#fff",
        margin: 16
    },
    sub: {
        flexDirection: "row",
        justifyContent: "space-between"
    }


});