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
    TextInput,
    Modal,
    Alert,
    StatusBar

} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { connect } from 'react-redux';
import resDetails from '../redux/reducers/resDetails';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const data = {
    name: 'Mì Xào Trứng & Mì Ý',
    addr: '160/3 Võ Thị Sáu, P.8, Quận 3, TP.HCM',
    start: '15:00',
    end: '22:00',
    pics: 'https://www.foody.vn/ho-chi-minh/mi-xao-bo-trung-mi-y',
    rating: 5,

}
const alertUser = (clearCart, navigation) => Alert.alert('Rời khỏi nhà hàng', 'Nếu rời khỏi nhà hàng, các món bạn đã chọn sẽ bị xoá. Bạn có chắc chắn chưa ?', [
    { text: 'Vẫn ở lại', style: 'cancel', }, { text: 'Đồng ý', style: 'default', onPress: () => { clearCart(); navigation.pop() } }
])
const renderItems = (items, showModal) => {

    let arr = [];
    // console.log(items[0].name);
    arr = items.map(item =>
        <TouchableOpacity style={styles.foodBtn}
            onPress={() => {
                //console.log(item);
                let newItem = {
                    amount: 1,
                    infor: {
                        id: item.foodId,
                        name: item.name,
                        price: item.price
                    }
                }
                showModal(newItem)
            }}
        >
            <Image
                source={{ uri: item.pics }}
                style={styles.btnImg}
            />
            <Text style={{ marginVertical: 8, fontSize: 15, marginLeft: 10 }} >{item.name}</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 15, marginLeft: 10 }}>{item.price}</Text>
        </TouchableOpacity>
    )
    return arr;

}

const Header = ({ title, navigation, likeStatus, like, unlike, cartData, clearCart }) =>
    <View style={styles.header}>
        <TouchableOpacity onPress={() => {
            // clearCart();
            // navigation.pop();


            if (cartData.amount != 0)
                alertUser(clearCart, navigation);
            else
                navigation.pop();
        }}>
            <AntDesign name={'close'} size={25} color={'white'} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '600', color: 'white' }}>{title}</Text>
        <TouchableOpacity onPress={likeStatus === true ? () => { unlike() } : () => { like() }}>
            <MaterialIcons name={likeStatus === true ? 'favorite' : 'favorite-border'} size={25} color={'white'} />
        </TouchableOpacity>
    </View>

class ResDetails extends Component {
    constructor(props) {
        super(props);
        this.CartButton = this.CartButton.bind(this);

    }
    CartButton = (amount, navigation) => {
        if (amount !== 0) {
            return <TouchableOpacity style={styles.addToCartBtn}
                onPress={() => navigation.navigate('Order')}
            >
                <Text style={{ fontSize: 20, fontWeight: '700', color: 'white' }}>Giỏ hàng : {this.props.cartData.amount}</Text>
            </TouchableOpacity>

        }
        else
            return <View></View>
    }
    Rating = (value) => {
        let arr = [];
        for (let i = 1; i <= value; i++) {
            arr.push(<AntDesign name={'star'} size={25} style={{ color: 'orange' }} />)
        }
        return arr;
    }
    render() {
        const { resData, modalData, showModal, hideModal, navigation, like, likeHandle, unlikeHandle, increase, decrease, addToCartHandle, resMenu, clearCartData, cartData } = this.props;
        //const modalData = { name: 'Thit bo xao hanh', price: '50.000', currentAmount: 0, };
        //console.log('Resdetail: ', resData.name);
        return (

            <View style={styles.container} >
                <StatusBar hidden />
                <Header title={resData.name} navigation={navigation} likeStatus={like} like={likeHandle} unlike={unlikeHandle} clearCart={clearCartData} cartData={cartData} />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalData.resModalVisible}

                >
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            style={{ position: 'absolute', top: 10, left: 10 }}
                            onPress={() => { hideModal() }}

                        >
                            <AntDesign name={'close'} size={25} color={'black'} />
                        </TouchableOpacity>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{modalData.item.infor.name}</Text>
                            <Text >{modalData.item.infor.price}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.addToCartBtn}
                            onPress={() => {
                                addToCartHandle(modalData.item);
                                hideModal()
                            }}
                        >
                            <Text style={{ fontSize: 20, fontWeight: '700', color: 'white' }}>Thêm vào giỏ hàng</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', width: '80%', height: 100, marginTop: 30, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                            <TouchableOpacity
                                style={{ margin: 20, width: 50, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 25, backgroundColor: 'red' }}
                                onPress={() => { increase() }}
                                disabled={modalData.max === modalData.item.amount ? true : false}
                            >
                                <Text style={{ fontSize: 40, fontWeight: 'bold' }}>+</Text>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>{modalData.item.amount}</Text>
                            <TouchableOpacity
                                style={{ margin: 20, width: 50, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 25, backgroundColor: 'yellowgreen' }}
                                onPress={() => { decrease() }}
                                disabled={modalData.min === modalData.item.amount ? true : false}
                            >
                                <Text style={{ fontSize: 40, fontWeight: 'bold' }}>-</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </Modal>

