/* eslint-disable no-undef */
import React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import RegisterPage from '../pages/RegisterPage/RegisterPage';

const mockUser = {
  name: 'test1',
  email: 'test1@gmail.com',
  password: 'test1password',
};

const mockBadEmail = {
  name: 'bad email',
  email: 'bad email',
  password: 'bademailpasswor',
};

const mockBadName = {
  name: ' ',
  email: 'badname@gmail.com',
  password: 'badnamepassword',
};

const mockBadPassword = {
  name: 'Bad Password',
  email: 'badpassword@gmail.com',
  password: '1',
};

const mockUserEmails = [];

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
const { register } = require('../services/authService');

register.mockImplementation(async (userData) => {
  const email = userData.get('email');
  if (!mockUserEmails.includes(email)) {
    mockUserEmails.push(email);
    return { message: 'User Created', email };
  }
  return { message: 'User already exists' };
});

describe('RegisterPage test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should register a user', async () => {
    render(<RegisterPage />);
    const [nameField, emailField, passwordField] = screen.getAllByPlaceholderText(/enter (email|password|name)/i);

    fireEvent.change(nameField, { target: { value: mockUser.name } });
    fireEvent.change(emailField, { target: { value: mockUser.email } });
    fireEvent.change(passwordField, { target: { value: mockUser.password } });

    const registerButton = screen.getByRole('button');

    const userData = new FormData();
    userData.append('name', mockUser.name);
    userData.append('email', mockUser.email);
    userData.append('password', mockUser.password);
    await act(async () => {
      fireEvent.click(registerButton);
    });

    expect(register).toBeCalledWith(userData);
    expect(mockNavigate).toBeCalledWith('/login', { replace: true });
  });

  it('should show email already exists error', async () => {
    render(<RegisterPage />);
    const [nameField, emailField, passwordField] = screen.getAllByPlaceholderText(/enter (email|password|name)/i);

    fireEvent.change(nameField, { target: { value: mockUser.name } });
    fireEvent.change(emailField, { target: { value: mockUser.email } });
    fireEvent.change(passwordField, { target: { value: mockUser.password } });

    const registerButton = screen.getByRole('button');

    await act(async () => {
      fireEvent.click(registerButton);
    });

    const userData = new FormData();
    userData.append('name', mockUser.name);
    userData.append('email', mockUser.email);
    userData.append('password', mockUser.password);
    expect(register).toBeCalledWith(userData);
    expect(screen.queryByText('User with this email already exists')).toBeInTheDocument();
  });

  it('should show email error', async () => {
    render(<RegisterPage />);
    const [nameField, emailField, passwordField] = screen.getAllByPlaceholderText(/enter (email|password|name)/i);

    fireEvent.change(nameField, { target: { value: mockBadEmail.name } });
    fireEvent.change(emailField, { target: { value: mockBadEmail.email } });
    fireEvent.change(passwordField, { target: { value: mockBadEmail.password } });

    const registerButton = screen.getByRole('button');

    await act(async () => {
      fireEvent.click(registerButton);
    });

    expect(register).not.toBeCalled();
    expect(screen.queryByText('Please enter a valid email')).toBeInTheDocument();
  });

  it('should show name error', async () => {
    render(<RegisterPage />);
    const [nameField, emailField, passwordField] = screen.getAllByPlaceholderText(/enter (email|password|name)/i);

    fireEvent.change(nameField, { target: { value: mockBadName.name } });
    fireEvent.change(emailField, { target: { value: mockBadName.email } });
    fireEvent.change(passwordField, { target: { value: mockBadName.password } });

    const registerButton = screen.getByRole('button');

    await act(async () => {
      fireEvent.click(registerButton);
    });

    expect(register).not.toBeCalled();
    expect(screen.queryByText('Name can not be Blank')).toBeInTheDocument();
  });

  it('should show password error', async () => {
    render(<RegisterPage />);
    const [nameField, emailField, passwordField] = screen.getAllByPlaceholderText(/enter (email|password|name)/i);

    fireEvent.change(nameField, { target: { value: mockBadPassword.name } });
    fireEvent.change(emailField, { target: { value: mockBadPassword.email } });
    fireEvent.change(passwordField, { target: { value: mockBadPassword.password } });

    const registerButton = screen.getByRole('button');

    await act(async () => {
      fireEvent.click(registerButton);
    });

    expect(register).not.toBeCalled();
    expect(screen.queryByText('Please enter password of length 8 or more and contains digits and letters')).toBeInTheDocument();
  });
});
