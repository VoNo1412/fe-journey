import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import MenuControl from '../../components/MenuControl'

function Layout() {
    return (
        <Box className="app">
            <Box
                className="banner"
                sx={{
                    display: "flex",
                    gap: "0 20px",
                    height: "100%",
                }}
            >
                <Box sx={{ minHeight: "300px"}}>
                    <MenuControl />
                </Box>
                <Box sx={{ flex: 12 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}

export default Layout