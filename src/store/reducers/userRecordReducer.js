
import _ from 'lodash';
const userRecordReducer = (state = {list:[]}, action) => {
  switch (action.type) {

    case "createNewUser":
        var user=action.user;
        return {list:[...state.list, user]};
    case "updateUserRecord":
        let updateTemp=state.list;
        updateTemp[action.key].record=action.record;
        console.log(updateTemp);
      return {list:updateTemp };
    case "resetUsers":
          let resetTemp=state.list;
          if(action.key==0)
                var silinen = resetTemp.splice(1, resetTemp.length-1);
      return {list:resetTemp};
    case "deleteUser":
          let deleteTemp=state.list;
        if(action.key==0){
            let index=_.find(deleteTemp, { 'key': action.deleteKey})||{};
            var deleteKey = deleteTemp.indexOf(index);
            console.log(action.deleteKey, action.key, index, deleteKey, deleteTemp);
            var silinen = deleteTemp.splice(deleteKey, 1);

        }
        return {list:deleteTemp};
    case "resetRecord":
      return {...state, record: 0};
      default:
      return {...state};
  }
};

export default userRecordReducer;
