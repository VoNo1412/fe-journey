import { Card, CardContent, Typography, Avatar, IconButton, Badge } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/system";

const notifications = [
    {
        id: 1,
        user: "Patrick",
        avatar: "https://via.placeholder.com/40", // Replace with actual image URL
        message: "added a comment on",
        file: "Design Assets - Smart Tags file",
        time: "15h",
        comment: '"Looks perfect, send it for technical review tomorrow!"',
        actions: [],
    },
    {
        id: 2,
        user: "Ashwin Bose",
        avatar: null, // No avatar, default initials
        message: "is requesting access to",
        file: "Design File - Final Project",
        time: "15h",
    },
];

const NotificationItem = ({ notification }: any) => {
    return (
        <Card variant="outlined" sx={{ mb: 1.5, backgroundColor: "#1E1E1E", color: "white", borderRadius: 2 }}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
                {notification.avatar ? (
                    <Avatar src={notification.avatar} />
                ) : (
                    <Avatar sx={{ bgcolor: "#444" }}>{notification.user.charAt(0)}</Avatar>
                )}
                <Box sx={{ flex: 1, ml: 2 }}>
                    <Typography variant="body2">
                        <strong>{notification.user}</strong> {notification.message} <strong>{notification.file}</strong>
                    </Typography>
                    {notification.comment && (
                        <Typography variant="body2" sx={{ fontStyle: "italic", opacity: 0.8 }}>
                            {notification.comment}
                        </Typography>
                    )}
                </Box>
                <Typography variant="caption" sx={{ opacity: 0.6 }}>
                    {notification.time}
                </Typography>
                <IconButton sx={{ color: "white" }}>
                    <MoreVertIcon />
                </IconButton>
            </CardContent>
        </Card>
    );
};

const NotificationsList = ({notificationRef}: any) => {
    return (
        <Box 
        component={"div"}
            ref={notificationRef}
            sx={{ width: 400, p: 2, bgcolor: "#121212", borderRadius: 2, position: 'absolute', zIndex: 999, left: "-380px", top: "20px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" color="white">
                    Notifications
                </Typography>
                <Badge badgeContent={2} color="primary" />
            </Box>
            {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
            ))}
        </Box>
    );
};

export default NotificationsList;
