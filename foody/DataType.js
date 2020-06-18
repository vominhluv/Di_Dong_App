const User = {
    account: '',
    password: '',
    email: '',
    phone: '',
    history: [], // include cartHistory
    liked: [], // include restaurant liked
}
const Res = {
    like: false,
    cart: {
        total: 0,
        amount: 0,
        items: [], //include foodItem
    }
}
const FoodItem = {
    amount: 0,
    infor: {
        id: 1,
        name: '',
        price: 1,
    }
}
const historyitem = {
    cart: {
        //include Res.Cart
    },
    time: {

    },
    status: ''
}