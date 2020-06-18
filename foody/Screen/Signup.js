import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    TextInput,
    StyleSheet,
    ImageBackground,
    Alert

} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            pass: '',
            pass2: '',

        }
    }
    checkAccount = (navigation, signup) => {
        if (this.state.email.indexOf('@gmail.com') === -1 || this.state.firstName === '' || this.state.lastName === '' || this.state.pass !== this.state.pass2)
            Alert.alert('Tài khoản không hợp lệ', 'Kiểm tra lại thông tin tài khoản', [{ text: 'Đồng ý', style: 'default' }])
        else {
            Alert.alert('Hoàn tất', 'Đăng ký tài khoản thành công', [{ text: 'Trở về màn hình đăng nhập', style: 'default', onPress: () => navigation.pop() }])
            signup(this.state.email, this.state.pass, this.state.firstName, this.state.lastName);
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../Pics/login2.jpg')} style={styles.background}>
                    <View style={styles.topView}>
                        <Text style={styles.welcome}>Sign up</Text>


                        <TextInput
                            onChangeText={(value) => this.setState({ firstName: value })}
                            style={styles.firstName} placeholderTextColor='lightgray' placeholder='First name' keyboardType='email-address' />
                        <TextInput
                            onChangeText={(value) => this.setState({ lastName: value })}
                            style={styles.lastName} placeholderTextColor='lightgray' placeholder='Last name' />
                        <TextInput
                            onChangeText={(value) => this.setState({ email: value })}
                            style={styles.accInf} placeholderTextColor='lightgray' placeholder='Email' keyboardType='email-address' />
                        <TextInput
                            onChangeText={(value) => this.setState({ pass: value })}
                            style={styles.passW} placeholderTextColor='lightgray' secureTextEntry={true} placeholder='Password' />
                        <TextInput

                            onChangeText={(value) => this.setState({ pass2: value })}
                            style={styles.confirmPassW} placeholderTextColor='lightgray' secureTextEntry={true} placeholder='Confirm password' />
                    </View>
                    <View style={styles.bottomView}>
                        <TouchableOpacity
                            onPress={() => this.checkAccount(this.props.navigation, this.props.signup)}

                            style={styles.signupBtn} activeOpacity={0.7} >
                            <Text style={styles.btnText}>Sign up</Text>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                            <Ionicons name={'ios-arrow-dropleft'} color={'white'} size={30}></Ionicons>
                        </TouchableOpacity>
                    </View>

                </ImageBackground>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'rgba(255, 249, 192, 0.7)',
        backgroundColor: 'black',
    },
    background: {
        flex: 1,
        //opacity: 0.7,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    topView: {
        flex: 5,
        paddingBottom: 50,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 80,
        // borderWidth: 1,
        // borderColor: 'white',
    },
    bottomView: {
        flex: 2,
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'white',
    },
    welcome: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white'
    },
    loginTo: {
        color: 'white',
        fontWeight: '500',
        fontSize: 20,

    },

    firstName: {
        position: 'absolute',
        bottom: 340,
        left: 30,
        height: 40,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#cfd1d0',
        color: 'white',
        fontWeight: '400',
        fontSize: 18,
    },
    lastName: {
        position: 'absolute',
        bottom: 260,
        left: 30,
        height: 40,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#cfd1d0',
        color: 'white',
        fontWeight: '300',
        fontSize: 18,
    },
    accInf: {
        position: 'absolute',
        bottom: 180,
        left: 30,
        height: 40,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#cfd1d0',
        color: 'white',
        fontWeight: '400',
        fontSize: 18,
    },
    passW: {
        marginTop: 10,
        position: 'absolute',
        bottom: 100,

        left: 30,
        height: 40,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#cfd1d0',
        color: 'white',
        fontWeight: '400',
        fontSize: 18,

    },
    confirmPassW: {
        marginTop: 10,
        position: 'absolute',
        bottom: 20,
        left: 30,
        height: 40,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#cfd1d0',
        color: 'white',
        fontWeight: '400',
        fontSize: 18,
    },
    signupBtn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: '#eb4a2a',
        //opacity: 1,
    },
    loginBtn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: '#3458eb',


    },
    btnText: {
        fontWeight: '600',
        fontSize: 19,
        color: 'white'
    }
});
const mapDispatchToProps = (dispatch) => ({
    signup: (email, pass, firstName, lastName) => dispatch({ type: 'SIGN_UP', email, pass, firstName, lastName })
})
export default connect(null, mapDispatchToProps)(Signup);