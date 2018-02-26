import * as actionTypes from '../constants/subjectinfo'

export function setSubjectInfo(data) {//记录科目信息
    return {
        type: actionTypes.SUBJECT_INFO,
        data
    }
}
