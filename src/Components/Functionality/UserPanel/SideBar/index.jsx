import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ProSidebarProvider, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../theme";
import userPlaceholder from "../../../../img/user-placeholder.png";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PetsIcon from "@mui/icons-material/Pets";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useEffect } from "react";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[400],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      routerLink={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

export default function SideBar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const myuser = useSelector((state) => state.myuser);
  const navigate = useNavigate();

  

 useEffect(()=>{
  const path = `/`;
  if (!(myuser?.id)){
        navigate(path)
  }
 }, [myuser, navigate])

  const ruta = "/userpanel";

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[100]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebarProvider collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[200],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[400]}>
                  PANEL
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100px"
                  width="100px"
                  overflow="hidden"
                  borderRadius="50%"
                >
                  <img
                    alt="profile-user"
                    height="100%"
                    src={myuser?.img ? myuser.img : userPlaceholder}
                    style={{ cursor: "pointer" }}
                  />
                </Box>
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[200]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {myuser?.name
                    ? `${myuser.name} ${myuser.lastname}`
                    : "No data"}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <hr />
            <Typography variant="h6">Info</Typography>
            <Item
              title="Info"
              to={ruta}
              icon={<AccountCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <hr />
            <Typography variant="h6">Pets</Typography>
            <Item
              title="My pets"
              to={ruta + "/MyPets"}
              icon={<PetsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add new pet"
              to={ruta + "/addpet"}
              icon={<AddCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <hr />
            <Typography variant="h6">Settings</Typography>
            <Item
              title="Update info"
              to={ruta + "/update"}
              icon={<ManageAccountsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebarProvider>
    </Box>
  );
}
