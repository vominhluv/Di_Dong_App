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
    TextInput

} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//import Entypo from 'react-native-vector-icons/Entypo';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const day = new Date(2018, 11, 24, 10, 32);

const data = [
    {
        id: 1,

        time: day.toString(),
        resID: 1,
        cartData: {
            total: 0,
            amount: 0,
            items: []
        }
    },
    {
        id: 2,
        time: day.toString(),
        cartData: {
            total: 0,
            amount: 0,
            items: []
        }
    }
]


function renderSectionData(items) {
    let arr = [];
    items.forEach(function (item) {
        let tmp =
            <TouchableOpacity style={styles.sectionItemsBtn}>
                <Image style={styles.sectionImg}
                    source={require('../Pics/home1.jpg')}
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
const Header = () =>
    <View style={styles.header}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 40, }}>History</Text>
        <View style={styles.searchBar}>
            <FontAwesome5 size={23} name={'search'} style={{ marginLeft: 5, marginTop: 8, color: 'lightgray' }} />
            <TextInput placeholder='Place, food , ect.'
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
class History extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header />
                <FlatList
                    data={data}
                    style={styles.list}
                    keyExtractor={(item, idx) => idx}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={styles.sectionItemsBtn}>

                            <View style={styles.sectionInf}>

                                <Text style={{ fontSize: 12, color: 'lightgray', marginBottom: 5 }}>
                                    {item.time}
                                </Text>
                                <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 5 }}>
                                    {item.cartData.total}
                                </Text>


                                <Text style={{ marginBottom: 5 }}>
                                    Rating : {item.cartData.amount}
                                </Text>
                                <Text style={{ fontWeight: 'bold' }}>
                                    aaaaa
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
export default History;