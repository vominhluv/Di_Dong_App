import { SET_RESDATA, LIKE, UNLIKE, ADD_ITEM, SUB_ITEM, REMOVE_ITEM, UPDATE_FOOD, CLEAR_CART_DATA } from '../actionTypes';
const initialState = {
    like: false,
    cart: {
        total: 0,
        amount: 0,
        items: []
    },
    name: '',
    addr: '',
    time: '',
    pics: '',
    rating: 0,
    menu: [

    ]
}
var it = {
    amount: 1,
    infor: {
        id: 1,
        name: 'Mieen xao bo',
        price: 150000,
    }
}
export default function (state = initialState, action) {
    switch (action.type) {
        case LIKE: {
            return {
                ...state,
                like: true,
            }
        }
        case UNLIKE: {
            return {
                ...state,
                like: false
            }
        }
        case ADD_ITEM: {
            var count = action.item.amount + state.cart.amount;
            var newItem = { ...action.item };
            let t = 0;
            state.cart.items.forEach(item => {
                if (item.infor.name === action.item.infor.name) {
                    t++;
                }
            })
            let newCart = { ...state.cart };
            console.log(action.item);
            if (t == 0) {

                newCart.amount += action.item.amount;
                newCart.total += action.item.amount * action.item.infor.price;
                newCart.items = [...newCart.items, action.item];
                return {
                    ...state,
                    cart: { ...newCart }
                }

            }
            else {
                newCart.amount += item.amount;
                newCart.total += item.amount * item.price;
                newCart.items.forEach(item => {
                    if (item.name == action.item.infor.name) {
                        item.amount += action.item.amount;
                    }
                })
                return {
                    ...state,
                    cart: { ...newCart }
                }
            }
        }
        case SUB_ITEM: {
            let newCart = { ...state.cart };
            newCart.cart.amount -= 1;
            newCart.total -= action.item.infor.price;
            newCart.cart.items.forEach(item => {
                if (item.name === action.item.infor.name) {
                    item.amount -= 1;
                }
            })
            let arr = newCart.items.filter(item => {
                return item.amount !== 0;
            }
            )
            return {
                ...state,
                cart: { ...newCart, items: [...arr] }
            }

        }
        case REMOVE_ITEM: {
            let newItems = state.cart.items.filter(item => {
                return item.name !== action.item.infor.name;
            });
            let newCart = { ...state.cart };
            newCart.amount -= action.item.amount;
            newCart.total -= action.item.amount * action.item.infor.price;

            return {
                ...state,
                cart: { ...newCart }
            }

        }
        case UPDATE_FOOD: {

            let newCart = { ...state.cart };
            let oldItem;
            newCart.items.forEach(item => {
                if (item.infor.name === action.item.infor.name)
                    oldItem = item;
            })

            if (oldItem.amount < action.item.amount) {
                let t = action.item.amount - oldItem.amount;
                newCart.amount += t;
                newCart.total += t * action.item.infor.price;
            }
            else {
                let t = oldItem.amount - action.item.amount;
                newCart.amount -= t;
                newCart.total -= t * action.item.infor.price;
            }
            oldItem.amount = action.item.amount;
            return {
                ...state,
                cart: newCart
            }


        }
        case CLEAR_CART_DATA: {
            return {
                ...state,
                cart: {
                    total: 0,
                    amount: 0,
                    items: []
                },
            }
        }
        case SET_RESDATA: {
            console.log('set resdata successfull ! ');
            console.log(action);
            return {
                ...state,
                name: action.name,
                rating: action.rating,
                time: action.time,
                menu: action.menu,
                addr: action.addr,
                pics: action.pics
            }
        }
        default: {
            return state;
        }
    }
}