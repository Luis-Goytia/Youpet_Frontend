import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Header from "../Header";
import { getUsers } from "../../../../Redux/actions";

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", 
    headerName: "ID",
    renderCell: ({ row: { id } }) => {
      return( 
      <Link to={`/user/${id}`} className="text-decoration-none">{id}</Link>
      )
    }, 
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastname",
      headerName: "Last name",
      flex: 1,
      cellClassName: "lastname-column--cell",
    },
    {
      field: "username",
      headerName: "User Name",
      flex: 1,
      cellClassName: "username-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "isAdmin",
      headerName: "Acces Level",
      flex: 1,
      renderCell: ({ row: { isAdmin } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              isAdmin === true ? colors.greenAccent[600] : colors.redAccent[700]
            }
            borderRadius="4px"
          >
            {isAdmin === true && <AdminPanelSettingsOutlinedIcon />}
            {isAdmin === false && <LockOpenOutlinedIcon />}
          </Box>
        );
      },
    },
    {
      field: "isActive",
      headerName: "Banner Status",
      flex: 1,
      renderCell: ({ row: { isActive } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              isActive === true
                ? colors.greenAccent[600]
                : colors.redAccent[700]
            }
            borderRadius="4px"
          >
            {isActive === true && <AdminPanelSettingsOutlinedIcon />}
            {isActive === false && <LockOpenOutlinedIcon />}
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <Box m="20px">
      <Header title="USERS" subtitle="Managing the Users" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
}
