import { Field, Form, Formik } from "formik";
import CustomFormInput from "../../components/Form/CustomFormInput";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { VscLock } from "react-icons/vsc";
const initialValues = {
  username: "",
  email: " ",
  password: "",
};
const Register = () => {
  return (
    <div className="mx-auto md:3/4 px-2 md:px-0">
      <p className="text-center text-2xl mb-2 tracking-wider">Register</p>
      <Formik
        initialValues={initialValues}
        onSubmit={() => console.log("bhdvhjveEJEVVVJBe")}
      >
        {() => (
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
              icon={VscLock}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
