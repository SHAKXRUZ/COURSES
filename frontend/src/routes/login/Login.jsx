import "./Login.css";
const Login = () => {
  return (
    <div className="login">
      <form className="form_login">
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
