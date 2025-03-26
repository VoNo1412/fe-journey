import { Box } from '@mui/material'
import Sidebar from '../../components/Sidebar'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <Box className="app">
            {/* <Header /> */}
            <Box
                className="banner"
                sx={{
                    display: "flex",
                    gap: "0 20px",
                    height: "100%",
                }}
            >
                <Box sx={{ minHeight: "300px"}}>
                    <Sidebar />
                </Box>
                <Box sx={{ flex: 12 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}

export default Layout