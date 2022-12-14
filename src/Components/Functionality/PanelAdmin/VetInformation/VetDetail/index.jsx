import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { ColorModeContext, useMode } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { tokens } from "../../theme";
import {
  Box,
  CssBaseline,
  Typography,
  ThemeProvider,
  Grid,
  Button,
  useTheme,
} from "@mui/material";
import Header from "../../Header";
import { clearDetails, deleteVet, getVetsDetail, 
  updateVet 
} from "../../../../../Redux/actions";

export default function AdminVetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theeme = useTheme();
  const vet = useSelector((state) => state.vetDetail);
  const colors = tokens(theeme.palette.mode);
  const [theme, colorMode] = useMode();

  function delVet() {
    dispatch(deleteVet(id));
    var respuesta = window.confirm("Confirm delete?");
    if (respuesta) alert("Vet deleted");
    else alert("You are not allowed to delete");
    navigate("/admin/allvets");
  }

  function handleStatusVet(){
    if (vet.isActive === true) {
      let payload = {isActive : false}
      dispatch(updateVet(id,payload));
    }else {
      let payload = {isActive : true}
      dispatch(updateVet(id,payload));
    };
    navigate(0)
  }

  useEffect(() => {
    dispatch(getVetsDetail(id));
    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch, id]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box>
          <Box p="20px">
            <Link
              to="/admin/allvets"
              type="button"
              className="text-decoration-none btn btn-primary"
            >
              Back to all vets
            </Link>
            <Button
              variant="contained"
              color="error"
              onClick={(event) => delVet(event)}
            >
              Delete Vet
            </Button>
          </Box>
          <Box p="20px">
            <Box>
              <Header title="Vet" subtitle="Managing Vets" />
            </Box>
          </Box>
          <Box>
            <Box p="5px">
              <img
                src={vet.img}
                alt="service pic"
                width="500px"
                height="350px"
              />
              <Typography variant="h2" sx={{ m: "10px 0 5px 0" }}>
                {vet.name} {vet.lastname}
              </Typography>
            </Box>
          </Box>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item lg={2}>
              <Box p="10px">
                <Box
                  width="60%"
                  m="0 auto"
                  p="5px"
                  display="flex"
                  justifyContent="center"
                  backgroundColor={
                    vet.isActive === true
                      ? colors.greenAccent[600]
                      : colors.redAccent[700]
                  }
                  borderRadius="4px"
                  type="button"
                  onClick={(event)=>handleStatusVet(event)}
                >
                  {vet.isActive === true && <AdminPanelSettingsOutlinedIcon />}
                  {vet.isActive === false && <LockOpenOutlinedIcon />}
                </Box>
                <Typography variant="h3" sx={{ m: "10px 0 5px 0" }}>
                  Is Active
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}