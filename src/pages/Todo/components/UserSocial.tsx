import { Box, Typography } from "@mui/material";
import React from "react";
import { AUTH_API } from "../../../api/api";
import { Card, CardContent, List, ListItem, ListItemText, Avatar, Badge } from '@mui/material';
import useSocket from "../../../hooks/useSocket";
import useAuth from "../../../hooks/useAuth";

const UserOnline = () => {
    const [users, setUsers] = React.useState<any>([]);
    const { auth } = useAuth();
    const data = useSocket(auth.user.id, 'user-status-update');

    React.useEffect(() => {
        if (!auth?.user.id) return;
        const fetchUsers = async () => AUTH_API.apiGetUsers(auth?.user.id);
        fetchUsers().then(x => setUsers(x)).catch(err => console.error('Nobody exist!!!', err));
    }, [auth?.user.id]);

    const formatLastSeen = React.useCallback((lastSeen: Date) => {
        const date = new Date(lastSeen);
        const now = new Date();

        const isSameDay = (d1: Date, d2: Date) =>
            d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear();

        const isYesterday = (d1: Date, d2: Date) => {
            const yesterday = new Date(d2);
            yesterday.setDate(d2.getDate() - 1);
            return isSameDay(d1, yesterday);
        };

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        if (isSameDay(date, now)) {
            return `Today at ${hours}:${minutes}`;
        } else if (isYesterday(date, now)) {
            return `Yesterday at ${hours}:${minutes}`;
        } else {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            return `${day}/${month} at ${hours}:${minutes}`;
        }
    }, []);


    React.useEffect(() => {
        if (data && !data.state) return;
        if (data.state.isOnline) {
            setUsers((prevUsers: any) => {
                const updatedUsers = prevUsers.map((user: any) =>
                    user.userId === +data?.state?.userId
                        ? { ...user, status: data?.state.isOnline }
                        : user
                );

                return updatedUsers;
            });
        }

        if (!data.state.isOnline) {
            setUsers((prevUsers: any) => {
                const updatedUsers = prevUsers.map((user: any) =>
                    user.userId === +data?.state?.userId
                        ? { ...user, status: data?.state.isOnline, lastSeen: formatLastSeen(new Date()) } : user
                );

                return updatedUsers;
            });
        }
    }, [data?.state]); // Only rerun if userStatus changes



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

export default React.memo(UserOnline);
