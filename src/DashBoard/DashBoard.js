import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../api";
import axios from "axios";
import "./dashboard.css";
import CreateTodo from "./CreateTodo";
import { Formik } from "formik";
export default function DashBoard() {
  let { email } = useParams();
  const [todo, setTodo] = useState([]);
  const [newtodo, setNewTodo] = useState([]);
  let todoarr = [];
  const SubmitClicked = async (values) => {
    todoarr = [...todo];

    let datatodo = {
      email: email,
      data: values.todo,
      date: new Date(),
      status: "Pending",
    };
    await axios.post(`${baseUrl}/posttodo`, datatodo).then((res) => {
      console.log(res);
    });

    todoarr.push(datatodo);
    setTodo(todoarr);
  };

  useEffect(() => {
    async function getData() {
      await axios
        .get(`${baseUrl}/gettodo`, { params: { email: email } })
        .then(async (res) => {
          if (res.data.length !== 0) {
            await setTodo(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getData();
  }, []);
  return (
    <div className="container">
      {todo.length === 0 ? <p>NO DATA</p> : <p></p>}

      <div className="todo-div">
        <div className="create-todo">
          <h1>CREATE-TODO's</h1>
          {console.log(todo)}
          <div>
            <div className="inputtodo-div">
              <div>
                <Formik
                  initialValues={{ todo: "" }}
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
                    <form onSubmit={handleSubmit}>
                      <br />
                      <input
                        type="text"
                        name="todo"
                        onChange={handleChange}
                        required
                        onBlur={handleBlur}
                        value={values.todo}
                      />
                      <br />

                      <button type="submit">+</button>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="tododiv">
              {todo.length <= 0 ? (
                <h1>NO DATA</h1>
              ) : (
                todo.map((data, index) => {
                  return (
                    <div className="todolist" key={index}>
                      <button className="datatodo">{data.data}</button>
                      <button className="delete">X</button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div className="delete-todo">
          <h1>DELETE</h1>
        </div>
      </div>
    </div>
  );
}
