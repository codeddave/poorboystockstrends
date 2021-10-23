import { Field, Form, Formik } from "formik";
import CustomFormInput from "../../components/Form/CustomFormInput";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { VscLock } from "react-icons/vsc";
import { RegisterSchema } from "../../definitions/Yup";
import { register } from "../../api/auth";
const initialValues = {
  username: "",
  email: " ",
  password: "",
};
const Register = () => {
  return (
    <div className="mx-auto md:3/4 px-2 md:px-0">
      <p className="text-center text-2xl mb-5 tracking-wider">Register</p>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={async (values) => {
          console.log(values);

          await register(values);
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
              name="email"
              type="email"
              title="Email"
              icon={HiOutlineMail}
            />
            <Field
              component={CustomFormInput}
              name="password"
              title="Password"
              type="password"
              icon={VscLock}
            />
            <section className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={!!isSubmitting}
                className="border-white border py-2 px-4 rounded text-white mx-auto w-40  hover:bg-blue-50 hover:text-gray-600 "
              >
                Register
              </button>
            </section>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
