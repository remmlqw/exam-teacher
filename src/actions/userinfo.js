import * as actionTypes from '../constants/userinfo'

export function login(data) {//登录
    return {
        type: actionTypes.USER_LOGIN,
        data
    }
}

export function changePassword(data) {//修改密码
    return {
        type: actionTypes.CHANGE_PASSWORD,
        data
    }
}
