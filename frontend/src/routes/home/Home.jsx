import "./Home.css";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import Courses from "./courses/Courses";
import Users from "./users/Users";
const home = () => {
  return (
    <div className="home">
      <header className="header">
        <ul className="header_item">
          <li className="header_list">
            <Link className="home_link" to="/home">
              Courses
            </Link>
          </li>
          <li className="header_list">
            <Link className="home_link" to="/home/users">
              Users
            </Link>
          </li>
          <li className="header_list">
            <Link className="home_link" to="/">
              LogAut
            </Link>
          </li>
        </ul>
      </header>
      <div className="home_routes">
        <Route exact path="/home">
          <Courses />
        </Route>
        <Route path="/home/users">
          <Users />
        </Route>
      </div>
    </div>
  );
};
export default home;
