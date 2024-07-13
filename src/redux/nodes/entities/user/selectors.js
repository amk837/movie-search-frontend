export const verifyAuth = (state) => !state.user.token;

export const getToken = (state) => state.user.token;

export const getRefreshToken = (state) => state.user.refreshToken;
