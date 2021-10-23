//import React from 'react'

import { Field, Form, Formik } from "formik";
import CustomFormInput from "../../components/Form/CustomFormInput";
import { HiOutlineUser } from "react-icons/hi";
import { VscLock } from "react-icons/vsc";
import { LoginSchema } from "../../definitions/Yup";
import { logIn } from "../../api/auth";

const initialValues = {
  username: "",
  password: "",
};
const Login = () => {
  return (
    <div className="mx-auto w-full md:3/4 px-2 md:px-0">
      <p className="text-center text-2xl mb-5 tracking-wider">Login</p>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={async (values) => {
          await logIn(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              component={CustomFormInput}
              name="username"
              type="text"
              title="Username"
              icon={HiOutlineUser}
            />
            <Field
              component={CustomFormInput}
              name="password"
              title="Password"
              icon={VscLock}
            />
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="border-white border py-2 px-4 rounded text-white mx-auto w-40  hover:bg-blue-50 hover:text-gray-600 "
              >
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
