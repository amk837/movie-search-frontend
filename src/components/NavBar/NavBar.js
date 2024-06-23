import styled from '@emotion/styled';
import { Button, Stack, useMediaQuery } from '@mui/material';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MEDIA_QUERIES, ROUTES } from '../../constants';
import FavoritesContext from '../../context/FavoritesContext';
import { clearToken } from '../../redux/nodes/entities/user/actions';
import { getRefreshToken, verifyAuth } from '../../redux/nodes/entities/user/selectors';
import { logout } from '../../services/authService';

const Container = styled.div`
  width: 80%;
  height: 50px;
  margin: auto;
  display: flex;
  flex-direction: row;
  color: #8e95a5;
  align-items: center;
  .MuiTypography-root {
    font-size: 1vw;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 0px 16px;
  }
`;

const Separator = styled.div`
  height: 25px;
  width: 100vw;
  background: linear-gradient(to bottom, #0b0d14, #1e2129);
`;

const defaultStyle = `
  text-decoration: none;
  color: #8e95a5;
  padding: 10px 15px;
  &: hover {
    background: black;
    color: #00acc1;
  }
`;

const StyledLink = styled(Link)`${defaultStyle}`;

const LinksContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const CustomButton = styled(Button)`
  background: #00acc1;
  color: white;
  &: hover {
    background: #3395aa;
  }
`;

const LogoContainer = styled.div``;
export default function NavBar() {
  const isMobile = useMediaQuery(MEDIA_QUERIES.isMobile);

  const isLoggedIn = useSelector(verifyAuth);
  const refreshToken = useSelector(getRefreshToken);

  const { setFavorites } = useContext(FavoritesContext);

  const dispatch = useDispatch();
  const onLogout = () => {
    logout(refreshToken).then(() => {
      dispatch(clearToken);
      setFavorites(() => []);
    });
  };
  return (
    <Stack alignItems="center">
      <Container>
        <LogoContainer>
          <StyledLink to={ROUTES.search}>Search Movies</StyledLink>
        </LogoContainer>
        <LinksContainer>
          {isMobile ? null : (
            <>
              <StyledLink to={ROUTES.home}>Home</StyledLink>

              <StyledLink to={ROUTES.latest}>Latest</StyledLink>

              <StyledLink to={ROUTES.popular}>Popular</StyledLink>

              <StyledLink to={ROUTES.topRated}>Top Rated</StyledLink>
            </>
          )}

          {isLoggedIn ? (
            <>
              {isMobile ? null : <StyledLink to={ROUTES.favorites}>My Favorites</StyledLink>}

              <CustomButton variant="outlined" onClick={onLogout}>Logout</CustomButton>
            </>
          ) : (
            <Link to={ROUTES.login} style={{ textDecoration: 'none' }}>
              <CustomButton variant="outlined">Login</CustomButton>
            </Link>
          )}
        </LinksContainer>
      </Container>
      <Separator />
    </Stack>
  );
}
