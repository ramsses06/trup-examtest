import { SET_USER } from '../reduxTypes';

const DEFAULT_USER = {
  email: null
};

const userReducer = (state = DEFAULT_USER, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, email: action.email };
    default: return state;
  }
};

export default userReducer
