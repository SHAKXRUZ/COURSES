import "./Registr.css";

const Registr = () => {
  const registr = (e) => {
    e.preventDefault();
    let { username, email, password } = e.target;
    let registr_user = {
      username: username.value,
      email: email.value,
      password: password.value,
    };
    fetch("http://localhost:3000/registr_users", {
      method: "POST",
      body: JSON.stringify(registr_user),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        window.location = "/login";
      });
  };

  return (
    <div className="registr">
      <form onSubmit={(e) => registr(e)} className="form_registr">
        <div className="form_registr_div">
          <label form="username" className="form_registr_label">
            Username:
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="form_registr_input"
            placeholder="Enter username..."
            required
            minLength={3}
            maxLength={25}
          />
        </div>
        <div className="form_registr_div">
          <label form="email" className="form_registr_label">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form_registr_input"
            placeholder="Enter email..."
            required
            minLength={3}
            maxLength={50}
          />
        </div>
        <div className="form_registr_div">
          <label form="" className="form_registr_label">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="form_registr_input"
            placeholder="Enter password"
            required
            minLength={8}
            maxLength={20}
          />
        </div>
        <button type="submit" className="form_registr_btn">
          Submit
        </button>
      </form>
    </div>
  );
};
export default Registr;
