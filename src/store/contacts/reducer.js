import {
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  ADD_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  users: [],
  userProfile: {},
  error: {},
  loading: true,
};

const contacts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default contacts;
