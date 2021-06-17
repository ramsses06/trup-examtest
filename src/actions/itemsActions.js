import { ADD_ITEMS } from '../reduxTypes';

export const addItems = (items) => (dispatch, getState) => {
  let newItems = [];
  const prevState = getState();
  if (prevState.itemsReducer.items) {
    newItems = prevState.itemsReducer.items.concat(items);
  }
  dispatch({
    type: ADD_ITEMS,
    payload: newItems
  });
};
