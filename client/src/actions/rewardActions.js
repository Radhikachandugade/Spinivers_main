import axios from "axios";
import {
  CREATE_OR_UPDATE_REWARD,
  GET_REWARDS_SUCCESS,
  GET_REWARDS_FAIL,
  CREATE_OR_UPDATE_REWARD_FAIL,
  REWARD_STATS_TODAY_REQUEST,
  REWARD_STATS_TODAY_SUCCESS,
  REWARD_STATS_TODAY_FAIL,
} from "../constants/rewardConstants";

export const createOrUpdateReward =
  (rewardData, walletAddress) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `spinivers_backend.railway.internal/api/rewards/${walletAddress}`,
        rewardData,
        config
      );

      dispatch({
        type: CREATE_OR_UPDATE_REWARD,
        payload: data,
      });
    } catch (error) {
      // Log full error response for debugging
      console.error("Error creating or updating reward:", error);
      if (error.response) {
      }
      dispatch({
        type: CREATE_OR_UPDATE_REWARD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Get rewards by wallet address
export const getRewardsByWalletAddress =
  (walletAddress) => async (dispatch) => {
    try {
      const res = await axios.get(
        `spinivers_backend.railway.internal/api/rewards/${walletAddress}`
      );
      // console.log("Rewards fetched:", res.data); // Log the fetched rewards
      dispatch({
        type: GET_REWARDS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.error("Error fetching rewards:", error); // Log error details
      dispatch({
        type: GET_REWARDS_FAIL,
        payload: error.response.data,
      });
    }
  };

// Action to fetch today's reward statistics
export const getTodayRewardStats = () => async (dispatch, getState) => {
  try {
    dispatch({ type: REWARD_STATS_TODAY_REQUEST });

    const { data } = await axios.get(
      "spinivers_backend.railway.internal/api/rewards/stats/today"
    );

    dispatch({
      type: REWARD_STATS_TODAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REWARD_STATS_TODAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
