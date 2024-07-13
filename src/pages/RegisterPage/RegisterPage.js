import styled from '@emotion/styled';
import { Box, Button, Stack, Typography, useMediaQuery } from '@mui/material';
import { React, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextFieldsGenerator from '../../components/TextFieldsGenerator';
import { MEDIA_QUERIES, ROUTES } from '../../constants';
import { register } from '../../services/authService';

const StyledButton = styled(Button, {})`
  font-size: larger;
  margin: 10px;
`;

const ErrorText = styled(Typography)`
  margin: 10px;
`;

const FormContainer = styled.form`
  display: flex;
  margin-top: 60px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function RegisterPage() {
  const formRef = useRef();

  const isMobile = useMediaQuery(MEDIA_QUERIES.isMobile);

  const [errorMessage, setErrorMessage] = useState('');

  const nav = useNavigate();

  const formFields = ['name', 'email', 'password'];

  const onSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /[0-9a-zA-Z][0-9a-zA-Z._]*@[0-9a-zA-Z]+\.[a-zA-Z]{2,}\b/;
    const passwordRegex = /\w{8,}/;
    setErrorMessage('');
    const formData = new FormData(formRef.current);
    const [name, email, password] = ['name', 'email', 'password'].map((field) => formData.get(field));
    if (name === ' ') {
      setErrorMessage('Name can not be Blank');
    } else if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email');
    } else if (!passwordRegex.test(password)) {
      setErrorMessage('Please enter password of length 8 or more and contains digits and letters');
    } else {
      const response = await register(formData);
      if (response.email) {
        nav(ROUTES.login, { replace: true });
      } else {
        setErrorMessage('User with this email already exists');
      }
    }
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

      <Typography variant={isMobile ? 'h4' : 'h3'}>Register Page</Typography>

      <FormContainer onSubmit={onSubmit} ref={formRef}>
        {errorMessage && <ErrorText color="error">{errorMessage}</ErrorText>}

        <Box sx={{ backgroundColor: 'white', width: isMobile ? '100%' : '80%' }} borderRadius={2}>
          <TextFieldsGenerator fields={formFields} styles={{ width: '100%' }} />
        </Box>

        <StyledButton variant="contained" type="submit" sx={{ width: isMobile ? '100%' : '80%' }}>Register</StyledButton>
      </FormContainer>

      <Link to={ROUTES.login} style={{ textDecoration: 'none', color: '#fff' }}>Existing account?</Link>
    </Stack>
  );
}

export default RegisterPage;
