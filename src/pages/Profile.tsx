import { useState } from "react";
import {
    TextField,
    Button,
    Avatar,
    Typography,
    Paper,
} from "@mui/material";
import { styled } from "@mui/system";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ProfileContainer = styled(Paper)({
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "600px",
    margin: "auto",
    marginTop: "40px",
});

const ProfileHeader = styled("div")({
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
});

const UpdateButton = styled(Button)({
    marginTop: "20px",
    backgroundColor: "#007bff",
    color: "#fff",
    ":hover": { backgroundColor: "#0056b3" },
    width: "100%",
});

const ProfileSettings = () => {
    const [formData, setFormData] = useState({
        email: "arma@magika.studio",
        fullName: "Arma Yoga",
        password: "000000",
    });


    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    return (
        <ProfileContainer elevation={3}>
            <Typography variant="h6" fontWeight={600}>
                Personal Information
            </Typography>

            {/* Profile Avatar */}
            <ProfileHeader>
                <Avatar sx={{ width: 60, height: 60 }} />
                <Typography>{formData.email}</Typography>
            </ProfileHeader>

            {/* Full Name */}
            <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />


            {/* email */}
            <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />


            {/* password */}
            <TextField
                fullWidth
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />


            {/* Update Profile Button */}
            <UpdateButton variant="contained">Update Profile</UpdateButton>
        </ProfileContainer>
    );
};

export default ProfileSettings;
