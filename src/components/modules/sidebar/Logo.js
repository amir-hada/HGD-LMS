import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SidebarContext } from "./Sidebar";
import Links from "./Links";

const Logo = ({
  children,
  img = "https://adminmart.com/wp-content/uploads/2024/03/logo-admin-mart-news.png",
  href = "/",
  component
}) => {
  const customizer = useContext(SidebarContext);

  const LogoStyled = styled("span")(() => ({
    whiteSpace: "nowrap",
    overflow: customizer.isCollapse ? "hidden" : "visible",
    WebkitLineClamp: "1",
    display: "block",
    padding: "15px 22px",
    textOverflow: "ellipsis"
  }));

  return (
    <Links href={href} component={component} to={href}>
      <LogoStyled>
        {img === ""
          ? <Typography variant="body1">
              {children}
            </Typography>
          : <Box
              component="img"
              sx={{
                display: "flex",
                alignItems: "center"
              }}
              src={img}
            />}
      </LogoStyled>
    </Links>
  );
};

export { Logo };