                <ScrollView>
                    <View style={styles.mainView}>
                        <Image
                            style={styles.avatarImg}
                            source={{ uri: resData.pics }}
                        />
                        <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 5 }}>{resData.name}</Text>
                        <Text style={{ padding: 5 }}>{resData.addr}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            {this.Rating(resData.rating)}
                        </View>
                        <Text style={{ fontWeight: 'bold', padding: 5 }}>Giờ làm việc : {resData.time} </Text>


                        <View style={{ width: screenWidth, height: 1, backgroundColor: 'lightgray', marginVertical: 10 }}></View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 5 }}>Menu</Text>
                        <View style={styles.mainMenu}>
                            {renderItems(resMenu, showModal)}

                        </View>
                    </View>
                </ScrollView>

                {this.CartButton(this.props.cartData.amount, navigation)}

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        width: screenWidth,
        height: screenHeight * 0.12,
        backgroundColor: '#ed185f',
        flexDirection: 'row',
        padding: 10,
        paddingTop: 50,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    mainView: {
        flex: 1,

    },
    avatarImg: {
        width: screenWidth,
        height: 149,
        resizeMode: 'center',
    },
    popularView: {
        flexDirection: 'row',
        width: screenWidth,
        padding: 5,
        //flexDirection: 'column',
        flexWrap: 'wrap',

        justifyContent: 'space-around'

    },
    mainMenu: {
        width: screenWidth,
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    foodBtn: {
        margin: 10,

        width: screenWidth * 0.4,
        height: screenWidth * 0.5,
        //borderRadius: 5,
        backgroundColor: 'white',
        shadowRadius: 2,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 0 },
        //borderWidth: 1,
    },
    btnImg: {
        width: '100%',
        height: '70%',
        resizeMode: 'center',
        borderRadius: 5,

    },
    modalView: {
        position: 'absolute',
        bottom: 0,
        borderRadius: 20,
        backgroundColor: 'white',
        padding: 10,
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        width: screenWidth,
        height: screenHeight * 0.8,

        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    addToCartBtn: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 40,
        width: '95%',
        height: 50,
        backgroundColor: '#ed185f',
        color: 'white',
        borderRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        shadowColor: "#000",
    }

})
const mapStateToProps = (state) => {
    return {
        resMenu: state.resDetails.menu,
        cartData: state.resDetails.cart,
        like: state.resDetails.like,
        modalData: state.modal,
        resData: state.resDetails
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        showModal: (data) => dispatch({ type: 'SHOW_MODAL', item: data, flag: 2 }),
        hideModal: () => dispatch({ type: 'HIDE_MODAL', flag: 2 }),
        likeHandle: () => dispatch({ type: 'LIKE' }),
        unlikeHandle: () => dispatch({ type: 'UNLIKE' }),
        increase: () => dispatch({ type: 'INCREASE' }),
        decrease: () => dispatch({ type: 'DECREASE' }),
        addToCartHandle: (item) => dispatch({ type: 'ADD_ITEM', item: item }),
        clearCartData: () => dispatch({ type: 'CLEAR_CART_DATA' }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResDetails);
//export default resDetails;