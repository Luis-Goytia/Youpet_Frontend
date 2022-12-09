import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Header from "../Header";
import { getVets } from '../../../../Redux/actions';

export default function VetInformation() {
  const dispatch = useDispatch()
  const allVets = useSelector(state=> state.vets)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [status, setStatus] = useState(true)

  function handleStatus(event) {
    event.preventDefault();
    if(allVets.isActive === true) {
      setStatus(false)
    } else{
      setStatus(true)
    }
  }

  const columns = [
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
      field: "speciality",
      headerName: "Speciality",
      flex: 1,
      cellClassName: "speciality-column--cell",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      cellClassName: "address-column--cell",
    },
    {
      field:"tel",
      headerName:"Telephon Number",
      flex: 1,
      cellClassName: "telephone-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "dni",
      headerName: "DNI",
      flex: 1,
    },
    {
      field: "inicialDate",
      headerName: "Inicial Date",
      type:"date",
    },
    {
      field: "finishDate",
      headerName: "Finish Date",
      type:"date",
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
            type="button"
            onClick={handleStatus}
          >
            {isActive === true && <AdminPanelSettingsOutlinedIcon />}
            {isActive === false && <LockOpenOutlinedIcon />}
          </Box>
        );
      },
    },
  ];

  useEffect(()=> {
    dispatch(getVets())
  }, [dispatch])

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
        <DataGrid rows={allVets} columns={columns} components={{ Toolbar: GridToolbar }}/>
      </Box>
    </Box>
  );
}