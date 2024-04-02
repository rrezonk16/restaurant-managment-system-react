import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Components/Main";
import MakeReservation from "./Components/Reservations/MakeReservation";
import Error from "./Components/Error/Error";
import Login from "./Components/Authentication/Login";
import ViewReservation from "./Components/Reservations/ViewReservation";
import Register from "./Components/Authentication/Register";
import ManageEmployees from "./Components/Admin/ManageEmployees";
import ManageMenu from "./Components/Admin/ManageMenu";
import ManageReservations from "./Components/Admin/ManageReservations";
import ManageOrders from "./Components/Admin/ManageOrders";
import ManageSales from "./Components/Admin/ManageSales";
import ManageFranchise from "./Components/Admin/ManageFranchise";
import Panel from "./Components/Admin/Panel";
import FoodMenu from "./Components/Menu/FoodMenu";


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
  {
    path: "/Admin/Employees",
    element: <ManageEmployees/>
  },
  {
    path: "/Admin/Menu",
    element: <ManageMenu/>
  },
  {
    path: "/Admin/Franchise",
    element: <ManageFranchise/>
  },
  {
    path: "/Admin/Orders",
    element: <ManageOrders/>
  },
  {
    path: "/Admin/Reservations",
    element: <ManageReservations/>
  },
    {
    path: "/Admin/Sales",
    element: <ManageSales/>
  },
    {
    path: "/Admin",
    element: <Panel/>
  },
  {
    path: "/Menu",
    element: <FoodMenu/>
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
