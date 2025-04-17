import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Typography, Avatar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { MenuControlItems } from '../constants/constantIcons';
import useAuth from '../hooks/useAuth';

export default function MenuControl() {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const { auth } = useAuth();

    const handleListItemClick = (index: any) => {
        setSelectedIndex(index);
    };

    return (
        <div
            className="side_main"
            style={{
                backgroundColor: 'var(--second-light-bgColor)',
                height: '100%',
                padding: '20px',
                width: '240px',
                borderRadius: "24px"
            }}
        >
            {/* User Profile Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Avatar sx={{ bgcolor: '#ffeb3b', color: 'black', mr: 1 }}>
                    <img src="https://images.unsplash.com/photo-1741807117240-0aee0cd41d25?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </Avatar>
                <Box>
                    <Typography variant="body1" sx={{ color: 'white', fontWeight: 500 }}>
                        {auth.user.username}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'gray' }}>
                        @{auth.user.email || auth.user.username}
                    </Typography>
                </Box>
            </Box>

            {/* Menu Items */}
            <Box
                sx={{
                    width: '100%',
                    bgcolor: 'transparent',
                    borderRadius: '24px',
                }}
            >
                <List component="nav" aria-label="sidebar">
                    {MenuControlItems.map((item, index) => (
                        <NavLink
                            key={index} // Add key here
                            to={item?.name.toLowerCase()}
                            style={{ textDecoration: 'none' }}
                        >
                            <ListItemButton
                                className={selectedIndex === index ? 'active' : ''}
                                selected={selectedIndex === index}
                                onClick={() => handleListItemClick(index)}
                                sx={{
                                    borderRadius: '12px',
                                    mb: 1,
                                    '&.active': {
                                        backgroundColor: '#ff4081',
                                    },
                                    '&:hover': {
                                        backgroundColor: '#2a2f5b',
                                    },
                                }}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.name} sx={{ color: 'white' }} />
                            </ListItemButton>
                        </NavLink>
                    ))}
                </List>
            </Box>
        </div>
    );
}