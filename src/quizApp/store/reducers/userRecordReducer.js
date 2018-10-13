
import _ from 'lodash';
const userRecordReducer = (state = {list:[]}, action) => {
  switch (action.type) {

    case "createNewUser":
        var user=action.user;
        return {list:[...state.list, user]};
    case "updateUserRecord":
        let updateTemp=state.list;
        let user=_.find(updateTemp, { 'userName': action.key})||{};
        console.log(user)
        user.record=action.record;
      return {list:updateTemp };
      case "resetUsers":
          let resetTemp=state.list;
        console.log(action.key)
          if(action.key.isadmin==true)
                var silinen = resetTemp.splice(1, resetTemp.length-1);
      return {list:[...[],action.key]};
    case "deleteUser":
          let deleteTemp=state.list;
        let actioner=_.find(deleteTemp, { 'userName': action.deleteUserName})||{};

        if(action.key.isadmin==true&&action.key.userName!=action.deleteUserName){
            let index=_.find(deleteTemp, { 'userName': action.deleteUserName})||{};
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
