import { Box } from '@mui/material'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import SidebarRight from '../../components/SidebarRight'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <Box className="app">
            <Header />
            <Box
                className="banner"
                sx={{
                    display: "flex",
                    gap: "0 20px",
                    height: "100%",
                }}
            >
                <Box sx={{flex: 1}}>
                    <Sidebar />
                </Box>
                <Box sx={{flex: 4}}>
                    <Outlet />
                </Box>
                <SidebarRight />
            </Box>
        </Box>
    )
}

export default Layout