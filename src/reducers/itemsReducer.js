import { ADD_ITEMS } from '../reduxTypes';

const DEFAULT_ITEMS = {
  items: null,
};

const itemsReducer = (state = DEFAULT_ITEMS, action) => {
  switch (action.type) {
    case ADD_ITEMS:
      return { ...state, items: action.payload };
    default: return state;
  }
};

export default itemsReducer;
