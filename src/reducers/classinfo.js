import * as actionTypes from '../constants/classinfo'

const initialState = {}

export default function userinfo(state = initialState, action) {
    switch (action.type) {
        // 科目信息
        case actionTypes.CLASS_INFO:
            return action.data

        default:
            return state
    }
}
