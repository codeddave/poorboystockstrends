//import React from 'react'

import { Field, Form, Formik } from "formik";
import CustomFormInput from "../../components/Form/CustomFormInput";

const initialValues = {
  email: " ",
  password: "",
};
const Login = () => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={() => console.log("bhdvhjveEJEVVVJBe")}
      >
        {() => (
          <Form>
            <Field
              component={CustomFormInput}
              name="email"
              type="email"
              placeholder="Email..."
              title="Email"
            />
            <Field
              component={CustomFormInput}
              name="password"
              placeholder="Password..."
              title="Password"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
