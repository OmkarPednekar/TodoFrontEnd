import { Link } from "react-router-dom";
import "./HomePage.css";
export default function HomePage() {
  return (
    <div className="homediv">
      <nav className="navbar">
        <div>
          <p>TODOLIST</p>
        </div>
        <div className="buttons-div">
          <Link to="/login">
            <button className="">LOGIN</button>
          </Link>
          <Link to="/register">
            <button className="">REGISTER</button>
          </Link>
        </div>
      </nav>
      <p className="heading-text">CREATE A TODO LIST ORGANIZE YOUR LIFE</p>
    </div>
  );
}
