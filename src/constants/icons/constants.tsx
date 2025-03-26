import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import MarkunreadRoundedIcon from '@mui/icons-material/MarkunreadRounded';
import InboxIcon from '@mui/icons-material/Inbox';
import WorkIcon from '@mui/icons-material/Work';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GridViewIcon from '@mui/icons-material/GridView';

export const slideBarItems = [
    { name: 'Dashboard', icon: <GridViewIcon /> },
    { name: 'List', icon: <ListAltRoundedIcon/> },
    { name: 'Calendar', icon: <CalendarMonthRoundedIcon/> },
    { name: 'Messages', icon: <MarkunreadRoundedIcon/> },
]

export const categoryItems = [
    {name: "Inbox", icon: <InboxIcon />, color: 'red'},
    {name: "Work", icon: <WorkIcon />, color: 'blue'},
    {name: "Study", icon: <LocalLibraryIcon />, color: 'green'},
    {name: "Favourite", icon: <FavoriteIcon />, color: 'yellow'},
]