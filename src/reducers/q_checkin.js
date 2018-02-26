import * as actionTypes from '../constants/q_checkin'

const initialState = {}

export default function q_checkin(state = initialState, action) {
    switch (action.type) {
        // 单选
        case actionTypes.Q_SINGLE:
            return action.data

        // 多选
        case actionTypes.Q_MULTIPLE:
            return action.data

        //判断
        case actionTypes.Q_TRUE_OR_FALSE:
            return action.data

        default:
            return state
    }
}
