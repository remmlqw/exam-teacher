import * as actionTypes from '../constants/q_checkin'

export function single(data) {
    return {
        type: actionTypes.Q_SINGLE,
        data
    }
}

export function multiple(data) {
    return {
        type: actionTypes.Q_MULTIPLE,
        data
    }
}
