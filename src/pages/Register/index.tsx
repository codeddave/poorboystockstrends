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
    <div className="mx-auto w-4/6 md:w-3/4">
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
