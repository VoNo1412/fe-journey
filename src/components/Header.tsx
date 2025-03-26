import React from 'react';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { Box, InputBase, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

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
    width: "100%"
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
    borderRadius: '50%',
});


const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <MainHeader sx={{ bgcolor: "var(--primary-light-bgColor)", borderRadius: "28px" }}>
                <SearchContainer sx={{ flex: 12 }}>
                    <SearchIcon sx={{ marginRight: 1 }} />
                    <InputBase placeholder='Search task' fullWidth />
                    <Divider />
                </SearchContainer>
                <Box sx={{ display: "flex", flex: 3, alignItems: "center", justifyContent: "flex-end", gap: "0 10px" }}>
                    <IconWrapper sx={{ borderColor: "var(--primary-color)" }}>
                        <AccessTimeFilledIcon sx={{ fontSize: "var(--primary-size-icons)" }} />
                    </IconWrapper>
                    <IconWrapper sx={{ borderColor: "var(--primary-color)" }}>
                        <CircleNotificationsIcon sx={{ fontSize: "var(--primary-size-icons)" }} />
                    </IconWrapper>
                    <Box sx={{ width: "46px", height: "10%" }}>
                        <Link to={"/profile"}>
                            <Avatar src="https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=164&h=164&fit=crop&auto=format&dpr=2" alt="avatar" />
                        </Link>
                    </Box>
                </Box>
            </MainHeader>
        </HeaderContainer>
    );
};

export default Header;