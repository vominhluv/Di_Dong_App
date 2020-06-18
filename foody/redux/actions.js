import { SET_RESDATA, SET_USER_LIST, ADD_ITEM, SUB_ITEM, REMOVE_ITEM, SHOW_MODAL, HIDE_MODAL, UPDATE_FOOD, CLEAR_CART_DATA, LOG_IN, LOG_OUT, ADD_TO_HISTORY, SIGN_UP } from './actionTypes';
export const addItem = item => ({
    type: ADD_ITEM,
    item: item,
})
export const subItem = item => ({
    type: SUB_ITEM,
    item: item
})
export const removeItem = item => ({
    type: REMOVE_ITEM,
    item: item
})
export const showModal = (data, flag) => ({
    type: SHOW_MODAL,
    modalData: data,
    flag: flag
})
export const hideModal = (flag) => ({
    type: HIDE_MODAL,
    flag: flag
})
export const updateFood = (item) => ({
    type: UPDATE_FOOD,
    item: item
})
export const clearCartData = () => ({
    type: CLEAR_CART_DATA,
})
export const login = (email, pass, liked, history) => ({
    type: LOG_IN,
    email: email,
    pass: pass,
    liked: liked,
    history: history,
})
export const logout = () => ({
    type: LOG_OUT,
})
export const addToHistory = (data) => ({
    type: ADD_TO_HISTORY,
    data: data
})
export const signUp = (pass, email, firstName, lastName) => ({
    type: SIGN_UP,
    email,
    pass,
    firstName,
    lastName,
})
export const setUsersList = (users) => ({
    type: SET_USER_LIST,
    users
})
export const setResData = (name, rating, time, menu, addr, pics) => ({
    type: SET_RESDATA,
    name,
    rating,
    time,
    menu,
    addr,
    pics

})