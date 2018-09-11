import { combineReducers } from "redux";
import scoreReducer from "./scoreReducer";
import recordReducer from "./recordReducer";
import userRecordReducer from "./userRecordReducer";

import _ from 'lodash';
export default combineReducers({
    score: scoreReducer,
    record: recordReducer,
    users: userRecordReducer,
});
