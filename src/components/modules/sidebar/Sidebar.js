"use client"; // چون داخل app dir هستیم و از useState استفاده می‌کنیم

import React, { useState, createContext } from "react";
import Link from "next/link";
import { styled, useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import AccessAlarms from "@mui/icons-material/AccessAlarms";
import CircleOutlined from "@mui/icons-material/CircleOutlined";
import { LogoutOutlined, ManageAccounts, SchoolOutlined, VideoLibrary } from "@mui/icons-material";
import { yekanFont } from "@/utils/fonts";

export const SidebarContext = createContext();

const Links = ({ component: Component = "a", children, ...props }) => {
  if (Component === Link) {
    // حذف <a> داخل Link و اضافه استایل به خود Link
    return (
      <Link
        href={props.href}
        style={{ textDecoration: "none", color: "inherit", display: "block", width: "100%" }}
        target={props.target}
      >
        {children}
      </Link>
    );
  }
  return (
    <Component {...props} style={{ textDecoration: "none", color: "inherit", display: "block", width: "100%" }}>
      {children}
    </Component>
  );
};

const Logo = ({ component, href = "/", img, children }) => {
  const customizer = React.useContext(SidebarContext);

  const LogoStyled = styled("span")(() => ({
    whiteSpace: "nowrap",
    overflow: customizer.isCollapse ? "hidden" : "visible",
    display: "block",
    padding: "15px 22px",
    textOverflow: "ellipsis",
  }));

  return (
    <Links component={component} href={href}>
      <LogoStyled>
        {img ? (
          <Box
            component="img"
            src={img}
            alt={children}
            sx={{ maxWidth: "120px", display: "block" }}
          />
        ) : (
          <Typography variant="body1">{children}</Typography>
        )}
      </LogoStyled>
    </Links>
  );
};

const Menu = ({ children, subHeading = "Menu" }) => {
  const customizer = React.useContext(SidebarContext);
  return (
    <Box sx={{ px: customizer.isCollapse ? 2 : 3, pt: 2 }}>
      <List
        component="nav"
        subheader={
          <ListSubheader
            component="div"
            sx={{
              py: 0.5,
              color: customizer.textColor,
              px: 0,
              fontWeight: "bold",
              fontSize: 12,
              background: "transparent",
            }}
          >
            {!customizer.isCollapse ? subHeading : "..."}
          </ListSubheader>
        }
      >
        {children}
      </List>
    </Box>
  );
};

const MenuItem = ({
  children,
  icon,
  component,
  badge = false,
  link = "/",
  badgeColor = "secondary",
  badgeContent = "6",
  badgeTextColor = "#fff",
  textFontSize = "14px",
  borderRadius = "8px",
  disabled = false,
  badgeType = "filled",
  target = "",
  isSelected = false,
}) => {
  const customizer = React.useContext(SidebarContext);
  const theme = useTheme();

  const ListItemStyled = styled(ListItemButton)(() => ({
    whiteSpace: "nowrap",
    marginBottom: 4,
    padding: "10px 12px",
    width: "100%",
    textAlign: theme.direction === "ltr" ? "left" : "right",
    borderRadius: borderRadius,
    color: customizer.textColor,
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.6 : 1,
    ".MuiListItemIcon-root": {
      color: customizer.textColor,
    },
    "&:hover": {
      backgroundColor: disabled ? "#fff" : customizer.themeColor + "20",
      color: customizer.themeColor,
      ".MuiListItemIcon-root": {
        color: customizer.themeColor,
      },
    },
    "&.Mui-selected": {
      color: "#fff",
      backgroundColor: customizer.themeColor,
      "&:hover": {
        backgroundColor: customizer.themeColor,
        color: "#fff",
      },
      ".MuiListItemIcon-root": {
        color: "#fff",
      },
    },
  }));

  const ListIConStyled = styled(ListItemIcon)(() => ({
    minWidth: 36,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 0,
    cursor: "pointer",
    color: "inherit",
  }));

  return (
    <Links component={component} href={link} target={target}>
      <ListItemStyled selected={isSelected} disableRipple={disabled}>
        <ListIConStyled>{icon ? icon : <CircleOutlined />}</ListIConStyled>
        {!customizer.isCollapse && (
          <>
            <ListItemText
              sx={{ my: 0 }}
              primary={
                <Typography variant="caption" fontSize={textFontSize} lineHeight={1}>
                  {children}
                </Typography>
              }
            />
            {badge && (
              <Chip
                label={badgeContent}
                color={badgeColor}
                variant={badgeType}
                size="small"
                sx={{ color: badgeTextColor }}
              />
            )}
          </>
        )}
      </ListItemStyled>
    </Links>
  );
};

const Profile = ({
  userName = "محمد محمدی",
  designation = "برنامه نویس",
  userimg = "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-1.jpg",
  isCollapse = false,
  onLogout = () => alert("Logout Successfully"),
}) => {
  const theme = useTheme();
  return (
    <Box>
      {!isCollapse && (
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          sx={{
            m: 3,
            p: 2,
            borderRadius: 2,
            bgcolor: theme.palette.secondary.main + "20",
          }}
        >
          <Avatar alt={userName} src={userimg} />
          <Box>
            <Typography variant="h6">{userName}</Typography>
            <Typography variant="caption">{designation}</Typography>
          </Box>
          <Box sx={{ ml: "auto" }} onClick={onLogout} style={{ cursor: "pointer" }}>
            <Tooltip title="Logout" placement="top">
              <IconButton color="error" size="large" aria-label="logout">
                <LogoutOutlined />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      )}
    </Box>
  );
};

const Sidebar = ({
  width = "270px",
  collapsewidth = "80px",
  textColor = "#2b2b2b",
  isCollapse = false,
  themeColor = "#5d87ff",
  themeSecondaryColor = "#49beff",
  mode = "light",
  direction = "ltr",
  userName,
  designation,
  userimg,
  onLogout,
}) => {
  const [isSidebarHover, setIsSidebarHover] = useState(false);
  const toggleWidth = isCollapse && !isSidebarHover ? collapsewidth : width;

  const myTheme = createTheme({
    direction,
    typography: {
      fontFamily: yekanFont.style.fontFamily || "'Yekan', sans-serif",
    },
    palette: {
      mode,
      primary: { main: themeColor },
      secondary: { main: themeSecondaryColor, contrastText: "#fff" },
    },
  });

  if (mode === "dark") {
    textColor = "rgba(255,255,255, 0.9)";
  }

  return (
    <ThemeProvider theme={myTheme}>
      <SidebarContext.Provider
        value={{
          textColor,
          isCollapse,
          width,
          collapsewidth,
          themeColor,
        }}
      >
        <Box
          sx={{
            width: toggleWidth,
            flexShrink: 0,
            color: textColor,
            bgcolor: mode === "dark" ? "#222" : "#fff",
            height: "100vh",
            overflowY: "auto",
          }}
          onMouseEnter={() => setIsSidebarHover(true)}
          onMouseLeave={() => setIsSidebarHover(false)}
        >
          <Logo
            component={Link}
            href="/"
            img=""
          >
            همگامان دانش
          </Logo>

          <Menu subHeading="مدیریت">
            <MenuItem
              icon={<ManageAccounts />}
              component={Link}
              link="/users-setting"
              badge={true}
              isSelected={true}
            >
              مدیریت کاربران
            </MenuItem>
            <MenuItem icon={<VideoLibrary />} component={Link} link="/manage-course">
              مدیریت دوره ها
            </MenuItem>
          </Menu>

          <Menu subHeading="دوره ها">
            <MenuItem icon={<SchoolOutlined />} link="/my-courses">دوره های من</MenuItem>
          </Menu>


          <Profile
            userName={userName}
            designation={designation}
            userimg={userimg}
            isCollapse={isCollapse}
            onLogout={onLogout}
          />
        </Box>
      </SidebarContext.Provider>
    </ThemeProvider>
  );
};

export default Sidebar;
