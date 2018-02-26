import * as actionTypes from '../constants/classinfo'

export function setClassInfo(data) {//记录班级信息
    return {
        type: actionTypes.CLASS_INFO,
        data
    }
}
