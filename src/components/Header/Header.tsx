import SearchIcon from '@mui/icons-material/Search';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { Badge, Box, InputBase, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import useAuth from '../../hooks/useAuth';
import { AUTH_API } from '../../api/api';
import Notification from "./Notification";

const Header = () => {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // State cho menu dropdown
    const notificationRef = React.useRef<HTMLDivElement>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const { notifications } = useSelector((state: RootState) => state.tasks);
    const { auth } = useAuth();
    const navigate = useNavigate(); // Hook để điều hướng

    const handleToggleNoti = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget); // Mở menu tại vị trí avatar
    };

    const handleMenuClose = () => {
        setAnchorEl(null); // Đóng menu
    };

    const handleProfile = () => {
        navigate('/profile'); // Điều hướng đến trang profile
        handleMenuClose();
    };

    const handleLogout = async () => {
        await AUTH_API.apiLogout();
        navigate('/login'); // Điều hướng đến trang login
        handleMenuClose();
    };

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Đóng notification nếu click ngoài
            if (
                notificationRef.current &&
                notificationRef.current.contains(event.target as Node) ||
                buttonRef.current &&
                buttonRef.current.contains(event.target as Node)
            ) {
                return;
            }
            setOpen(false);

            // Đóng menu nếu click ngoài
            if (anchorEl && !anchorEl.contains(event.target as Node)) {
                handleMenuClose();
            }
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [anchorEl]);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '20px' }}>
            <Box
                sx={{
                    padding: '4px',
                    backgroundColor: 'white',
                    borderRadius: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    bgcolor: 'var(--primary-light-bgColor)',
                }}
            >
                <Box
                    sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '36px',
                        width: '100%',
                        padding: '0 10px',
                        flex: 12,
                    }}
                >
                    <SearchIcon sx={{ marginRight: 1 }} />
                    <InputBase placeholder="Search task" fullWidth />
                    <Box sx={{ height: '32px', margin: '0 10px', borderLeft: '1px solid rgb(153, 148, 148)' }} />
                </Box>
                <Box sx={{ display: 'flex', flex: 3, alignItems: 'center', justifyContent: 'flex-end', gap: '0 10px' }}>
                    <Box
                        sx={{
                            border: '1px solid',
                            borderColor: 'var(--primary-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            padding: '8px',
                            cursor: 'pointer',
                        }}
                    >
                        <AccessTimeFilledIcon sx={{ fontSize: 'var(--primary-size-icons)' }} />
                    </Box>
                    <Box
                        sx={{
                            border: '1px solid',
                            borderColor: 'var(--primary-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            padding: '8px',
                            cursor: 'pointer',
                            position: 'relative',
                        }}
                    >
                        <button
                            type="button"
                            onClick={handleToggleNoti}
                            ref={buttonRef}
                            style={{
                                all: 'unset',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Badge badgeContent={notifications?.length || 0} color="primary">
                                <CircleNotificationsIcon sx={{ fontSize: 'var(--primary-size-icons)' }} />
                            </Badge>
                        </button>
                        {open ? <Notification notificationRef={notificationRef} /> : <></>}
                    </Box>
                    <Box sx={{
                        width: "43px",
                        height: "43px"
                    }}>
                        <Box
                            component="img"
                            src={
                                auth?.user?.avatar  ||
                                    'https://images.unsplash.com/photo-1741807117240-0aee0cd41d25?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D'
                            }
                            alt="avatar"
                            sx={{ borderRadius: '50%', cursor: 'pointer' }}
                            onClick={handleAvatarClick} // Mở menu khi click avatar
                        />
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <MenuItem onClick={handleProfile}>Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default React.memo(Header);