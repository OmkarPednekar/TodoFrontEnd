import { Formik } from "formik";
import "./login.css";
import axios from "axios";
import { baseUrl } from "../api";
export default function RegisterPage() {
  const SubmitClicked = async (values) => {
    const user = {
      email: values.email,
      password: values.password,
    };
    await axios
      .post(`${baseUrl}/register`, user)
      .then((res) => {
        if (res.data === "USER EXISTS ALREADY") {
          alert(res.data);
          window.location = "/login";
        } else {
          alert(res.data);
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <h1 className="text-center">REGISTER</h1>
      <Formik
        initialValues={{ email: "", password: "", confirmpassword: "" }}
        validate={(values) => {
          const errors = {};
          if (values.password !== values.confirmpassword) {
            errors.password = "PASSWORDS NOT MATCHING";
          }
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
              required
              onChange={handleChange}
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
              required
              type="password"
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
            <label>CONFIRM PASSWORD</label>
            <br />
            <input
              type="password"
              required
              name="confirmpassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmpassword}
            />
            <br></br>
            <p className="errortext">
              {" "}
              {errors.confirmpassword &&
                touched.confirmpassword &&
                errors.confirmpassword}
            </p>
            <br></br>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
