"use client";

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
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  LogoutOutlined,
  ManageAccounts,
  SchoolOutlined,
  VideoLibrary,
} from "@mui/icons-material";

import { useMediaQuery } from "@mui/material";

import { yekanFont } from "@/utils/fonts";

export const SidebarContext = createContext();

const Links = ({ component: Component = "a", children, ...props }) => {
  if (Component === Link) {
    return (
      <Link
        href={props.href}
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "block",
          width: "100%",
        }}
        target={props.target}
      >
        {children}
      </Link>
    );
  }
  return (
    <Component
      {...props}
      style={{ textDecoration: "none", color: "inherit", display: "block", width: "100%" }}
    >
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
    fontWeight: "bold",
    fontSize: "1.3rem",
    fontFamily: yekanFont.style.fontFamily,
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
          children
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
              fontFamily: yekanFont.style.fontFamily,
            }}
          >
            {!customizer.isCollapse ? subHeading : ""}
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
    display: "flex",
    alignItems: "center",
    justifyContent: customizer.isCollapse ? "center" : (theme.direction === "ltr" ? "flex-start" : "flex-end"),
    "& .MuiListItemIcon-root": {
      color: customizer.textColor,
      minWidth: "auto",
      marginRight: customizer.isCollapse && theme.direction === "ltr" ? 0 : 10,
      marginLeft: customizer.isCollapse && theme.direction === "rtl" ? 0 : 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 36,
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

  return (
    <Links component={component} href={link} target={target}>
      <ListItemStyled selected={isSelected} disableRipple={disabled}>
        <ListItemIcon>{icon ? icon : <CircleOutlined />}</ListItemIcon>
        {!customizer.isCollapse && (
          <>
            <ListItemText
              sx={{ my: 0 }}
              primary={
                <Typography
                  variant="caption"
                  fontSize={textFontSize}
                  lineHeight={1}
                  sx={{ fontFamily: yekanFont.style.fontFamily }}
                >
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
  onLogout = () => alert("خروج با موفقیت انجام شد"),
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
            fontFamily: yekanFont.style.fontFamily,
          }}
        >
          <Avatar alt={userName} src={userimg} />
          <Box>
            <Typography variant="h6">{userName}</Typography>
            <Typography variant="caption">{designation}</Typography>
          </Box>
          <Box sx={{ ml: "auto" }} onClick={onLogout} style={{ cursor: "pointer" }}>
            <Tooltip title="خروج" placement="top">
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
  width = 270,
  collapsewidth = 80,
  textColor = "#2b2b2b",
  themeColor = "#5d87ff",
  themeSecondaryColor = "#49beff",
  mode = "light",
  direction = "rtl",
  userName,
  designation,
  userimg,
  onLogout,
  children,
}) => {
  const [isCollapse, setIsCollapse] = useState(false);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  // روی دسکتاپ collapse می‌کنه، روی موبایل سایدبار به صورت drawer باز/بسته میشه
  const sidebarWidth = isCollapse ? collapsewidth : width;

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
            display: "flex",
            height: "100vh",
            bgcolor: mode === "dark" ? "#222" : "#fff",
            position: "relative",
          }}
        >
          {/* دکمه باز/بسته کردن موبایل */}
          {isSmallScreen && (
            <IconButton
              onClick={() => setIsSidebarOpenMobile(true)}
              sx={{
                position: "fixed",
                top: 16,
                left: direction === "rtl" ? "auto" : 16,
                right: direction === "rtl" ? 16 : "auto",
                zIndex: 1500,
                bgcolor: "#5d87ff",
                color: "#fff",
                "&:hover": { bgcolor: "#4a6de0" },
              }}
              aria-label="باز کردن منو"
              size="large"
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* سایدبار دسکتاپ */}
          {!isSmallScreen && (
            <Box
              sx={{
                width: sidebarWidth,
                flexShrink: 0,
                color: textColor,
                bgcolor: mode === "dark" ? "#222" : "#fff",
                overflowY: "auto",
                transition: "width 0.3s ease",
                borderRight: direction === "ltr" ? `1px solid #ddd` : "none",
                borderLeft: direction === "rtl" ? `1px solid #ddd` : "none",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={() => {
                if (isCollapse) setIsCollapse(false);
              }}
              onMouseLeave={() => {
                if (!isCollapse) setIsCollapse(true);
              }}
            >
              <Logo component={Link} href="/" img="">
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
                <MenuItem icon={<SchoolOutlined />} link="/my-courses">
                  دوره های من
                </MenuItem>
              </Menu>

              <Profile
                userName={userName}
                designation={designation}
                userimg={userimg}
                isCollapse={isCollapse}
                onLogout={onLogout}
              />

              {/* دکمه toggle باز/بسته کردن */}
              <Box sx={{ flexGrow: 1 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <IconButton
                  onClick={() => setIsCollapse(!isCollapse)}
                  aria-label={isCollapse ? "باز کردن سایدبار" : "بستن سایدبار"}
                  sx={{
                    color: textColor,
                    bgcolor: "#f0f0f0",
                    "&:hover": { bgcolor: "#e0e0e0" },
                  }}
                  size="small"
                >
                  {isCollapse ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </Box>
            </Box>
          )}

          {/* سایدبار موبایل به صورت drawer */}
          {isSmallScreen && isSidebarOpenMobile && (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                bottom: 0,
                width: 270,
                bgcolor: "#fff",
                zIndex: 1600,
                direction,
                boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                overflowY: "auto",
                p: 1,
                display: "flex",
                flexDirection: "column",
                animation: "slideIn 0.3s forwards",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton
                  onClick={() => setIsSidebarOpenMobile(false)}
                  aria-label="بستن منو"
                  size="large"
                >
                  <ChevronLeftIcon />
                </IconButton>
              </Box>

              <Logo component={Link} href="/" img="">
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
                <MenuItem icon={<SchoolOutlined />} link="/my-courses">
                  دوره های من
                </MenuItem>
              </Menu>

              <Profile
                userName={userName}
                designation={designation}
                userimg={userimg}
                isCollapse={false}
                onLogout={onLogout}
              />
            </Box>
          )}

          {/* محتوای اصلی */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              overflowY: "auto",
              fontFamily: yekanFont.style.fontFamily,
              direction,
              transition: "margin 0.3s ease",
              marginLeft:
                !isSmallScreen && !isCollapse && direction === "ltr"
                  ? `${sidebarWidth}px`
                  : undefined,
              marginRight:
                !isSmallScreen && !isCollapse && direction === "rtl"
                  ? `${sidebarWidth}px`
                  : undefined,
            }}
          >
            {children}
          </Box>
        </Box>
      </SidebarContext.Provider>
    </ThemeProvider>
  );
};

export default Sidebar;
