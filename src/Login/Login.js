import { Formik } from "formik";
import "./login.css";
import axios from "axios";
import { baseUrl } from "../api";
export default function LoginPage() {
  const SubmitClicked = async (values) => {
    // console.log(values);
    await axios
      .post(`${baseUrl}/login`, values)
      .then((res) => {
        if (res.data === "OK") {
          alert("LOGIN SUCCESSFULL");
          window.location = `/dashboard/${values.email}`;
        } else {
          alert("LOGIN FAILED");
          window.location = "/login";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <h1 className="text-center">LOGIN</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values) => {
          SubmitClicked(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form className="login-form" onSubmit={handleSubmit}>
            <label>EMAIL</label>
            <br />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              onBlur={handleBlur}
              value={values.email}
            />
            <br />
            <p className="errortext">
              {errors.email && touched.email && errors.email}
            </p>
            <br />
            <label>PASSWORD</label>
            <br />
            <input
              type="password"
              required
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <br></br>
            <p className="errortext">
              {errors.password && touched.password && errors.password}
            </p>
            <br />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
