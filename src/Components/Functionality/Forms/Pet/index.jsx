import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { Formik, Form, Field, ErrorMessage } from "formik";

const FormPet = () => {
  const [formSent, changeFormSent] = useState(false);

  return (
    <>
      <div>
        <Link
          to="/profile/:id"
          type="button"
          className="text-decoration-none btn btn-dark"
        >
          Back to Profile
        </Link>
      </div>
      <Formik
        initialValues={{
          name: "",
          species: "",
          description: "",
        }}
        validate={(values) => {
          let errors = {};

          if (!values.name) {
            errors.name = "Please insert a first name";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
            errors.name = "The first name can only be alphabetical characters";
          }

          if (!values.species) {
            errors.species = "Please insert a last name";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.species)) {
            errors.lastname = "The species can only be alphabetical characters";
          }
          if (!values.description) {
            errors.description = "Please insert a description";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          resetForm();
          console.log("Form Completed");
          changeFormSent(true);
          setTimeout(() => changeFormSent(false), 5000);
        }}
      >
        {({
          handleSubmit,
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
        }) => (
          <div className="contenedor">
            <Form className="formulario">
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
                  component={() => <div className="error">{errors.name}</div>}
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
                    <div className="error">{errors.species}</div>
                  )}
                />
              </div>

              <div>
                <label htmlFor="description">Description: </label>
                <Field
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Insert description here..."
                />
                <ErrorMessage
                  name="description"
                  component={() => (
                    <div className="error">{errors.description}</div>
                  )}
                />
              </div>

              <button type="submit">Create Pet</button>
              {formSent && (
                <p className="success"> Form completed successfully! </p>
              )}
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default FormPet;
