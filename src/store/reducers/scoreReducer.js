const scoreReducer = (state = {point: 0}, action) => {
  switch (action.type) {
    case "increase":
      return {point: state.point + 1 };
    case "decrease":
      return {point: state.point - 1 };
    case "reset":
      return {point: 0 };
    default:
      return {...state};
  }
};

export default scoreReducer;
