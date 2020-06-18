import React, { Component, isValidElement } from 'react';
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
    TextInput,
    StatusBar
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Popular } from '../ResData';
import { connect } from 'react-redux';

//import Entypo from 'react-native-vector-icons/Entypo';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
function renderSectionData(items) {
    let arr = [];
    items.forEach(function (item) {
        let tmp =
            <TouchableOpacity style={styles.sectionItemsBtn}>
                <Image style={styles.sectionImg}
                    source={{ uri: item.pics }}
                />
                <View style={styles.sectionInf}>
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>
                        {item.foodName}
                    </Text>
                    <Text style={{ fontSize: 12, color: 'lightgray' }}>
                        {item.resName}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', bottom: 2, width: '100%', position: 'absolute', }}>
                        <Text>
                            Rating : {item.rating}
                        </Text>
                        <Text style={{ fontWeight: 'bold' }}>
                            {item.price}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>

        arr.push(tmp);
    });
    return arr;


}


const Section = ({ title, items }) =>
    <View style={styles.sectionContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, paddingRight: 20 }}>
            <Text style={{ fontWeight: '700', fontSize: 17 }}>{title}</Text>
            <TouchableOpacity>
                <Text style={{ color: 'red' }}>View All</Text>
            </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {renderSectionData(items)}
        </ScrollView>
    </View>
class Favorite extends Component {
    constructor(props) {
        super(props);
        this.state = { items: Popular }
    }
    filter = (val) => {
        //const key = this.state.searchKey;
        if (val === '')
            this.setState({ item: Popular });
        //console.log(val);
        let arr = Popular.filter(item => {

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
            arr.push(<AntDesign name={'star'} size={22} style={{ color: 'orange' }} />)
        }
        return arr;
    }
    render() {
        const { navigation, setResData } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden />
                <View style={styles.header}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 40, marginTop: 20 }}>Quán yêu thích</Text>
                    <View style={styles.searchBar}>
                        <FontAwesome5 size={23} name={'search'} style={{ marginLeft: 5, marginTop: 8, color: 'lightgray' }} />
                        <TextInput placeholder='Tìm kiếm'
                            onChangeText={(val) => this.filter(val.toLowerCase())}
                            style={{
                                marginTop: 15,

                                height: 40,

                                color: 'black',
                                borderRadius: 5,
                                padding: 5,
                                flex: 1,
                            }} />
                    </View>
                </View>
                <FlatList
                    data={this.state.items}
                    style={styles.list}
                    keyExtractor={(item, idx) => idx}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            onPress={() => {
                                setResData(item.resName, item.rating, item.time, item.menu, item.address, item.pics),
                                    navigation.navigate('FoodDetails')
                            }}
                            style={styles.sectionItemsBtn}>
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
        height: 150,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 15,

    },
    list: {
        paddingRight: 20,
        width: screenWidth,
        //borderWidth: 1,
    },
    sectionItemsBtn: {
        flexDirection: 'row',
        width: '100%',
        height: screenHeight * 0.15,
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
    },
    searchBar: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',

        height: 40,
        borderRadius: 5,
        paddingBottom: 10,
    }
});
const mapDispatchToProps = (dispatch) => {
    return {
        setResData: (name, rating, time, menu, addr, pics) => dispatch({ type: 'SET_RESDATA', name, rating, time, menu, addr, pics })
    }
}
export default connect(null, mapDispatchToProps)(Favorite);