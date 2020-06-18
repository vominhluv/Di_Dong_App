import { LOG_IN, LOG_OUT, ADD_TO_HISTORY, SIGN_UP, SET_USER_LIST } from '../actionTypes';
import { firebaseApp } from '../firebaseConfig';
const initialState = {
    users: {},
    email: 'admin@gmail.com',
    pass: 'admin',
    liked: [],
    history: [],
    firstName: '',
    lastName: '',

}
function randomID() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
export default function (state = initialState, action) {
    switch (action.type) {
        case LOG_IN: {
            console.log('Login successfull !');

            return {
                ...state,
                email: action.email,
                pass: action.pass,
                liked: action.liked,
                history: action.history,
                firstName: action.firstName,
                lastName: action.lastName,
            }
        }
        case LOG_OUT: {
            return {
                ...state,
                email: '',
                pass: '',
                liked: [],
                history: [],
                firstName: '',
                lastName: '',

            }
        }
        case ADD_TO_HISTORY: {
            return {
                ...state,
                history: [...state.history, action.data]
            }
        }

        case SIGN_UP: {

            let id = randomID();
            firebaseApp.database().ref(`users/${id}`).set({

                email: action.email,
                firstName: action.firstName,
                lastName: action.lastName,
                pass: action.pass,



            }).then(console.log('signup complete  ! ', id));
            return {
                ...state,
                users: {
                    ...state.users,
                    [id]: {
                        email: action.email,
                        firstName: action.firstName,
                        lastName: action.lastName,
                        pass: action.pass,
                    }
                }
            };
        }
        case SET_USER_LIST: {
            console.log('set userList successfull !');
            return {
                ...state,
                users: action.users,
            }
        }
        default: {
            return state;
        }
    }
}