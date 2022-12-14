import React, { useEffect, useState } from "react";
import addPetStyle from "./addpet.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import petPlaceholder from "../../../../../img/pets.png";
import loadingSvg from "../../../../../img/loading_dualring.svg";
import { useSelector, useDispatch } from "react-redux";
import { createPet, clearCreatePet } from "../../../../../Redux/actions";
import { Box } from "@mui/material";
import Header from "../../Header";
import Swal from "sweetalert2";
import { useRef } from "react";

const AddPet = () => {
  const [petImg, setPetImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const myuser = useSelector((state) => state.myuser);
  const createPetState = useSelector((state) => state.createPet);
  const dispatch = useDispatch();
  const formikRef = useRef();

  const handleImageUpload = (e, setFieldValue) => {
    const file = e.target.files[0];
    transformFile(file, setFieldValue);
  };

  const transformFile = (file, setFieldValue) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPetImg(reader.result);
        setFieldValue("img", reader.result);
      };
    } else {
      setPetImg("");
      setFieldValue("img", "");
    }
  };


  useEffect(() => {
    if (isLoading) {
      if (createPetState[0] === "nada") {
        Swal.fire({
          iconHtml: `<img src=${loadingSvg} alt="Loading"/>`,
          title: `Loading`,
          showConfirmButton: false,
        });
      } else if (createPetState[0] === "ok") {
        setTimeout(() => {
          Swal.close();
        }, "400");

        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: `Created sucessfully`,
            showConfirmButton: false,
            timer: 1000,
          });
          formikRef.current?.resetForm();
        }, "600");
        
        setIsLoading(false);
      } else if (createPetState[0] === "error") {
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
  }, [isLoading, createPetState]);

  const handleSubmit = (value) => {
    setIsLoading(true);
    dispatch(clearCreatePet());
    dispatch(createPet(value));
  };

  return (
    <Box className={addPetStyle.container}>
      <Box m="20px">
        <Header title="Add new pet" subtitle="Here you can add your pets" />
      </Box>

      <Box>
        {myuser?.id ? (
          <Formik
            innerRef={formikRef}
            initialValues={{
              name: "",
              species: "",
              detail: "",
              img: "",
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

              if (!values.species) {
                errors.species = "Please insert a last name";
              } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.species)) {
                errors.lastname =
                  "The species can only be alphabetical characters";
              }
              if (!values.detail) {
                errors.detail = "Please insert a detail";
              }

              return errors;
            }}
            onSubmit={(values, { resetForm, setFieldValue }) => {
              handleSubmit(values, resetForm, setFieldValue);
            }}
          >
            {({ errors, setFieldValue }) => (
              <div className={addPetStyle.contenedor}>
                <Form className={addPetStyle.formulario}>
                  <div className={addPetStyle.back_container}>
                    <div
                      className={"rounded-circle " + addPetStyle.img_container}
                    >
                      <img
                        className={addPetStyle.img_user}
                        src={petImg ? petImg : petPlaceholder}
                        alt="userImg"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="files"
                      className={"btn " + addPetStyle.selectLabel}
                    >
                      Select Image
                    </label>

                    <input
                      className={addPetStyle.selectButton}
                      id="files"
                      type="file"
                      name="img"
                      accept=".png, .jpg, .jpeg, .svg"
                      onChange={(e) => handleImageUpload(e, setFieldValue)}
                    />
                  </div>

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
                        <div className={addPetStyle.error}>{errors.name}</div>
                      )}
                    />
                  </div>

                  <div>
                    <label htmlFor="species">Species: </label>
                    <Field
                      type="text"
                      id="species"
                      name="species"
                      placeholder="Insert species here..."
                    />
                    <ErrorMessage
                      name="species"
                      component={() => (
                        <div className={addPetStyle.error}>
                          {errors.species}
                        </div>
                      )}
                    />
                  </div>

                  <div>
                    <label htmlFor="detail">Detail: </label>
                    <Field
                      type="text"
                      id="detail"
                      name="detail"
                      placeholder="Insert detail here..."
                    />
                    <ErrorMessage
                      name="detail"
                      component={() => (
                        <div className={addPetStyle.error}>{errors.detail}</div>
                      )}
                    />
                  </div>

                  <button type="submit">Add Pet</button>
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

export default AddPet;
