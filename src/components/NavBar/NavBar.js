import styled from '@emotion/styled';
import { Box, Button, Drawer, IconButton, Stack, useMediaQuery } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from '@mui/icons-material';
import { MEDIA_QUERIES, ROUTES } from '../../constants';
import FavoritesContext from '../../context/FavoritesContext';
import { clearToken } from '../../redux/nodes/entities/user/actions';
import { getRefreshToken, verifyAuth } from '../../redux/nodes/entities/user/selectors';
import { logout } from '../../services/authService';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  color: #8e95a5;
  align-items: center;
`;

const Separator = styled(Box)`
  height: 2px;
  width: 100vw;
  align-self: center;
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
  const isMidScreen = useMediaQuery(MEDIA_QUERIES.isMidScreen);

  const [showDrawer, setShowDrawer] = useState(false);

  const isLoggedIn = useSelector(verifyAuth);
  const refreshToken = useSelector(getRefreshToken);

  const { setFavorites } = useContext(FavoritesContext);

  const dispatch = useDispatch();

  const toggleDrawer = () => {
    if (!isMobile) return;

    setShowDrawer(!showDrawer);
  };
  const onLogout = () => {
    dispatch(clearToken);
    setFavorites(() => []);
    logout(refreshToken);
  };

  const renderAuthButton = () => (!isLoggedIn ? (
    <>
      {!isMobile ? <StyledLink to={ROUTES.favorites} onClick={toggleDrawer}>My Favorites</StyledLink> : null}

      <CustomButton variant="outlined" onClick={onLogout}>Logout</CustomButton>

      {isMobile ? <StyledLink to={ROUTES.favorites} onClick={toggleDrawer}>My Favorites</StyledLink> : null}
    </>
  ) : (
    <Link to={ROUTES.login} onClick={isMobile ? toggleDrawer : undefined} style={{ textDecoration: 'none' }}>
      <CustomButton variant="outlined">Login</CustomButton>
    </Link>
  ));

  const renderLinks = () => (
    <>
      {isMobile ? renderAuthButton() : null }

      <StyledLink to={ROUTES.home} onClick={toggleDrawer}>Home</StyledLink>

      <StyledLink to={ROUTES.latest} onClick={toggleDrawer}>Latest</StyledLink>

      <StyledLink to={ROUTES.popular} onClick={toggleDrawer}>Popular</StyledLink>

      <StyledLink to={ROUTES.topRated} onClick={toggleDrawer}>Top Rated</StyledLink>

      {!isMobile ? renderAuthButton() : null }

    </>
  );
  return (
    <Stack
      width={isMidScreen ? '100%' : '80%'}
      position="sticky"
      px={isMobile ? 2 : (isMidScreen && 3) || 0}
      pt={isMobile ? 0 : 2}
      top={0}
      zIndex={10}
      sx={{ backgroundColor: '#1e2129' }}
    >
      <Container>
        <LogoContainer>
          <StyledLink to={ROUTES.search}>Search Movies</StyledLink>
        </LogoContainer>
        <LinksContainer>
          {isMobile ? (
            <IconButton onClick={toggleDrawer}>
              <Menu color="primary" fontSize="large" />
            </IconButton>
          ) : (
            renderLinks()
          )}

        </LinksContainer>
      </Container>

      <Drawer open={showDrawer} onClose={toggleDrawer} anchor="right">
        <Stack alignItems="center" pt={2} px={2}>
          <IconButton onClick={toggleDrawer}>
            <Menu fontSize="large" />
          </IconButton>
          {renderLinks()}
        </Stack>
      </Drawer>
      <Separator mt={isMobile ? 0 : 2} />
    </Stack>
  );
}
