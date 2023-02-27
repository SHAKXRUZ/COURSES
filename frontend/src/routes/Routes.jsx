import { Route } from "react-router-dom";
import Registr from "./registr/Registr";
const Routes = () => {
  return (
    <>
      <Route exact path="/">
        <Registr />
      </Route>
    </>
  );
};
export default Routes;
