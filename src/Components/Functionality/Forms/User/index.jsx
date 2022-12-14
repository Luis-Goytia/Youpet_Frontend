import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import userPlaceholder from "./user-placeholder.png"
import userStyle from "./user.module.css"

function FormUser() {
  const [formSuccess, setformSuccess] = useState(false);
  const navigate = useNavigate();
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
            errors.name = "Por favor ingresa un nombre";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
            errors.name = "Solo puedes ingresar Letras";
          }
          if (!values.lastname) {
            errors.lastname = "Por favor ingresa un apellido";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
            errors.lastname = "Solo puedes ingresar Letras";
          }
          if (!values.username) {
            errors.username = "Por favor ingresa un nombre";
          } else if (!/^[a-zA-Z0-9\\-]{4,16}$/.test(values.username)) {
            errors.username = "Solo puedes ingresar Letras";
          }
          if (!values.dni) {
            errors.dni = "Por favor ingresa numero de dni";
          } else if (!/^\d{4,9}$/.test(values.dni) || values.dni < 0) {
            errors.dni = "DNI invalido";
          }
          if (!values.email) {
            errors.email = "Por favor ingresa un email";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              values.email
            )
          ) {
            errors.email = "Solo puedes ingresar un email valido";
          }
          if (!values.passwordCopy) {
            errors.passwordCopy = "Por favor ingresa una contraseña";
          } else if (!/^[a-zA-Z0-9\\-]{4,16}$/.test(values.passwordCopy)) {
            errors.passwordCopy = "Debe tener al menos 5 digitos";
          }
          if (!values.password) {
            errors.password = "Por favor ingresa nuevamente contraseña";
          } else if (values.passwordCopy !== values.password) {
            errors.password = "La contraseñas no conciden";
          }
          if (!values.address) {
            errors.adress = "Por favor ingresa una direccion";
          } else if (values.address.length < 10 && values.address.length > 30) {
            errors.adress = "Ingresa una direccion correcta";
          }

          return errors;
        }}
        onSubmit={(values) => {
          axios
            .post("http://localhost:3001/register/", values, {})
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
