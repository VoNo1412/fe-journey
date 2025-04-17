import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import MarkunreadRoundedIcon from '@mui/icons-material/MarkunreadRounded';
import InboxIcon from '@mui/icons-material/Inbox';
import WorkIcon from '@mui/icons-material/Work';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export const MenuControlItems = [
    { name: 'Todo', icon: <FormatListBulletedIcon sx={{ fill: "var(--primary-color)"}} /> },
    { name: 'Dashboard', icon: <GridViewIcon sx={{ fill: "var(--primary-color)"}} /> },
    { name: 'List', icon: <ListAltRoundedIcon sx={{ fill: "var(--primary-color)"}}/> },
    { name: 'Calendar', icon: <CalendarMonthRoundedIcon sx={{ fill: "var(--primary-color)"}} /> },
    { name: 'Messages', icon: <MarkunreadRoundedIcon sx={{ fill: "var(--primary-color)"}}/> },
]

export const categoryItems = [
    {name: "Inbox", icon: <InboxIcon sx={{ fill: "var(--primary-color)"}} />, color: 'red'},
    {name: "Work", icon: <WorkIcon sx={{ fill: "var(--primary-color)"}}/>, color: 'blue'},
    {name: "Study", icon: <LocalLibraryIcon sx={{ fill: "var(--primary-color)"}}/>, color: 'green'},
    {name: "Favourite", icon: <FavoriteIcon sx={{ fill: "var(--primary-color)"}}/>, color: 'yellow'},
]