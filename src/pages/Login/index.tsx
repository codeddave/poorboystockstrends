//import React from 'react'

import { Field, Form, Formik } from "formik";
import CustomFormInput from "../../components/Form/CustomFormInput";
import { HiOutlineMail } from "react-icons/hi";
import { VscLock } from "react-icons/vsc";
import { LoginSchema } from "../../definitions/Yup";
const initialValues = {
  email: " ",
  password: "",
};
const Login = () => {
  return (
    <div className="mx-auto w-full md:3/4 px-2 md:px-0">
      <p className="text-center text-2xl mb-5 tracking-wider">Login</p>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={() => console.log("bhdvhjveEJEVVVJBe")}
      >
        {() => (
          <Form>
            <Field
              component={CustomFormInput}
              name="email"
              type="email"
              title="Email"
              icon={HiOutlineMail}
            />
            <Field
              component={CustomFormInput}
              name="password"
              title="Password"
              icon={VscLock}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
