const userRecordReducer = (state = {userName:"", record: 0}, action) => {
  switch (action.type) {

    case "newUser":
      return {userName:action.userName , record: 0 };
    case "update_record":
      return {record: action.point };
    case "resetRecord":
      return {record: 0};
      default:
      return {...state};
  }
};

export default userRecordReducer;
