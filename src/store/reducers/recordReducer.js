const recordReducer = (state = {record: 0}, action) => {
  switch (action.type) {
    case "update_record":
      return {record: action.point };
    case "resetRecord":
      return {record: 0};
      default:
      return {...state};
  }
};

export default recordReducer;
