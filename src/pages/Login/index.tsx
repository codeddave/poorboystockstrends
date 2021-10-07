//import React from 'react'

import { Field, Form, Formik } from "formik";
import CustomFormInput from "../../components/Form/CustomFormInput";
import { HiOutlineMail } from "react-icons/hi";
import { VscLock } from "react-icons/vsc";
const initialValues = {
  email: " ",
  password: "",
};
const Login = () => {
  return (
    <div className="mx-auto w-full md:3/4 px-2 md:px-o">
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
