import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../api";
import axios from "axios";
import "./dashboard.css";

import { Formik } from "formik";
export default function DashBoard() {
  let { email } = useParams();
  const [todo, setTodo] = useState([]);
  const [Numberoftodo, setNumberofTodo] = useState(0);
  const [donearr, setDoneArr] = useState([]);
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
      let arr = [];
      let donearr = [];
      await axios
        .get(`${baseUrl}/gettodo`, { params: { email: email } })
        .then(async (res) => {
          setNumberofTodo(res.data.length);
          if (res.data.length !== 0) {
            res.data.forEach((element) => {
              if (element.status === "Pending") {
                arr.push(element);
              } else donearr.push(element);
            });
            setTodo(arr);
            setDoneArr(donearr);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getData();
  }, []);

  const handleDelete = async (data) => {
    let arr = [];
    let donearr = [];
    const req = { data: data, action: "done" };
    await axios
      .post(`${baseUrl}/deletenode`, req)
      .then(async (res) => {
        setNumberofTodo(res.data.length);
        res.data.forEach((element) => {
          // console.log(element);
          if (element.status === "Pending") {
            arr.push(element);
          } else donearr.push(element);
        });
        setTodo(arr);
        setDoneArr(donearr);
        console.log(donearr, "done");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeletePermanent = async (data) => {
    let arr = [];
    let donearr = [];
    const req = { data: data, action: "delete" };
    await axios
      .post(`${baseUrl}/deletenode`, req)
      .then(async (res) => {
        setNumberofTodo(res.data.length);
        res.data.forEach((element) => {
          // console.log(element);
          const v = new Date(element.date);
          console.log(v.getDay());
          if (element.status === "Pending") {
            arr.push(element);
          } else donearr.push(element);
        });
        setTodo(arr);
        setDoneArr(donearr);
        console.log(donearr, "done");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="">
      <nav className="navbar">
        <div>
          <p>TODOLIST</p>
        </div>
        <div className="buttons-div">
          <Link to="/">
            <button className="">LOGOUT</button>
          </Link>
        </div>
      </nav>
      <div className="container">
        <h1>{Numberoftodo}</h1>
      </div>

      {/* {todo.length === 0 ? <p>NO DATA</p> : <p></p>} */}

      <div className="todo-div container">
        <div className="create-todo">
          <h1>CREATE-TODO's</h1>
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
                <h1>ADD TASKS </h1>
              ) : (
                todo.map((data, index) => {
                  return (
                    <div className="todolist" key={index}>
                      <button className="datatodo">{data.data}</button>
                      <button
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Mark Done"
                        className="delete"
                        onClick={() => {
                          handleDelete(data);
                        }}
                      >
                        Mark Done
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div className="todo-div-del container  ">
          <h1>COMPLETED TASKS</h1>
          <div>
            <div className="tododiv">
              {donearr.length <= 0 ? (
                <h1>NO TASKS COMPLETED</h1>
              ) : (
                donearr.map((data, index) => {
                  return (
                    <div className="todolist" key={index}>
                      <button className="deletedtask">{data.data}</button>
                      <button
                        className="add"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="ADD BACK"
                        onClick={() => {
                          handleDelete(data);
                        }}
                      >
                        ADD BACK
                      </button>
                      <button
                        data-toggle="tooltip"
                        data-placement="top"
                        title="DELETE"
                        className="delete"
                        onClick={() => {
                          handleDeletePermanent(data);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
