import { Card, CardContent, Typography, Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const NotificationItem = ({ notification }: any) => {
    return (
        <Card variant="outlined" sx={{ mb: 1.5, backgroundColor: "#1E1E1E", color: "white", borderRadius: 2 }}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
                {notification.avatar ? (
                    <Avatar src={notification?.avatar} />
                ) : (
                    <Avatar sx={{ bgcolor: "#444" }}>{notification?.user.charAt(0)}</Avatar>
                )}
                <Box sx={{ flex: 1, ml: 2 }}>
                    <Typography variant="body2">
                        <strong style={{ textTransform: "capitalize" }}>{notification.user}</strong> {notification.message} <strong>{notification.file}</strong>
                    </Typography>
                    {notification?.comment && (
                        <Typography variant="body2" sx={{ fontStyle: "italic", opacity: 0.8 }}>
                            {notification?.comment}
                        </Typography>
                    )}
                </Box>
                <Typography variant="caption" sx={{ opacity: 0.6, marginLeft: 1 }}>
                    {notification.time}
                </Typography>
                <IconButton sx={{ color: "white" }}>
                    <MoreVertIcon />
                </IconButton>
            </CardContent>
        </Card>
    );
};

const NotificationsList = ({ notificationRef }: any) => {
    const { notifications } = useSelector((state: RootState) => state.tasks);

    return (
        <Box
            component={"div"}
            ref={notificationRef}
            sx={{ width: 400, p: 2, bgcolor: "#121212", borderRadius: 2, position: 'absolute', zIndex: 999, left: "-380px", top: "20px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" color="white">
                    Notifications
                </Typography>
            </Box>
            {notifications.length ? notifications.map((notification: any) => (
                <NotificationItem key={notification.id} notification={notification} />
            )) : ""}
        </Box>
    );
};

export default NotificationsList;
