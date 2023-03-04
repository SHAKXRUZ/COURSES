import "./Users.css";
import { useState, useEffect } from "react";
const Users = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  return (
    <div className="user">
      <div className="users_header">
        <h4 className="users_header_id">Id</h4>
        <h4 className="users_header_username">Username</h4>
        <h4 className="users_header_email">Email</h4>
      </div>
      <div className="users">
        {data.map((el, inx) => (
          <div className="data_courses_div" key={inx}>
            <h4 className="users_header_id">{inx + 1}</h4>
            <p className="users_header_username">{el.username}</p>
            <p className="users_header_email">{el.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Users;
