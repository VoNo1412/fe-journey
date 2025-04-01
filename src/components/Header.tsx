import SearchIcon from '@mui/icons-material/Search';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { Box, InputBase } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '20px' }}>
            <Box sx={{ 
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
                        <CircleNotificationsIcon sx={{ fontSize: 'var(--primary-size-icons)' }} />
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

export default Header;
