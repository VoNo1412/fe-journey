import { Box, Typography } from "@mui/material";
import React from "react";
import { AUTH_API } from "../../../api/api";
import { Card, CardContent, List, ListItem, ListItemText, Avatar, Badge } from '@mui/material';

const UserOnline = () => {
    const [users, setUsers] = React.useState<any>([]);

    React.useEffect(() => {
        const fetchUsers = async () => AUTH_API.apiGetUsers();
        fetchUsers().then(x => setUsers(x)).catch(err => console.error('Nobody exist!!!', err));
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: "var(--primary-light-bgColor)",
                borderRadius: 4,
                boxShadow: 3,
                padding: 2,
                textAlign: "center",
            }}
        >
            {/* Forest Background */}

            {/* Task Selection */}
            <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography variant="h6">User player</Typography>
                    <List>
                        {users.length ? users.map((friend: any, index: number) => (
                            <ListItem key={index}>
                                <Badge
                                    color={friend.isOnline ? 'success' : 'error'}
                                    variant="dot"
                                    overlap="circular"
                                >
                                    <Avatar src={friend.avatar} />
                                </Badge>
                                <ListItemText
                                    sx={{ marginLeft: "10px", color: "white" }}
                                    primary={friend.username}
                                    secondary={
                                        <Typography style={{ color: "white" }}>
                                            {friend.status ? "Online" : "Offline"}
                                            {!!friend.lastSeen ? ` (last seen ${friend.lastSeen})` : ''}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        )) : <></>}
                    </List>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserOnline;
