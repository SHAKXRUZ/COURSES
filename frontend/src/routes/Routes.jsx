import { Route } from "react-router-dom";
import Registr from "./registr/Registr";
import Login from "./login/Login";
import Home from "./home/Home";
const Routes = () => {
  return (
    <>
      <Route exact path="/">
        <Registr />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
    </>
  );
};
export default Routes;
