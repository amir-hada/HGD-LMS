import React from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  useTheme
} from "@mui/material";
import AlbumOutlinedIcon from "@mui/icons-material/AlbumOutlined";

const Profile = ({
  userName = "",
  designation = "",
  userimg = "",
  isCollapse = false,
  onLogout
}) => {
  const theme = useTheme();

  return (
    <Box>
      {!isCollapse &&
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          sx={{
            m: 3,
            p: 2,
            borderRadius: "8px",
            // Slightly transparent secondary color, using alpha
            bgcolor: theme.palette.secondary.main + "20"
          }}
        >
          <Avatar alt={userName} src={userimg} />

          <Box>
            <Typography variant="h6">
              {userName}
            </Typography>
            <Typography variant="caption">
              {designation}
            </Typography>
          </Box>

          <Box sx={{ ml: "auto" }} onClick={onLogout}>
            <Tooltip title="Logout" placement="top">
              <IconButton color="primary" aria-label="logout" size="small">
                <AlbumOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>}
    </Box>
  );
};

export { Profile };
