import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Grid } from "@mui/material";
import Header from "../../Header";
import { createService } from "../../../../../Redux/actions";

export default function ServiceRegister() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    type: "",
    price: "",
    timelapse: "",
    img: "",
    detail: "",
  });

  function validate(input) {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexNumber = /^[0-9]+$/;

    if (!input.name.trim()) {
      errors.name = "Please enter a name";
    } else if (!regexName.test(input.name.trim())) {
      errors.name = "Can only enter letters";
    }
    if (!input.type.trim()) {
      errors.type = "Please enter a type";
    } else if (!regexName.test(input.type.trim())) {
      errors.type = "Can only enter letters";
    }
    if (!input.price.trim()) {
      errors.price = "Please enter a price";
    } else if (!regexNumber.test(input.price)) {
      errors.price = "Can only enter numbers";
    }
    if (!input.timelapse.trim()) {
      errors.timelapse = "Please enter a timelapse";
    } else if (input.timelapse.length > 4) {
      errors.timelapse = "Please enter a valid timelapse";
    } else if (!regexNumber.test(input.timelapse)) {
      errors.timelapse = "Can only enter numbers";
    }
    if (!input.img.trim()) {
      errors.img = "Please enter an image";
    }
    if (!input.detail.trim()) {
      errors.detail = "Please enter a detail";
    } else if (input.detail.lenght > 255) {
      errors.detail = "You can enter only 255 characters";
    }

    return errors;
  }

  function handleInput(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }

  function handleErrors(event) {
    handleInput(event);
    setErrors(validate(input));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setErrors(validate(input));
    if (Object.keys(errors).length === 0) {
      dispatch(createService(input));
      alert("Vet register successfully");
      setInput({
        name: "",
        type: "",
        price: "",
        timelapse: "",
        img: "",
        detail: "",
      });
    }
  }

  return (
    <Box>
      <Box m="20px" p="50px">
        <Box display="flex" justifycontent="space-between" alignItems="center">
          <Header
            title="Service Register"
            subtitle="Form to register new service"
          />
        </Box>
        <form onSubmit={(event) => handleSubmit(event)}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item lg={3}>
              <Box p="10px">
                <Box>
                  <label>Name</label>
                </Box>
                <Box>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Enter service name"
                    value={input.name}
                    onChange={(event) => handleInput(event)}
                    onBlur={(event) => handleErrors(event)}
                  />
                  {errors.name && <p className="error">{errors.name}</p>}
                </Box>
              </Box>
            </Grid>
            <Grid item lg={3}>
              <Box p="10px">
                <Box>
                  <label>Type</label>
                </Box>
                <Box>
                  <input
                    className="form-control"
                    type="text"
                    name="type"
                    placeholder="Enter service type"
                    value={input.type}
                    onChange={(event) => handleInput(event)}
                    onBlur={(event) => handleErrors(event)}
                  />
                  {errors.type && <p className="error">{errors.type}</p>}
                </Box>
              </Box>
            </Grid>
            <Grid item lg={2}>
              <Box p="10px">
                <Box>
                  <label>Price</label>
                </Box>
                <Box>
                  <input
                    className="form-control"
                    type="text"
                    name="price"
                    placeholder="Enter service price"
                    value={input.price}
                    onChange={(event) => handleInput(event)}
                    onBlur={(event) => handleErrors(event)}
                  />
                  {errors.price && <p className="error">{errors.price}</p>}
                </Box>
              </Box>
            </Grid>
            <Grid item lg={2}>
              <Box p="10px">
                <Box>
                  <label>Timelapse</label>
                </Box>
                <Box>
                  <input
                    className="form-control"
                    type="text"
                    name="timelapse"
                    placeholder="Enter service timelapse"
                    value={input.timelapse}
                    onChange={(event) => handleInput(event)}
                    onBlur={(event) => handleErrors(event)}
                  />
                  {errors.timelapse && <p className="error">{errors.timelapse}</p>}
                </Box>
              </Box>
            </Grid>
            <Grid item lg={3}>
              <Box p="10px">
                <Box>
                  <label>Image</label>
                </Box>
                <Box>
                  <input
                    className="form-control"
                    type="text"
                    name="img"
                    placeholder="Enter service img"
                    value={input.img}
                    onChange={(event) => handleInput(event)}
                    onBlur={(event) => handleErrors(event)}
                  />
                  {errors.img && <p className="error">{errors.img}</p>}
                </Box>
              </Box>
            </Grid>
            <Grid item lg={5}>
              <Box p="10px">
                <Box>
                  <label>Detail</label>
                </Box>
                <Box>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1" 
                    rows="3"
                    type="text"
                    name="detail"
                    placeholder="Enter service detail"
                    value={input.detail}
                    onChange={(event) => handleInput(event)}
                    onBlur={(event) => handleErrors(event)}
                  />
                  {errors.detail && <p className="error">{errors.detail}</p>}
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box p="50px">
            <button type="submit" className="btn btn-primary">
              Sumbit
            </button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
