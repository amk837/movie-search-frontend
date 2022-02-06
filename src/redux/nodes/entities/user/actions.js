export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_FAILURE = 'GET_TOKEN_FAILURE';
export const SET_TOKEN = 'SET_TOKEN';
export const CLEAR_TOKEN = 'CLEAR_TOKEN';

export const setToken = (token, refreshToken) => (dispatch) => {
  dispatch({ type: SET_TOKEN, token, refreshToken });
};

export const clearToken = (dispatch) => {
  dispatch({ type: CLEAR_TOKEN });
};
