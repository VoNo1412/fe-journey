import React from 'react';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { Box, InputBase } from '@mui/material';
import LogoImage from "../assets/logo.png";

const HeaderContainer = styled('header')({
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
    marginBottom: '20px',
});

const MainHeader = styled('div')({
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '36px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 7
});

const SearchContainer = styled('div')(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    alignItems: 'center',
    borderRadius: '36px',
    width: '100%',
    padding: '0 10px'
}));

const Divider = styled('div')({
    height: '32px',
    margin: '0 10px',
    border: '1px solid rgb(153, 148, 148)',
});

const IconWrapper = styled('div')(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    padding: '8px',
    cursor: 'pointer',
}));

const Avatar = styled('img')({
    width: '40px',
    borderRadius: '50%',
});

const Logo = styled('img')({
    borderRadius: '50%',
});

const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <Box sx={{flex: 1}}>
                <Logo src={LogoImage} alt="logo" />
            </Box>
            <MainHeader>
                <SearchContainer sx={{flex: 9}}>
                    <SearchIcon />
                    <InputBase placeholder='Search task' fullWidth />
                </SearchContainer>
                <Divider />
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0 10px", flex: 4}}>
                    <IconWrapper>
                        <AccessTimeFilledIcon />
                    </IconWrapper>
                    <IconWrapper>
                        <CircleNotificationsIcon />
                    </IconWrapper>
                    <Avatar src="https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=164&h=164&fit=crop&auto=format&dpr=2" alt="avatar" />
                </Box>
            </MainHeader>
        </HeaderContainer>
    );
};

export default Header;