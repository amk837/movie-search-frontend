import styled from '@emotion/styled';
import { Box, Button, Stack, Typography, useMediaQuery } from '@mui/material';
import { React, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import TextFieldsGenerator from '../../components/TextFieldsGenerator';
import { MEDIA_QUERIES, ROUTES } from '../../constants';
import { setToken } from '../../redux/nodes/entities/user/actions';
import { login } from '../../services/authService';

const StyledButton = styled(Button, {})`
  font-size: larger;
  margin: 10px;
`;

const ErrorText = styled(Typography)`
  margin: 10px;
`;

const FormContainer = styled.form`
  display: flex;
  margin-top: 32px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function LoginPage() {
  const formRef = useRef();

  const isMobile = useMediaQuery(MEDIA_QUERIES.isMobile);

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
      nav(ROUTES.home, { replace: true });
      return;
    }

    setErrorMessage('Wrong Email or Password');
  };

  return (
    <Stack
      sx={{ backgroundColor: '#2f3441', color: '#fff' }}
      width={isMobile ? '100%' : '50%'}
      p={2}
      borderRadius={2.5}
      m={!isMobile ? 'auto' : 0}
      mt={20}
      alignItems="center"
    >
      <Typography variant={isMobile ? 'h4' : 'h3'} align="center">Login Page</Typography>

      <FormContainer onSubmit={onSubmit} ref={formRef}>
        {errorMessage && <ErrorText color="error">{errorMessage}</ErrorText>}

        <Box sx={{ backgroundColor: 'white', width: isMobile ? '100%' : '80%' }} borderRadius={2}>
          <TextFieldsGenerator fields={formFields} styles={{ width: '100%' }} />
        </Box>

        <StyledButton variant="contained" type="submit" sx={{ width: isMobile ? '100%' : '80%' }}>Log in</StyledButton>
      </FormContainer>

      <Link to={ROUTES.register} style={{ textDecoration: 'none', color: '#fff' }}>No account?</Link>
    </Stack>
  );
}

export default LoginPage;
