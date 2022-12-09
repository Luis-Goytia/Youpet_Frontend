import React, { useState } from "react";
import { useDispatch } from "react-redux";
//import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Grid } from "@mui/material";
import Header from "../Header";
import { createAdmin } from "../../../../Redux/actions";



  export default function AdminForm() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
      
      name: "",
      lastname: "",
      username: "",
      password: "",
      passwordCopy: "",
      address: "",
      img: "",
      email: "",
      tel: "",
      dni: "",
       
    });

    function validate(input) {
      let errors = {};
      let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
      let regexUsername = /^[A-Za-z0-9\s]+$/g;
      let regexEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
      let regexNumber = /^[0-9]+$/;
      let regexPassword = /(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  
      if (!input.name.trim()) {
        errors.name = "Please enter a name";
      } else if (!regexName.test(input.name.trim())) {
        errors.name = "Can only enter letters";
      }
      if (!input.lastname.trim()) {
        errors.lastname = "Please enter a lastname";
      } else if (!regexName.test(input.lastname.trim())) {
        errors.lastname = "Can only enter letters";
      }
      if (!input.username.trim()) {
        errors.username = "Please enter a username";
      } else if (!regexUsername.test(input.username.trim())) {
        errors.username = "Can only enter letters";
      }
      if (!input.password.trim()) {
        errors.password = "Please enter a password";
      } else if (!regexPassword.test(input.password.trim())) {
        errors.password = "The password must have between 8 and 16 characters, at least one digit, at least one lower case and at least one upper case. It can NOT have other symbols.";
      }

      if(input.password !== input.passwordCopy){
        errors.passwordCopy = "Password and password confirmation must be the same";
      }

      if (!input.address.trim()) {
        errors.address = "Please enter an address";
      } else if (input.address.length < 10 || input.address.lenght > 50) {
        errors.address = "Please enter a valid address";
      }
      if (!input.img.trim()) {
        errors.img = "Please enter an image";
      }
      if (!input.email.trim()) {
        errors.email = "Please enter a email";
      } else if (!regexEmail.test(input.email)) {
        errors.email = "Can only enter an email valid";
      }
      if (!input.tel.trim()) {
        errors.tel = "Please enter a telephone number";
      } else if (input.tel.length < 10) {
        errors.tel = "Please enter a valid telephone number";
      } else if (input.tel.length > 10) {
        errors.tel = "Please enter a valid telephone number";
      } else if(!regexNumber.test(input.tel)){
        errors.tel = "Can only enter numbers";
      }
      if (!input.dni.trim()) {
        errors.dni = "Please enter a DNI";
      } else if (input.dni.length < 8) {
        errors.dni = "Please enter a valid DNI";
      } else if (input.dni.length > 8) {
        errors.dni = "Please enter a valid DNI";
      } else if(!regexNumber.test(input.dni)){
        errors.dni = "Can only enter numbers";
      }
  
      return errors;
    }
  
    function handleInputName(event) {
      setInput({
        ...input,
        [event.target.name]: event.target.value,
      });
    }
    function handleErrors(event) {
      handleInputName(event);
      setErrors(validate(input));
    }
    function handleSubmit(event) {
      event.preventDefault();
      setErrors(validate(input));
      if (Object.keys(errors).length === 0) {
        dispatch(createAdmin(input));
        alert("Admin register successfully");
        setInput({
          name: "",
          lastname: "",
          username: "",
          password: "",
          passwordCopy: "",
          address: "",
          img: "",
          email: "",
          tel: "",
          dni: "",
        });
      }
    }

  return (
    <Box className="container-md">
      <Box m="20px" p="50px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="Admin Register"
            subtitle="Register your admin profile access"
          />
        </Box>
      </Box>
      <form onSubmit={(event)=>handleSubmit(event)}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
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
                  placeholder="Enter your name"
                  value={input.name}
                  onChange={(event) => handleInputName(event)}
                  onBlur={(event) => handleErrors(event)}
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </Box>
            </Box>
          </Grid>
          <Grid item lg={3}>
            <Box p="10px">
              <Box>
                <label>Lastname</label>
              </Box>
              <Box>
                <input
                  className="form-control"
                  type="text"
                  name="lastname"
                  value={input.lastname}
                  onChange={(event) => handleInputName(event)}
                  onBlur={(event) => handleErrors(event)}
                />
                {errors.lastname && <p className="error">{errors.lastname}</p>}
              </Box>
            </Box>
          </Grid>
          <Grid item lg={2}>
            <Box p="10px">
              <Box>
                <label>Username</label>
              </Box>
              <Box>
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  value={input.username}
                  onChange={(event) => handleInputName(event)}
                  onBlur={(event) => handleErrors(event)}
                />
                {errors.username && <p className="error">{errors.username}</p>}
              </Box>
            </Box>
          </Grid>
          <Grid item lg={2}>
            <Box p="10px">
              <Box>
                <label>Password</label>
              </Box>
              <Box>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={(event) => handleInputName(event)}
                  onBlur={(event) => handleErrors(event)}
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </Box>
            </Box>
          </Grid>

          <Grid item lg={2}>
            <Box p="10px">
              <Box>
                <label>Password Confirmation</label>
              </Box>
              <Box>
                <input
                  className="form-control"
                  type="password"
                  name="passwordCopy"
                  value={input.passwordCopy}
                  onChange={(event) => handleInputName(event)}
                  onBlur={(event) => handleErrors(event)}
                />
                {errors.passwordCopy && <p className="error">{errors.passwordCopy}</p>}
              </Box>
            </Box>
          </Grid>

          <Grid item lg={3}>
            <Box p="10px">
              <Box>
                <label>Address</label>
              </Box>
              <Box>
                <input
                  className="form-control"
                  type="text"
                  name="address"
                  value={input.address}
                  onChange={(event) => handleInputName(event)}
                  onBlur={(event) => handleErrors(event)}
                />
                {errors.address && <p className="error">{errors.address}</p>}
              </Box>
            </Box>
          </Grid>

          <Grid item lg={3}>
            <Box p="10px">
              <Box>
                <label>URL Image</label>
              </Box>
              <Box>
                <input
                  className="form-control"
                  type="text"
                  name="img"
                  value={input.img}
                  onChange={(event) => handleInputName(event)}
                  onBlur={(event) => handleErrors(event)}
                />
                {errors.img && <p className="error">{errors.img}</p>}
              </Box>
            </Box>
          </Grid>

          <Grid item lg={3}>
            <Box p="10px">
              <Box>
                <label>Email</label>
              </Box>
              <Box>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={(event) => handleInputName(event)}
                  onBlur={(event) => handleErrors(event)}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </Box>
            </Box>
          </Grid>
         
            
          <Grid item lg={2}>
            <Box p="10px">
              <Box>
                <label>Telephone Number</label>
              </Box>
              <Box>
                <input
                  className="form-control"
                  type="text"
                  name="tel"
                  value={input.tel}
                  onChange={(event) => handleInputName(event)}
                  onBlur={(event) => handleErrors(event)}
                />
                {errors.tel && <p className="error">{errors.tel}</p>}
              </Box>
            </Box>
          </Grid>
          <Grid item lg={2}>
            <Box p="10px">
              <Box>
                <label>DNI</label>
              </Box>
              <Box>
                <input
                  className="form-control"
                  type="text"
                  name="dni"
                  value={input.dni}
                  onChange={(event) => handleInputName(event)}
                  onBlur={(event) => handleErrors(event)}
                />
                {errors.dni && <p className="error">{errors.dni}</p>}
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
  );
}
