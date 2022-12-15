import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import {FacebookLoginButton} from "react-social-login-buttons"
import {LoginSocialFacebook} from "reactjs-social-login"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../../../img/logo.png";
import { getMyUser, getUserByEmail } from "../../../../Redux/actions";
import "./index.css";


export default function Login() {
  const [formSuccess] = useState(false);
  const [email] = useState(" ");
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMyUser());
  }, [dispatch]);

  useEffect(() => {
    if (user.length < 1) dispatch(getUserByEmail(email));
  }, [dispatch, user, email]);

  const responseFacebook = (response) => {
    let username = response.name.split(' ')
    const datef = {
      name: response.first_name,
      lastname: response.last_name,
      username: response.userID + "fblogin",
      password: response.id,
      img: response.picture.data.url,
      email: response.email,
    };
    const datefMini = {
      password: response.id,
      email: response.email,
    };

    axios.post("https://youpet-production.up.railway.app/login/", datefMini).then((res) => {
      localStorage.setItem("jwt", res.data.data);
      dispatch(getMyUser());
      navigate("/");
    }).catch((error) => {
      axios
        .post("https://youpet-production.up.railway.app/register/", datef, {})
        .then((res) => {
          Swal.fire({
            title: `Done!
            Check your inbox to verify your account`,
            showConfirmButton: false,
            timer: 5000,
          });
        })
        .catch((error) =>
          Swal.fire({
            icon: "error",
            title: "existe un error",
            text: `${error}`,
          })
        );
    })
  }

  return (
    <div className="backgroud">
      <div className="containerlogin">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={(values) => {
            let errors = {};
            if (!values.email) {
              errors.email = "Please enter an email";
            } else if (
              !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                values.email
              )
            ) {
              errors.email = "You can only enter a valid email";
            }
            if (!values.password) {
              errors.password = "Please enter a password";
            } else if (
              values.password.length < 5 ||
              values.password.length > 16
            ) {
              errors.password = "Must have at least 5 digits";
            }
            return errors;
          }}
          onSubmit={(value) => {
            axios.post("https://youpet-production.up.railway.app/login/", value).then((res) => {
              localStorage.setItem("jwt", res.data.data);
              dispatch(getMyUser());
              navigate("/");
            }).catch((error) => {
              Swal.fire({
                icon: "error",
                title: "There is an error",
                text: `${error.response.data}`,

              })
            }
            );
          }}
        >
          {({ errors }) => (
            <div className="login">
              <Form className="form">
                <div className="logo">
                  <img src={logo} alt="Bootstrap" height="55" />
                </div>
                <div className="mb-3">
                  <label htmlFor="InputEmail1" className="form-label">
                    Email
                  </label>
                  <Field
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="example@example.com"
                  />
                  <ErrorMessage
                    name="email"
                    component={() => (
                      <p className="text-danger">{errors.email}</p>
                    )}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="inputPassword" className="form-label">
                    Password
                  </label>
                  <Field
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                  />
                  <ErrorMessage
                    name="password"
                    component={() => (
                      <p className="text-danger">{errors.password}</p>
                    )}
                  />
                </div>
                <div>
                  <span>If you are not registered, </span>
                  <Link to={"/reguser"}>
                    <span>click here</span>
                  </Link>
                </div>
                <button type="submit" className="btn btn-primary ">
                  Submit
                </button>
                {formSuccess && (
                  <p className="text-success">¡Welcome {user.name}!</p>
                )}
                <div>
                  <br></br>
                  <br></br>
                  <LoginSocialFacebook
                  appId="692975102401845"
                  onResolve={(e)=>responseFacebook(e.data)}
                  onReject={(e)=> console.log(e)}
                  >
                    <FacebookLoginButton />
                  </LoginSocialFacebook>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}
