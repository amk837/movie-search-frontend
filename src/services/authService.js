import { LOGIN_API, LOGOUT_API, REGISTER_API, REFRESH_TOKEN_API } from '../constants';
import { setToken } from '../redux/nodes/entities/user/actions';

const sendData = (api, userData) => fetch(api, {
  method: 'POST',
  body: JSON.stringify(Object.fromEntries(userData.entries())),
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((res) => {
    console.log(res);
    return res.json();
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

export const login = (formData) => sendData(LOGIN_API, formData);

export const register = (formData) => sendData(REGISTER_API, formData);

export const logout = (refreshToken) => fetch(LOGOUT_API, {
  method: 'DELETE',
  body: JSON.stringify({
    refreshToken,
  }),
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getNewToken = (refreshToken) => fetch(REFRESH_TOKEN_API, {
  method: 'POST',
  body: JSON.stringify({ refreshToken }),
  headers: {
    'Content-Type': 'application/json',
  },
}).then((res) => res.json()).catch((err) => {
  throw err;
});

export const useTokenService = async (service, token, refreshToken, dispatch) => {
  if (!token && !refreshToken) return { favorites: [] };

  let data = await service(token);
  if (data.status >= 200 && data.status <= 203) return data;
  const newToken = (await getNewToken(refreshToken)).token;
  dispatch(setToken(newToken, refreshToken));
  data = await service(newToken);
  return data;
};
