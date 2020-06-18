import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    Modal,
    Alert, StatusBar
} from 'react-native';

import { connect } from 'react-redux';

import AntDesign from 'react-native-vector-icons/AntDesign';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const separate = () => <View style={{ width: '100%', height: 1, backgroundColor: 'lightgray', marginVertical: 5 }}></View>

class Order extends Component {
    render() {

        const { clearCartData, navigation, cartData, showModal, hideModal, modalData, increase, decrease, updateFood } = this.props;
        // console.log(cartData);
        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <View style={styles.layer}></View>
                <View style={styles.header}>
                    <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>Đặt hàng</Text>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                    >
                        <Text style={{ color: 'white', fontSize: 18 }}>Close</Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalData.orderModalVisible}

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
                                updateFood(modalData.item);
                                hideModal()
                            }}
                        >
                            <Text style={{ fontSize: 20, fontWeight: '700', color: 'white' }}>Cập nhật</Text>
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


                <View style={styles.userInf}>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                            <Text style={{ fontSize: 20, fontWeight: '600' }}>Tổng cộng</Text>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: '#FF9500' }}>{cartData.total} đ</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                            <Text style={{ fontSize: 20, fontWeight: '600' }}>Phí khác</Text>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: '#FF9500' }}>{2} đ</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }}>
                            <Text style={{ fontSize: 20, fontWeight: '600' }}>Phí vận chuyển</Text>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: '#FF9500' }}>Free</Text>
                        </View>
                        <Text style={{ color: '#DAD9E2' }}></Text>
                    </View>
                    <View style={{ backgroundColor: '#DAD9E2', width: '100%', height: 1, marginBottom: 10, }}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>Tổng cộng</Text>
                        <Text style={{ fontSize: 20, fontWeight: '600', color: '#FF9500' }}>{cartData.total + 2} đ</Text>
                    </View>
                </View>
                <View style={styles.controlView}>
                    <FlatList
                        data={cartData.items}
                        //keyExtractor={(item) => item.infor.id.toString()}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onPress={() => showModal(item)}
                                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 20, fontWeight: '600' }}>{item.infor.name} x{item.amount}</Text>
                                <Text style={{ fontSize: 20, fontWeight: '600', color: '#FF9500' }}>{item.amount * item.infor.price}</Text>
                            </TouchableOpacity>
                        }
                        ItemSeparatorComponent={separate}
                    />







                </View>
                <TouchableOpacity
                    onPress={() => Alert.alert('Hoàn tất', 'Thanh toán thành công, đơn hàng sẽ được giao tới sau vài tiếng', [{ text: 'Trở về màn hình chính', style: 'default', onPress: () => { clearCartData(), navigation.popToTop() } }])}
                    style={styles.checkoutBtn}>
                    <Text style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>Thanh toán</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    layer: {
        backgroundColor: '#f52d56',
        width: screenWidth,
        height: 150,
        position: 'absolute',
        top: 0,
        //bottom: screenHeight * 0.75,
    },
    header: {
        marginTop: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    userInf: {
        flexDirection: 'column',
        marginTop: 20,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowOffset: {
            width: 0, height: 0
        },
        shadowColor: 'black',
        shadowRadius: 5,
        shadowOpacity: 0.5,

    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        resizeMode: 'center',
    },
    controlView: {
        flexDirection: 'column',

        marginTop: 20,
        padding: 10,
        height: screenHeight * 0.4,
        //borderWidth: 2,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowOffset: {
            width: 0, height: 0
        },
        shadowColor: 'black',
        shadowRadius: 5,
        shadowOpacity: 0.5,
    },
    checkoutBtn: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 60,
        backgroundColor: '#f52d56',
        borderRadius: 5,
        shadowOffset: {
            width: 0, height: 0
        },
        shadowColor: 'black',
        shadowRadius: 5,
        shadowOpacity: 0.5,
        //borderWidth: 2,

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



});
const mapStateToProps = (state) => {
    return {
        resMenu: state.resDetails.menu,
        cartData: state.resDetails.cart,
        like: state.resDetails.like,
        modalData: state.modal,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        showModal: (data) => dispatch({ type: 'SHOW_MODAL', item: data, flag: 1 }),
        hideModal: () => dispatch({ type: 'HIDE_MODAL', flag: 1 }),
        likeHandle: () => dispatch({ type: 'LIKE' }),
        unlikeHandle: () => dispatch({ type: 'UNLIKE' }),
        increase: () => dispatch({ type: 'INCREASE' }),
        decrease: () => dispatch({ type: 'DECREASE' }),
        addToCartHandle: (item) => dispatch({ type: 'ADD_ITEM', item: item }),
        updateFood: (item) => dispatch({ type: 'UPDATE_FOOD', item: item }),
        clearCartData: () => dispatch({ type: 'CLEAR_CART_DATA' }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Order)