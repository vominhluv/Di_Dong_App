import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ImageBackground,
    Alert,
    StatusBar
} from 'react-native';
import { firebaseApp } from '../redux/firebaseConfig';
import { connect } from 'react-redux';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', pass: '' };

    }
    // updateUsers = () => {
    //     firebaseApp.database().ref('users').once('value', (snap) => {
    //         console.log(snap.val());
    //     })
    // }
    componentDidMount() {

        firebaseApp.database().ref('users').once('value')
            .then(data => {
                this.props.setUserList(data.val());
            })


        return true;
    }
    check = (userList = {}, navigation) => {
        if (this.state.email === '' || this.state.pass === '') {
            Alert.alert('Lỗi đăng nhập', 'Vui lòng nhập đầy đủ thông tin', [{ text: 'Đồng ý', style: 'cancel' }])
            return;
        }
        if (this.state.email.indexOf('@gmail.com') === -1) {

            Alert.alert('Lỗi đăng nhập', 'Vui lòng nhập đúng email', [{ text: 'Đồng ý', style: 'cancel' }])
            return;
        }
        if (userList['Admin'] === undefined) {
            Alert.alert('LỖI ĐĂNG NHẬP', 'Kiểm tra kết nối mạng hoặc đợi trong giây lát')
        } else {
            for (const key in userList) {
                if (userList[key].email === this.state.email) {
                    if (userList[key].pass === this.state.pass) {

                        let fn = userList[key].firstName;
                        let ln = userList[key].lastName;
                        this.props.login(this.state.email, this.state.pass, [], [], fn, ln);
                        navigation.navigate('allTab');
                        return;
                    }

                }


            }

            Alert.alert('Lỗi đăng nhập', 'Sai tài khoản hoặc mật khẩu', [{ text: 'Đồng ý', style: 'cancel' }])

        }


    }
    render() {

        const { navigation, setUserList, userList } = this.props;
        //console.log(userList);
        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <ImageBackground source={require('../Pics/login2.jpg')} style={styles.background}>
                    <View style={styles.topView}>
                        <Text style={styles.welcome}>Xin chào</Text>
                        <Text style={styles.loginTo}>Đăng nhập để tiếp tục</Text>
                        <TextInput
                            onChangeText={(value) => this.setState({ email: value })}

                            style={styles.accInf} placeholderTextColor='lightgray' placeholder='Email' keyboardType='email-address' />
                        <TextInput
                            onChangeText={(value) => this.setState({ pass: value })}

                            style={styles.passW} placeholderTextColor='lightgray' secureTextEntry={true} placeholder='Mật khẩu' />
                    </View>
                    <View style={styles.bottomView}>
                        <TouchableOpacity
                            onPress={() => this.check(userList, navigation)}

                            style={styles.loginBtn} activeOpacity={0.7} >
                            <Text style={styles.btnText}>Đăng nhập</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setUserList(this.state.users),
                                    navigation.navigate('Signup')

                            }}
                            style={styles.signupBtn} activeOpacity={0.7} >
                            <Text style={styles.btnText}>Đăng ký</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5}>
                            <Text style={{ marginTop: 20, fontSize: 15, fontWeight: '400', color: 'white' }}>Quên mật khẩu</Text>
                        </TouchableOpacity>
                    </View>


                </ImageBackground>

            </View>
        )
    }
};
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
        flex: 1,
        paddingBottom: 50,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 80,
        // borderWidth: 1,
        // borderColor: 'white',
    },
    bottomView: {
        flex: 1,
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
    accInf: {
        position: 'absolute',
        bottom: 80,
        left: 30,
        height: 40,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: 'white',
        color: 'white',
        fontWeight: '600',
    },
    passW: {
        marginTop: 10,
        position: 'absolute',
        bottom: 40,
        left: 30,
        height: 40,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: 'white',
        color: 'white',
        fontWeight: '600',

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
const mapStateToProps = (state) => {
    return {
        userList: state.user.users,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setUserList: (userList) => dispatch({ type: 'SET_USER_LIST', users: userList }),
        login: (email, pass, liked, history, firstName, lastName) => dispatch({ type: 'LOG_IN', email, pass, liked, history, firstName, lastName })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
