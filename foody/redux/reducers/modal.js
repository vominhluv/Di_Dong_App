import { SHOW_MODAL, HIDE_MODAL, INCREASE, DECREASE } from '../actionTypes';
const initialState = {
    orderModalVisible: false,
    resModalVisible: false,
    min: 1,
    max: 50,

    item: {
        amount: 0,
        infor: {
            id: 1,
            name: 'Bun reu cua',
            price: 20000,
        }
    }

}
export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_MODAL:
            if (action.flag === 1) {
                return {
                    ...state,
                    orderModalVisible: true,
                    item: action.item
                }
            }
            else {
                return {
                    ...state,
                    resModalVisible: true,
                    item: action.item
                }
            }
        case HIDE_MODAL:
            if (action.flag === 1) {
                return {
                    ...state,
                    orderModalVisible: false,

                }
            }
            else {
                return {
                    ...state,
                    resModalVisible: false,

                }
            }

        case INCREASE: {
            return {
                ...state,
                item: {
                    ...state.item,
                    amount: state.item.amount + 1
                },
            }
        }
        case DECREASE: {
            return {
                ...state,
                item: {
                    ...state.item,
                    amount: state.item.amount - 1,
                }

            }
        }
        default:
            return state;
    }
}
