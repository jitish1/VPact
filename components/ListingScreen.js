import React, { PureComponent } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, FlatList, Dimensions, TouchableOpacity } from "react-native";
import { currentdate, convertStringtoDate, dateAndMonthName } from "../utility/utils"
import { fetchService,  fetchMore } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const numColumns = 2;
const size = Dimensions.get('window').width / numColumns * 0.98;
const margin = Dimensions.get('window').width / numColumns * 0.01;

const mapStateToProps = state => {
    return {
        _data: state.apodreducer.apodData,
        isLoading: state.apodreducer.isLoading,
        isLoadMore: state.apodreducer.isLoadMore,
        error: state.apodreducer.errMess,
        startDate: state.apodreducer.startDate,
        endDate: state.apodreducer.endDate,
    }
}

class Listing extends PureComponent {

    static navigationOptions = {
        title: 'APOD',
    };

    constructor(props) {
        super(props);
        this.fetchMore = this._fetchMore.bind(this);
        this.renderMenuItem = this._renderMenuItem.bind(this);
        this.state = {
            endDate: { endDate: null },
            startDate: { startDate: null },
            isfirsttimehit: true
        }
    }

    //Scroll
    _fetchMore() {
        this.props.dispatch(fetchMore(this.props.startDate, this.props.endDate));
    }

    /////............Grid Item View ................

    _keyExtractor(item) {
        return item.title;
    }

    _renderMenuItem = ({ item }) => (
        <View  >
            <View >
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('Details', { data: item })
                }} >
                    <Image source={{ uri: item.url }} style={styles.item} />
                    <View style={styles.title}>
                        <Text style={{ color: "#fff", fontWeight: 'bold', fontSize: 13, }}>{item.title} </Text>
                    </View>
                    <View style={styles.date}>
                        <Text style={{ color: "#fff", fontWeight: 'bold' }}>{dateAndMonthName(item.date)} </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );

    componentDidMount() {

        if (this.state.isfirsttimehit) {
            this.state.endDate = convertStringtoDate(currentdate(), 1);
            this.state.isfirsttimehit = false;
            this.state.startDate = convertStringtoDate(this.state.endDate, 9);
        }

        if (this.props._data.length == 0) {
            this.props.dispatch(fetchService(this.state.startDate, this.state.endDate));
        }
    }


    render() {

        //................Loading Bar.........
        if (this.props.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" />
                </View>
            )
        } else {
            return (
                <View style={styles.itemContainer}>
                    <FlatList
                        removeClippedSubviews={true}
                        horizontal={false}
                        numColumns={numColumns}
                        data={this.props._data || []}
                        initialNumToRender={8}
                        renderItem={this._renderMenuItem}
                        keyExtractor={this._keyExtractor}
                        onEndReached={() => this._fetchMore()}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={() => {
                            return (
                                this.props.isLoadMore &&
                                <View style={{ flex: 1 }}>
                                    <ActivityIndicator size="large" />
                                </View>
                            );
                        }}
                    />
                </View>
            );
        }
    }

}

Listing.propTypes = {
    tracks: PropTypes.array,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string
};

export default connect(mapStateToProps)(Listing);

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center'
    },
    itemContainer: {
        margin: 5,
    },
    item: {
        width: size,
        height: size,
        margin: margin,
    },
    title: {
        position: 'absolute',
        bottom: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
        top: 0,
        left: 0,
        right: 0,
    },
    date: {
        position: 'absolute',
        top: 10,
        left: 0,
        right: 10,
        bottom: 0,
        alignItems: 'flex-end'
    }
});