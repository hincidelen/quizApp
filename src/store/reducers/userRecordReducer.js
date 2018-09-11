const userRecordReducer = (state = {list:[]}, action) => {
  switch (action.type) {

    case "createNewUser":
        var user=action.user;
        return {list:[...state.list, user]};
    case "updateUserRecord":
        let temp=state.list;
        temp[action.key].record=action.record;
        console.log(temp);
      return {list:temp };
      case "resetRecord":
      return {...state, record: 0};
      default:
      return {...state};
  }
};

export default userRecordReducer;
