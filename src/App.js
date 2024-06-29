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
import ForgotPassword from "./Components/Authentication/ForgotPassword";
import AddCode from "./Components/Authentication/AddCode";
import AddNewPassword from "./Components/Authentication/AddNewPassword";
import UserOrder from "./Components/Orders/UserOrder";
import GenerateBill from "./Components/Orders/GenerateBIll";
import ReservationDetails from "./Components/Reservations/ReservationDetails";

const role = localStorage.getItem('role');

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
    path: "/my-reservations",
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
  {
    path: "/Order",
    element: <UserOrder/>
  },
  {
    path: "/Menu",
    element: <FoodMenu/>
  },
  {
    path: "/Menu-items",
    element: <MenuItems/>
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword/>
  },
  {
    path: "/add-code",
    element: <AddCode/>
  },
  {
    path: "/recreate-password",
    element: <AddNewPassword/>
  },
  {
    path: "/order-bill",
    element: <GenerateBill/>
  },
  {
    path: "/reservations",
    element: <ReservationDetails/>
  },
];

if (["1", "2", "3", "4"].includes(role)) {
  routes.push({
    path: "/Admin",
    element: <Panel/>
  });
}

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
