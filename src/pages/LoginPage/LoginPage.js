import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import { React, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import TextFieldsGenerator from '../../components/TextFieldsGenerator';
import { setToken } from '../../redux/nodes/entities/user/actions';
import { login } from '../../services/authService';

const StyledButton = styled(Button, {})`
  font-size: larger;
  margin: 10px;
`;

const ErrorText = styled(Typography)`
  margin: 10px;
`;

const Container = styled.div`
  width: 30%;
  height: 500px;
  display: flex;
  margin: auto;
  margin-top: 100px;
  align-items: center;
  flex-direction: column;
  background: white;
`;

const FormContainer = styled.form`
  display: flex;
  margin-top: 60px;
  width: 80%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function LoginPage() {
  const formRef = useRef();

  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  const nav = useNavigate();

  const formFields = ['email', 'password'];

  const onSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');

    const formData = new FormData(formRef.current);
    const { token, refreshToken } = (await login(formData)) || {};

    if (token && refreshToken) {
      dispatch(setToken(token, refreshToken));
      nav('/home', { replace: true });
      return;
    }

    setErrorMessage('Wrong Email or Password');
  };

  return (
    <Container>
      <Typography variant="h3">Login Page</Typography>

      <FormContainer onSubmit={onSubmit} ref={formRef}>
        {errorMessage && <ErrorText color="error">{errorMessage}</ErrorText>}

        <TextFieldsGenerator fields={formFields} styles={{ width: '80%' }} />

        <StyledButton variant="contained" type="submit">Log in</StyledButton>
      </FormContainer>

      <Link to="/register">No account?</Link>
    </Container>
  );
}

export default LoginPage;
