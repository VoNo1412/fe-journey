import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { categoryItems, slideBarItems } from '../constants/icons/constants';
import { Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoImage from "../assets/logo.svg";
import FocusTimer from './FocusTime';

export default function Sidebar() {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [categoryIndex, setCategoryIndex] = React.useState(null);

    const handleListItemClick = (
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    const handleListCategoryItemClick = (
        index: number,
    ) => {
        console.log('index: ', index, categoryItems)
        if (index == categoryIndex) {
            setCategoryIndex(null);
        } else {
            index !== null && setCategoryIndex(index as any);
        }
    };

    return (
        <>
            <div className="side_main" style={{ flex: 2 }}>
                <Box sx={{ marginBottom: "30px" }}>
                    <img src={LogoImage} alt="logo" />
                </Box>
                <Box sx={{ width: '100%', bgcolor: 'var(--third-deep-bgColor)', borderRadius: '24px' }}>
                    <List component="nav" aria-label="slidebar">
                        {slideBarItems.map((item, index) => (<ListItemButton
                            key={index}
                            className={selectedIndex == index ? 'active' : ''}
                            selected={selectedIndex === index}
                            onClick={() => handleListItemClick(index)}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>))}
                    </List>
                </Box>
                <div style={{ display: 'flex', margin: "10px 0", justifyContent: 'space-between', padding: '10px 5px', cursor: 'pointer' }}>
                    <Typography variant='body1' style={{ fontWeight: 500 }}>My List</Typography>
                    <AddIcon />
                </div>
                <Box sx={{ width: '100%', bgcolor: 'var(--third-deep-bgColor)', borderRadius: '24px', mb: 3 }}>
                    <List component="nav" aria-label="slidebar">
                        {categoryItems.map((item, index) => (<ListItemButton
                            key={index}
                            className={categoryIndex == index ? 'active' : ''}
                            selected={categoryIndex === index}
                            onClick={() => handleListCategoryItemClick(index)}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                            <div style={{ width: 6, height: 6, borderRadius: "100%", backgroundColor: item.color }}></div>
                        </ListItemButton>))}
                    </List>
                </Box>
                <FocusTimer />

            </div>
        </>
    );
}
