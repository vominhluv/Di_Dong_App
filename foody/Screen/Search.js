import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    FlatList,
    Image,
    TouchableHighlight,
    Dimensions,
    TextInput

} from 'react-native';
import { CommonActions, StackActions } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';

import { res } from '../ResData';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { items: res }
    }
    filter = (val) => {
        //const key = this.state.searchKey;
        if (val === '')
            this.setState({ item: res });
        //console.log(val);
        let arr = res.filter(item => {

            if (item.resName.toLowerCase().indexOf(val) !== -1)
                return item;
            // for (const key of item) {
            //     if (item[key].name.indexOf(key) !== -1)
            //         return item;
            // }
            //console.log(item.resName);
        });
        this.setState({ items: arr });


    }
    Rating = (value) => {
        let arr = [];
        for (let i = 1; i <= value; i++) {
            arr.push(<AntDesign name={'star'} size={20} style={{ color: 'orange' }} />)
        }
        return arr;
    }
    render() {
        const { navigation, setResData } = this.props;
        return (
            <View>
                <View style={styles.header}>
                    <TouchableOpacity style={{ marginRight: 10 }}
                        onPress={() => this.props.navigation.pop()}

                    >
                        <MaterialIcons name={'keyboard-arrow-left'} size={40} color='white' />
                    </TouchableOpacity>
                    <TextInput placeholder='Tìm kiếm'
                        onChangeText={(value) => {

                            this.filter(value.toLowerCase())

                        }
                        }
                        style={{
                            width: screenWidth * 0.8,
                            height: 40,
                            backgroundColor: 'white',
                            color: 'black',
                            borderRadius: 5,
                            padding: 5,
                        }} />
                </View>
                <FlatList
                    data={this.state.items}
                    style={styles.list}
                    keyExtractor={(item, idx) => idx}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={styles.sectionItemsBtn}
                            onPress={() => {
                                setResData(item.resName, item.rating, item.time, item.menu, item.address, item.pics),
                                    navigation.navigate('FoodDetails')
                            }}

                        >
                            <Image style={styles.sectionImg}
                                source={{ uri: item.pics }}
                            />
                            <View style={styles.sectionInf}>
                                <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 5 }}>
                                    {item.resName}
                                </Text>
                                <Text style={{ fontSize: 12, color: 'lightgray', marginBottom: 5 }}>
                                    {item.address}
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    {this.Rating(item.rating)}
                                </View>

                                <Text style={{ fontWeight: 'bold' }}>
                                    {item.menu[0].price}
                                </Text>

                            </View>
                        </TouchableOpacity>}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        //flex: 1,
        backgroundColor: '#ed185f',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 10,
        paddingLeft: 0,

    },
    list: {
        paddingRight: 20,
        width: screenWidth,
        //borderWidth: 1,
    },
    sectionItemsBtn: {
        flexDirection: 'row',
        width: '100%',
        height: screenHeight * 0.18,
        margin: 10,
        marginBottom: 10,
        padding: 10,
        //borderWidth: 2,
        //borderColor: 'black',
        backgroundColor: 'white',
        borderRadius: 5,
        shadowRadius: 2,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 0 },


    },
    sectionView: {
        width: screenWidth,
        height: screenHeight * 0.3,
    },
    sectionContainer: {

        flex: 1,
    },
    sectionImg: {
        flex: 2,
        width: null,
        height: null,
        resizeMode: 'cover',
        //borderWidth: 1,

    },
    sectionInf: {
        flexDirection: 'column',
        flex: 4,
        padding: 5,
        //borderWidth: 1,
        //borderColor: 'black',
    }
});
const mapDispatchToProps = (dispatch) => {
    return {
        setResData: (name, rating, time, menu, addr, pics) => dispatch({ type: 'SET_RESDATA', name, rating, time, menu, addr, pics })
    }
}
export default connect(null, mapDispatchToProps)(Search);