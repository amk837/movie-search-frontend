/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { fireEvent, render, screen, act } from '@testing-library/react';
import LoginPage from '../pages/LoginPage/LoginPage';
import store from '../redux/store';

const mockUser = {
  email: 'amk@gmail.com',
  password: '5757231',
};

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...original,
    useNavigate: () => mockNavigate,
  };
});

jest.mock('../services/authService.js');
const { login } = require('../services/authService');

login.mockImplementation(async (userData) => {
  if (userData.get('email') === mockUser.email && userData.get('password') === mockUser.password) {
    return { token: 'abc', refreshToken: 'cde' };
  }
  return { token: '', refreshToken: '' };
});

describe('LoginPage test', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should log in user', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </BrowserRouter>,
    );
    const [emailField, passwordField] = screen.getAllByPlaceholderText(/enter (email|password)/i);

    fireEvent.change(emailField, { target: { value: mockUser.email } });
    fireEvent.change(passwordField, { target: { value: mockUser.password } });

    const loginButton = screen.getByRole('button');

    const userData = new FormData();
    userData.append('email', mockUser.email);
    userData.append('password', mockUser.password);
    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(login).toBeCalledWith(userData);
    expect(screen.queryByText(/wrong email or password/i)).toBe(null);
    expect(mockNavigate).toBeCalledWith('/home', { replace: true });
  });

  it('should not log in user', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </BrowserRouter>,
    );
    const [emailField, passwordField] = screen.getAllByPlaceholderText(/enter (email|password)/i);

    fireEvent.change(emailField, { target: { value: 'test@gmail.com' } });
    fireEvent.change(passwordField, { target: { value: 'bad password' } });

    const loginButton = screen.getByRole('button');

    const userData = new FormData();
    userData.append('email', 'test@gmail.com');
    userData.append('password', 'bad password');
    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(login).toBeCalledWith(userData);
    expect(screen.queryByText(/wrong email or password/i)).not.toBe(null);
    expect(mockNavigate).not.toBeCalledWith('/home', { replace: true });
  });
});
