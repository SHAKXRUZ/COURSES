import "./Login.css";
const Login = () => {
  const logins = (e) => {
    e.preventDefault();
    let { email, password } = e.target;
    let login_user = {
      email: email.value,
      password: password.value,
    };
    fetch("http://localhost:4000/login_users", {
      method: "POST",
      body: JSON.stringify(login_user),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        if (data.msg === "Success!") {
          localStorage.setItem("token", data.token);
          if (localStorage.getItem("token")) {
            window.location = "/home";
          } else {
            alert("Token not available!");
            window.location = "/login";
          }
        }
      });
  };

  return (
    <div className="login">
      <form onSubmit={(e) => logins(e)} className="form_login">
        <div className="form_login_div">
          <label for="email" className="form_login_label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form_login_input"
            placeholder="Enter email..."
            required
            minLength={3}
            maxLength={50}
          />
        </div>
        <div className="form_login_div">
          <label for="password" className="form_login_label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form_login_input"
            placeholder="Enter password..."
            required
            minLength={8}
            maxLength={20}
          />
        </div>
        <button type="submit" className="form_login_btn">
          Submit
        </button>
      </form>
    </div>
  );
};
export default Login;
