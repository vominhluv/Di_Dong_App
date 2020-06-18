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

import { Popular, Trending, Family, FreeShip } from '../ResData';
import { connect } from 'react-redux';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


function renderItem(data) {
    let a = [];
    a.push(<Image
        style={styles.slideImg}
        source={require('../Pics/img1.jpg')}
    />)
    a.push(<Image
        style={styles.slideImg}
        source={require('../Pics/img2.jpg')}
    />)
    a.push(<Image
        style={styles.slideImg}
        source={require('../Pics/img3.jpg')}
    />)
    a.push(<Image
        style={styles.slideImg}
        source={require('../Pics/img4.jpeg')}
    />)
    return a;
}
function renderSectionData(items, navigation, setData) {
    let arr = [];
    items.forEach(function (item) {
        let tmp =
            <TouchableOpacity style={styles.sectionItemsBtn}
                onPress={() => {
                    setData(item.resName, item.rating, item.time, item.menu, item.address, item.pics),
                        navigation.navigate('FoodDetails')
                }}
            >
                <Image style={styles.sectionImg}
                    source={{ uri: item.pics }}
                />
                <View style={styles.sectionInf}>
                    <Text style={{ fontSize: 15, fontWeight: '700' }}>
                        {item.resName}
                    </Text>

                </View>
            </TouchableOpacity>

        arr.push(tmp);
    });
    return arr;


}

const Section = ({ title, items, navigation, setData }) =>
    <View style={styles.sectionContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, paddingRight: 20 }}>
            <Text style={{ fontWeight: '700', fontSize: 17 }}>{title}</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {renderSectionData(items, navigation, setData)}
        </ScrollView>
    </View>
class Home extends Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.unFocusTextInput = this.unFocusTextInput.bind(this);

    }
    unFocusTextInput() {
        this.textInput.current.blur();

    }

    render() {
        const { setResData } = this.props;
        return (
            <View style={{ flex: 1 }}>

                <View style={styles.header}>
                    <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white', marginTop: 20 }}>Khám phá</Text>
                    <TextInput placeholder='Tìm kiếm'
                        style={{
                            marginTop: 10,
                            width: '100%',
                            height: 40,
                            backgroundColor: 'white',
                            color: 'black',
                            borderRadius: 5,
                            padding: 5,
                        }}
                        ref={this.textInput}
                        onFocus={() => {
                            this.props.navigation.navigate('Search', this.unFocusTextInput())
                        }}
                    />

                </View>
                <ScrollView style={{ padding: 5 }}>
                    <View style={styles.welcomeSectionView}>
                        <ScrollView
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator
                        >
                            {renderItem()}
                        </ScrollView>
                    </View>
                    <View style={styles.sectionView}>
                        <Section title='Xu hướng' items={Trending} navigation={this.props.navigation} setData={setResData} />
                    </View>
                    <View style={styles.sectionView}>
                        <Section title='Phổ biến' items={Popular} navigation={this.props.navigation} setData={setResData} />
                    </View>
                    <View style={styles.sectionView}>
                        <Section title='Miễn phí vận chuyển' items={FreeShip} navigation={this.props.navigation} setData={setResData} />
                    </View>
                    <View style={styles.sectionView}>
                        <Section title='Dành cho gia đình' items={Family} navigation={this.props.navigation} setData={setResData} />
                    </View>

                </ScrollView>
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
    scrollV: {
        //flex: 7,
    },
    welcomeSectionView: {
        width: '100%',
        height: 200,

    },
    containSlideImg: {
        flex: 1,
    },
    slideImg: {
        //flex: 1,
        width: screenWidth,
        height: 200,
        resizeMode: 'stretch',
    },
    sectionItemsBtn: {
        flex: 1,
        flexDirection: 'column',
        width: screenWidth * 0.5,
        margin: 10,
        marginBottom: 40,
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
        flex: 3,
        width: null,
        height: null,
        resizeMode: 'stretch'

    },
    sectionInf: {
        flex: 1,
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
export default connect(null, mapDispatchToProps)(Home);