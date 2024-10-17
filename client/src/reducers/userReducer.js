import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_UPDATE_SPINS_REQUEST,
  USER_UPDATE_SPINS_SUCCESS,
  USER_UPDATE_SPINS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_CONNECTION_STATUS,
  RESET_FREE_SPINS_REQUEST,
  RESET_FREE_SPINS_SUCCESS,
  RESET_FREE_SPINS_FAIL,
} from "../constants/userConstants";

const initialState = {
  freeSpins: 0, // Default free spins count
  nextSpinTime: null, // Default value for next spin time
};

// User login reducer
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// User registration reducer
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get user details reducer
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// List all users reducer
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Update user's spins reducer
export const userUpdateSpinsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_SPINS_REQUEST:
      return { loading: true };
    case USER_UPDATE_SPINS_SUCCESS:
      return { loading: false, success: true, spins: action.payload };
    case USER_UPDATE_SPINS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const resetFreeSpinsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_FREE_SPINS_REQUEST:
      return { ...state, loading: true };

    case RESET_FREE_SPINS_SUCCESS:
      return {
        ...state,
        loading: false,
        freeSpins: action.payload.freeSpins,
        nextSpinTime: action.payload.nextSpinTime,
      };

    case RESET_FREE_SPINS_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userConnectedReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CONNECTION_STATUS:
      return { userConnection: action.payload };
    default:
      return state;
  }
};
