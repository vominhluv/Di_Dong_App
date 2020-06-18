import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    TextInput,
    Image,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'react-redux';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class UserProfile extends Component {
    render() {
        const { signOut, userData, navigation } = this.props;
        console.log(userData);
        return (
            <View style={styles.container}>
                <View style={styles.layer}></View>
                <View style={styles.header}>
                    <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>Hồ sơ</Text>

                </View>

                <View style={styles.userInf}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={require('../Pics/home1.jpg')}
                            style={styles.avatar}
                        />
                        <View style={{ flexDirection: 'column', marginLeft: 10, marginTop: 25, }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{userData.firstName} {userData.lastName}</Text>
                            <Text style={{ color: '#DAD9E2', marginTop: 5 }}>{userData.email}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#DAD9E2', width: '100%', height: 1, marginVertical: 10, }}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>Điểm của bạn</Text>
                        <Text style={{ fontSize: 20, fontWeight: '600', color: '#FF9500' }}>{0}</Text>
                    </View>
                </View>
                <View style={styles.controlView}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>Tuỳ chỉnh hồ sơ</Text>
                        <SimpleLineIcons name={'pencil'} size={30} />
                    </TouchableOpacity>

                    <View style={{ backgroundColor: '#DAD9E2', width: '100%', height: 1, marginVertical: 10, }}></View>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>Cài đặt</Text>
                        <Feather name={'settings'} size={30} style={{}} />
                    </TouchableOpacity>
                    <View style={{ backgroundColor: '#DAD9E2', width: '100%', height: 1, marginVertical: 10, }}></View>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>Thông tin app</Text>
                        <MaterialCommunityIcons name={'information-outline'} size={30} />
                    </TouchableOpacity>
                    <View style={{ backgroundColor: '#DAD9E2', width: '100%', height: 1, marginVertical: 10, }}></View>
                    <TouchableOpacity
                        onPress={() => {
                            signOut(),
                                navigation.pop();
                        }}

                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>Đăng xuất</Text>
                        <MaterialCommunityIcons name={'logout'} size={30} />
                    </TouchableOpacity>
                </View>

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
        backgroundColor: 'white',
        borderRadius: 5,
        shadowOffset: {
            width: 0, height: 0
        },
        shadowColor: 'black',
        shadowRadius: 5,
        shadowOpacity: 0.5,
    }



});
const mapStateToProps = state => {
    return {
        userData: state.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch({ type: 'LOG_OUT' }),
    }
}
// export default connect()(UserProfile);
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile); 