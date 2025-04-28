import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ProjectCard } from './ProjectCard';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3, display: "flex", flexWrap: "wrap", gap: 2 }}>{children}</Box>}
        </Box>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ProjectTabs({ projects, setTab }: any) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(event, newValue);
        setValue(newValue);
        setTab(newValue);
    };

    return (
        <Box >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Common" {...a11yProps(0)} />
                    <Tab label="Indivitual" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                {projects
                    .filter((project: any) => project.tab === 0)
                    .map((project: any) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                {projects
                    .filter((project: any) => project.tab === 1)
                    .map((project: any) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
            </CustomTabPanel>
        </Box>
    );
}
