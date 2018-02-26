import * as actionTypes from '../constants/userinfo'

const initialState = {}

export default function userinfo(state = initialState, action) {
    switch (action.type) {
        // 登录
        case actionTypes.USER_LOGIN:
            return action.data

        // 修改密码
        case actionTypes.CHANGE_PASSWORD:
            return action.data

        default:
            return state
    }
}
