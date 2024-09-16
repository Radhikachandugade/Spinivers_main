import {
  CREATE_OR_UPDATE_REWARD,
  GET_REWARDS_SUCCESS,
  GET_REWARDS_FAIL,
  REWARD_STATS_TODAY_REQUEST,
  REWARD_STATS_TODAY_SUCCESS,
  REWARD_STATS_TODAY_FAIL,
} from "../constants/rewardConstants";

const initialState = {
  rewards: [],
  loading: true,
  error: null,
};

export const rewardReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_OR_UPDATE_REWARD:
      return {
        ...state,
        rewards: [...state.rewards, action.payload],
        loading: false,
      };
    case GET_REWARDS_SUCCESS:
      return {
        ...state,
        rewards: action.payload,
        loading: false,
      };
    case GET_REWARDS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const rewardStatsTodayReducer = (state = { stats: [] }, action) => {
  switch (action.type) {
    case REWARD_STATS_TODAY_REQUEST:
      return { loading: true, stats: [] };
    case REWARD_STATS_TODAY_SUCCESS:
      return { loading: false, stats: action.payload };
    case REWARD_STATS_TODAY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
