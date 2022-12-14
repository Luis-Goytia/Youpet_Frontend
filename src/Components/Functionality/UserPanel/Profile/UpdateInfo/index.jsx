import React, { useEffect, useState } from "react";
import upInfoStyle from "./upInfo.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import userPlaceholder from "../../../../../img/user-placeholder.png";
import loadingSvg from "../../../../../img/loading_dualring.svg";
import { useSelector, useDispatch } from "react-redux";
import { updateUserByPanel, clearUpdateUserByPanel, getMyUser } from "../../../../../Redux/actions";
import { Box } from "@mui/material";
import Header from "../../Header";
import Swal from "sweetalert2";

const UpdateInfo = () => {
  const [userImg, setUserImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const myuser = useSelector((state) => state.myuser);
  const updateUserState = useSelector((state) => state.updateUserByPanel);
  const dispatch = useDispatch();

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
      // setUserImg("");
      // setFieldValue("img", "");
    }
  };

  useEffect(() => {
    if (isLoading) {
      if (updateUserState[0] === "nada") {
        Swal.fire({
          iconHtml: `<img src=${loadingSvg} alt="Loading"/>`,
          title: `Loading`,
          showConfirmButton: false,
        });
      } else if (updateUserState[0] === "ok") {
        setTimeout(() => {
          Swal.close();
        }, "400");

        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: `Updated sucessfully`,
            showConfirmButton: false,
            timer: 1000,
          });
        }, "600");
        setIsLoading(false);
        dispatch(getMyUser());
      } else if (updateUserState[0] === "error") {
        setTimeout(() => {
          Swal.close();
        }, "400");

        setTimeout(() => {
          Swal.fire({
            icon: "error",
            title: `error`,
            showConfirmButton: false,
            timer: 1000,
          });
        }, "600");
        setIsLoading(false);
      }
    }
  }, [isLoading, updateUserState, dispatch]);

  const handleSubmit = (value) => {


    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        dispatch(clearUpdateUserByPanel());
        dispatch(updateUserByPanel(value, value.UserId));
      }
    })




  };

  return (
    <Box className={upInfoStyle.container}>
      <Box m="20px">
        <Header title="Update info" subtitle="Here you can edit your info" />
      </Box>

      <Box>
        {myuser?.id ? (
          <Formik
            initialValues={{
              name: myuser.name ? myuser.name : "",
              lastname: myuser.lastname ? myuser.lastname : "",
              password: myuser.password ? myuser.password : "",
              conpass: myuser.password ? myuser.password : "",
              tel: myuser.tel ? myuser.tel : "",
              address: myuser.address ? myuser.address : "",
              img: myuser.img ? myuser.img : "",
              UserId: myuser?.id || "",
            }}
            validate={(values) => {
              let errors = {};

              if (!values.name) {
                errors.name = "Please insert a first name";
              } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
                errors.name =
                  "The first name can only be alphabetical characters";
              }

              if (!values.lastname) {
                errors.lastname = "Please insert a last name";
              } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.lastname)) {
                errors.lastname =
                  "The lastname can only be alphabetical characters";
              }

                if (!/^[0-9]*$/.test(values.tel)) {
                errors.tel =
                  "The Tel can only contain numbers";
              }

              if (!values.password) {
                errors.password = "Please insert a password";
              } else if (values.password.length < 8) {
                errors.password = "Password needs to be 8 or longer";
              }
               else if (values.password !== values.conpass) {
                errors.password = "The passwords needs to match";
              }

              if (values.conpass !== values.password) {
                errors.conpass = "The passwords needs to match";
              }

              return errors;
            }}
            onSubmit={(values, { resetForm, setFieldValue }) => {
              handleSubmit(values, resetForm, setFieldValue);
            }}
          >
            {({ errors, setFieldValue }) => (
              <div className={upInfoStyle.contenedor}>
                <Form className={upInfoStyle.formulario}>
                  <div className={upInfoStyle.back_container}>
                    <div
                      className={"rounded-circle " + upInfoStyle.img_container}
                    >
                      <img
                        className={upInfoStyle.img_user}
                        src={userImg ? userImg : myuser.img || userPlaceholder}
                        alt="userImg"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="files"
                      className={"btn " + upInfoStyle.selectLabel}
                    >
                      Change Image
                    </label>

                    <input
                      className={upInfoStyle.selectButton}
                      id="files"
                      type="file"
                      name="img"
                      accept=".png, .jpg, .jpeg, .svg"
                      onChange={(e) => handleImageUpload(e, setFieldValue)}
                    />
                  </div>

                  <div className={upInfoStyle.formGroup}>
                    <div>
                      <label htmlFor="name">Name: </label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Insert name here..."
                      />
                      <ErrorMessage
                        name="name"
                        component={() => (
                          <div className={upInfoStyle.error}>{errors.name}</div>
                        )}
                      />
                    </div>

                    <div>
                      <label htmlFor="lastname"> Lastname: </label>
                      <Field
                        type="text"
                        id="lastname"
                        name="lastname"
                        placeholder="Insert lastname here..."
                      />
                      <ErrorMessage
                        name="lastname"
                        component={() => (
                          <div className={upInfoStyle.error}>
                            {errors.lastname}
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  <div className={upInfoStyle.formGroup}>
                    <div>
                      <label htmlFor="tel">Tel: </label>
                      <Field
                        type="text"
                        id="tel"
                        name="tel"
                        placeholder="Insert tel here..."
                      />
                      <ErrorMessage
                        name="tel"
                        component={() => (
                          <div className={upInfoStyle.error}>{errors.tel}</div>
                        )}
                      />
                    </div>

                    <div>
                      <label htmlFor="address"> Address: </label>
                      <Field
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Insert address here..."
                      />
                      <ErrorMessage
                        name="address"
                        component={() => (
                          <div className={upInfoStyle.error}>
                            {errors.address}
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  <div className={upInfoStyle.formGroup}>
                    <div>
                      <label htmlFor="password">Password: </label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Insert password here..."
                      />
                      <ErrorMessage
                        name="password"
                        component={() => (
                          <div className={upInfoStyle.error}>
                            {errors.password}
                          </div>
                        )}
                      />
                    </div>

                    <div>
                      <label htmlFor="conpass"> Confirm password: </label>
                      <Field
                        type="password"
                        id="conpass"
                        name="conpass"
                        placeholder="Confirm password"
                      />
                      <ErrorMessage
                        name="conpass"
                        component={() => (
                          <div className={upInfoStyle.error}>
                            {errors.conpass}
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  <button type="submit">Update</button>
                </Form>
              </div>
            )}
          </Formik>
        ) : (
          <img src={loadingSvg} alt="loading" />
        )}
      </Box>
    </Box>
  );
};

export default UpdateInfo;
