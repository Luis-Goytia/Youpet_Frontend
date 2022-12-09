import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../Header";
import { getServices } from "../../../../Redux/actions";

export default function ServicesInfo() {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", 
    headerName: "ID",
    renderCell: ({ row: { id } }) => {
      return( 
      <Link to={`/serv/${id}`} className="text-decoration-none">{id}</Link>
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
      field: "type",
      headerName: "Last name",
      flex: 1,
      cellClassName: "type-column--cell",
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      cellClassName: "price-column--cell",
    },
    {
      field: "timelapse",
      headerName: "Timelapse",
      flex: 1,
    },
    {
      field: "detail",
      headerName: "Detail Number",
      flex: 1,
      cellClassName: "detail-column--cell",
    },
  ];

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  return (
    <Box m="20px">
      <Header title="Contacts" subtitle="List of contacts" />
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
          rows={services}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
}