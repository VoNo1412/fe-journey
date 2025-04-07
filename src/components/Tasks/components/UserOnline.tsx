import { Box, Typography } from "@mui/material";
import React from "react";
import { AUTH_API } from "../../../api/api";
import { Card, CardContent, List, ListItem, ListItemText, Avatar, Badge } from '@mui/material';
import useSocket from "../../../hooks/useSocket";
import useAuth from "../../../hooks/useAuth";
import { HOST_WEBSOCKET } from "../../../api/constants";

const UserOnline = () => {
    const [users, setUsers] = React.useState<any>([]);
    const { auth } = useAuth();
    const data = useSocket(HOST_WEBSOCKET, auth?.user.id); // Replace with your socket URL

    React.useEffect(() => {
        if (!auth?.user.id) return;
        const fetchUsers = async () => AUTH_API.apiGetUsers(auth?.user.id);
        fetchUsers().then(x => setUsers(x)).catch(err => console.error('Nobody exist!!!', err));
    }, [auth?.user.id]);

    React.useEffect(() => {
        if (!data.userStatus) return;
        const formatLastSeen = (lastSeen: string) => {
            const date = new Date(lastSeen);
            return `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        };
        setUsers((prevUsers: any) => {
            const updatedUsers = prevUsers.map((user: any) =>
                user.userId === +data.userStatus.userId
                    ? { ...user, status: data.userStatus.isOnline }
                    : { ...user, lastSeen: formatLastSeen(user.lastSeen) }
            );

            return updatedUsers;
        });
    }, [data.userStatus]); // Only rerun if userStatus changes


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

            {/* Task Selection */}
            <Card sx={{ maxWidth: 345, backgroundColor: "var(--primary-light-bgColor)", boxShadow: "none" }}>
                <CardContent sx={{ color: "var(--primary-color)" }}>
                    <Typography variant="h6">User</Typography>
                    <List>
                        {users.length ? users.map((friend: any, index: number) => (
                            <ListItem key={index}>
                                <Badge
                                    color={friend.status ? 'success' : 'error'}
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
                                            {!!friend.lastSeen && !friend.status ? ` (last seen ${friend.lastSeen})` : ''}
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
