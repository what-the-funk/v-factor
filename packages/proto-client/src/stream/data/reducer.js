import { combineReducers } from 'redux'

const initialState = {
  error: null,
  success: null,
};

const createRoom = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_ROOM_SUCCESS":
      return Object.assign({}, state, { error: null, success: action.payload });
    case "CREATE_ROOM_ERROR":
      return Object.assign({}, state, { error: action.payload, success: null });
    default:
      return state;
  }
};

const deleteRoom = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_ROOM_SUCCESS":
      return Object.assign({}, state, { error: null, success: action.payload });
    case "DELETE_ROOM_ERROR":
      return Object.assign({}, state, { error: action.payload, success: null });
    default:
      return state;
  }
};

const getRoom = (state = initialState, action) => {
  switch (action.type) {
    case "GET_RANDOM_ROOM_SUCCESS":
      return Object.assign({}, state, { error: null, success: action.payload });
    case "GET_RANDOM_ROOM_ERROR":
      return Object.assign({}, state, { error: action.payload, success: null });
    default:
      return state;
  }
};

export default combineReducers({ createRoom, deleteRoom, getRoom });
