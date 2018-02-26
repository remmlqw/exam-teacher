import { combineReducers } from 'redux'

import q_checkin from './q_checkin'
import userinfo from './userinfo'
import subjectinfo from './subjectinfo'
import classinfo from './classinfo'

const rootReducer = combineReducers({
    q_checkin,
    userinfo,
    subjectinfo,
    classinfo
})

export default rootReducer
