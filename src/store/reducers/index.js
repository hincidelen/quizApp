import { combineReducers } from "redux";
import scoreReducer from "./scoreReducer";
import recordReducer from "./recordReducer";
import userRecordReducer from "./userRecordReducer";

export default combineReducers({
    score: scoreReducer,
    record: recordReducer,
    userRecord: userRecordReducer,
});
