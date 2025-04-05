import SearchIcon from '@mui/icons-material/Search';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { Badge, Box, InputBase } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import Notification from './component/Notification';

const Header = () => {
    const [open, setOpen] = React.useState(false);
    const notificationRef = React.useRef<HTMLDivElement>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && notificationRef.current.contains(event.target as Node) || buttonRef.current && buttonRef.current.contains(event.target as Node)) {
                return;
            }
            setOpen(false);
        };

        window.addEventListener('click', handleClickOutside);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '20px' }}>
            <Box
                sx={{
                    padding: '10px',
                    backgroundColor: 'white',
                    borderRadius: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    bgcolor: 'var(--primary-light-bgColor)'
                }}>
                <Box sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '36px',
                    width: '100%',
                    padding: '0 10px',
                    flex: 12
                }}>
                    <SearchIcon sx={{ marginRight: 1 }} />
                    <InputBase placeholder='Search task' fullWidth />
                    <Box sx={{ height: '32px', margin: '0 10px', borderLeft: '1px solid rgb(153, 148, 148)' }} />
                </Box>
                <Box sx={{ display: 'flex', flex: 3, alignItems: 'center', justifyContent: 'flex-end', gap: '0 10px' }}>
                    <Box sx={{
                        border: '1px solid',
                        borderColor: 'var(--primary-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        padding: '8px',
                        cursor: 'pointer'
                    }}>
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
                            position: 'relative'
                        }}>
                        <button
                            type="button"
                            onClick={handleToggle}
                            ref={buttonRef}
                            style={{
                                all: 'unset',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Badge badgeContent={2} color="primary">
                                <CircleNotificationsIcon sx={{ fontSize: 'var(--primary-size-icons)' }} />
                            </Badge>
                            
                        </button>
                        {
                            open ? <Notification notificationRef={notificationRef} /> : <></>
                        }
                    </Box>
                    <Box sx={{ width: '46px', height: '10%' }}>
                        <Link to={'/profile'}>
                            <Box component='img'
                                src='https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=164&h=164&fit=crop&auto=format&dpr=2'
                                alt='avatar'
                                sx={{ borderRadius: '50%' }}
                            />
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default React.memo(Header);
