import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Swal from "sweetalert2";

import userPlaceholder from "./user-placeholder.png"
import userStyle from "./user.module.css"

function FormUser() {
  const [formSuccess, setformSuccess] = useState(false);
  const [userImg, setUserImg] = useState("");
  const handleImageUpload = (e, setFieldValue) => {
    const file = e.target.files[0];
    transformFile(file, setFieldValue);
  };
  const transformFile = (file, setFieldValue) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUserImg(reader.result);
        setFieldValue("img", reader.result);
      };
    } else {
      setUserImg("");
      setFieldValue("img", "");
    }
  };

  return (
    <div className="container-md">
      <Formik
        initialValues={{
          name: "",
          lastname: "",
          username: "",
          dni: "",
          email: "",
          password: "",
          passwordCopy: "",
          address: "",
          img: "",
        }}
        validate={(values) => {
          let errors = {};
          if (!values.name) {
            errors.name = "Please enter a name";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
            errors.name = "You can only enter letters";
          }
          if (!values.lastname) {
            errors.lastname = "Please enter a last name";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
            errors.lastname = "You can only enter letters";
          }
          if (!values.username) {
            errors.username = "Please enter a last username";
          } else if (!/^[a-zA-Z0-9\\-]{4,16}$/.test(values.username)) {
            errors.username = "You can enter letters and numbers";
          }
          if (!values.dni) {
            errors.dni = "Please enter DNI number";
          } else if (!/^\d{4,9}$/.test(values.dni) || values.dni < 0) {
            errors.dni = "invalid DNI";
          }
          if (!values.email) {
            errors.email = "You can only enter a valid email";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              values.email
            )
          ) {
            errors.email = "You can only enter a valid email";
          }
          if (!values.passwordCopy) {
            errors.passwordCopy = "Please enter a password";
          } else if (!/^[a-zA-Z0-9\\-]{7,16}$/.test(values.passwordCopy)) {
            errors.passwordCopy = "Must have at least 8 digits";
          }
          if (!values.password) {
            errors.password = "Please enter password again";
          } else if (values.passwordCopy !== values.password) {
            errors.password = "The passwords do not match";
          }
          if (!values.address) {
            errors.adress = "Please enter an address";
          } else if (values.address.length < 10 && values.address.length > 30) {
            errors.adress = "Enter a correct address";
          }

          return errors;
        }}
        onSubmit={(values) => {
          axios
            .post("https://youpet-production.up.railway.app/register/", values, {})
            .then((res) => {
              Swal.fire({
                //icon: "succes",
                title: `Done!
                Check your inbox to verify your account`,
                showConfirmButton: false,
                timer: 5000,
              });
              /* navigate("/login"); */
            })
            .catch((error) =>
              Swal.fire({
                icon: "error",
                title: "existe un error",
                text: `${error}`,
              })
            );
        }}
      >
        {({ errors, setFieldValue }) => (
          <div className="contenedor">
            <Form className="row g-3">
              <div className={userStyle.back_container}>
                <div className={"rounded-circle " + userStyle.img_container}>
                  <img
                    className={userStyle.img_user}
                    src={userImg ? userImg : userPlaceholder}
                    alt="userImg"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="files" className={"btn " + userStyle.selectLabel}>Select Image</label>

                <input
                  className={userStyle.selectButton}
                  id="files"
                  type="file"
                  name="img"
                  accept=".png, .jpg, .jpeg, .svg"
                  onChange={(e) => handleImageUpload(e, setFieldValue)}
                />
              </div>
              <div>
                <label htmlFor="name">Name</label>
                <Field
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Jane"
                />
                <ErrorMessage
                  name="name"
                  render={(msg) => <p className="text-danger">{msg}</p>}
                />
              </div>
              <div>
                <label htmlFor="lastname">Lastname</label>
                <Field
                  type="text"
                  name="lastname"
                  className="form-control"
                  placeholder="Doe"
                />
                <ErrorMessage
                  name="lastname"
                  render={(msg) => <p className="text-danger">{msg}</p>}
                />
              </div>
              <div>
                <label htmlFor="userName">Username</label>
                <Field
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="IloveYoupet"
                />
                <ErrorMessage
                  name="username"
                  render={(msg) => <p className="text-danger">{msg}</p>}
                />
              </div>
              <div className="password">
                <div className="row g-3 align-items-center">
                  <div className="col-auto">
                    <label htmlFor="inputPassword6" className="col-form-label">
                      Password
                    </label>
                  </div>
                  <div className="col-auto">
                    <Field
                      type="password"
                      name="passwordCopy"
                      className="form-control"
                      aria-describedby="passwordHelpInline"
                    />
                    <ErrorMessage
                      name="passwordCopy"
                      render={(msg) => <p className="text-danger">{msg}</p>}
                    />
                  </div>
                  <div className="col-auto">
                    <span id="passwordHelpInline" className="form-text">
                      Must have at least 8 digits
                    </span>
                  </div>
                </div>
              </div>
              <div className="password">
                <div className="row g-3 align-items-center">
                  <div className="col-auto">
                    <label htmlFor="inputPassword6" className="col-form-label">
                      Confirm Password
                    </label>
                  </div>
                  <div className="col-auto">
                    <Field
                      type="password"
                      name="password"
                      className="form-control"
                      aria-describedby="passwordHelpInline"
                    />
                    <ErrorMessage
                      name="password"
                      render={(msg) => <p className="text-danger">{msg}</p>}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="dni">DNI</label>
                <Field
                  type="number"
                  name="dni"
                  className="form-control"
                  placeholder="40558499"
                />
                <ErrorMessage
                  name="dni"
                  render={(msg) => <p className="text-danger">{msg}</p>}
                />
                <span id="passwordHelpInline" className="form-text">
                  Enter number without dots
                </span>
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Field
                  type="text"
                  name="email"
                  className="form-control"
                  placeholder="email@example.com"
                />
                <ErrorMessage
                  name="email"
                  render={(msg) => <p className="text-danger">{msg}</p>}
                />
              </div>
              <div>
                <label htmlFor="address">Address</label>
                <Field
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder="Fake Street 123"
                />
                <ErrorMessage
                  name="address"
                  render={(msg) => <p className="text-danger">{msg}</p>}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              {formSuccess && <p className="text-success">Usuario Creado</p>}
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default FormUser;

//agregar img de perfil
//opciones de provincias
//verificar users existentes
