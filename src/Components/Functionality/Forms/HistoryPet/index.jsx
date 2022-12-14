import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function FormHistoryPet() {
  const [formSuccess, setFormSuccess] = useState(false);
  let date = new Date();
  return (
    <div className="container">
      <label htmlFor="date">Date</label>
      <h5>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</h5>
      <Formik
        initialValues={{
          description: "",
          date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
        }}
        validate={(values) => {
          let errors = {};
          if (!values.description) {
            errors.description = "Por favor ingresa la description";
          } else if (
            values.description.length === 0 ||
            values.description.length > 300
          ) {
            errors.description = `Por favor acorta la description ${values.description}/300`;
            }
            return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          //funciones con las actions
          resetForm();
          setFormSuccess(true);
          setTimeout(() => {
            setFormSuccess(false);
          }, 5000);
        }}
      >
        {({ errors, values }) => (
          <Form className="row g-3">
            <div className="form-floating mb-3">
              <Field
                type="textarea"
                className="form-control"
                rows="3"
                name="description"
              />
              <label htmlFor="floatingInput">Description</label>
              <ErrorMessage
                name="description"
                render={(msg) => <p className="text-danger">{msg}</p>}
              />
            </div>
            <p>{`${values.description.length}/300`}</p>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            {formSuccess && <p className="text-success">Description Save!</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormHistoryPet;
