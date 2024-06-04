import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Components/Main";
import MakeReservation from "./Components/Reservations/MakeReservation";
import Error from "./Components/Error/Error";
import Login from "./Components/Authentication/Login";
import ViewReservation from "./Components/Reservations/ViewReservation";
import Register from "./Components/Authentication/Register";

import Panel from "./Components/Admin/Panel";
import FoodMenu from "./Components/Menu/FoodMenu";
import MenuItems from "./Components/Menu/MenuItems";


const routes = [
  {
    path: "/",
    element: <Main/>
  },
  {
    path: "/*",
    element: <Error/>
  },
  {
    path: "/Reservations",
    element: <ViewReservation/>
  },
  {
    path: "/Login",
    element: <Login/>
  },
  {
    path: "/Register",
    element: <Register/>
  },
  {
    path: "/Reserve",
    element: <MakeReservation/>
  },
  localStorage.getItem('role') === "3" && {
    path: "/Admin",
    element: <Panel/>
  },
  {
    path: "/Menu",
    element: <FoodMenu/>
  },
  {
    path: "/Menu-items",
    element: <MenuItems/>
  },
];
function App() {
  
  return (
    <Router>

      <div className="bg-blue-900">

        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
