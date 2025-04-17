import { Box, Typography, Avatar, Button } from '@mui/material';
import { Group } from '@mui/icons-material';

const TeamMembers = () => (
  <Box className="team-members-container">
    <Box className="team-members-header">
      <Box className="team-members-title">
        <Group className="team-icon" />
        <Typography variant="body1" className="team-members-text">
          Team Members
        </Typography>
      </Box>
      <Button className="add-member-button">
        Add member +
      </Button>
    </Box>
    <Box className="avatars-container">
      {['A', 'B', 'C', 'D'].map((initial, index) => (
        <Avatar key={index} className="avatar">
          {initial}
        </Avatar>
      ))}
      <Avatar className="avatar">
        +6
      </Avatar>
    </Box>
  </Box>
);

export default TeamMembers;