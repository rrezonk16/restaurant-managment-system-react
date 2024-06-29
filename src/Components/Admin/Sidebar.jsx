import React, { useEffect, useState } from "react";
import Logo from "../Images/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Importing Manage components
import ManageSales from "./ManageSales";
import ManageEmployees from "./ManageEmployees";
import ManageMenu from "./ManageMenu";
import ManageReservations from "./ManageReservations";
import ManageOrders from "./ManageOrders";
import ManageUsers from "./ManageUsers";
import ManageMenuItems from "./ManageMenuItems";
import Branches from "./Branches";
import Roles from "./Roles";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPageRoles, setIsPageRoles] = useState(false);
  const [isPageEmployees, setIsPageEmployees] = useState(false);
  const [isPageBranches, setIsPageBranches] = useState(false);
  const [isPageMenu, setIsPageMenu] = useState(false);
  const [isPageOrders, setIsPageOrders] = useState(false);
  const [isPageReservations, setIsPageReservations] = useState(false);
  const [isPageSales, setIsPageSales] = useState(false);
  const [isPageUsers, setIsPageUsers] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchRolePermissions = async () => {
      try {
        const roleId = localStorage.getItem("role");
        const response = await axios.get(
          `https://localhost:7046/api/Role/GetRoleById/${roleId}`
        );
        
        if (response.data && response.data.allowedPages) {
          const allowedPages = JSON.parse(response.data.allowedPages);

          allowedPages.forEach((page) => {
            switch (page) {
              case 1:
                setIsPageUsers(true);
                break;
              case 2:
                setIsPageSales(true);
                break;
              case 3:
                setIsPageReservations(true);
                break;
              case 4:
                setIsPageOrders(true);
                break;
              case 5:
                setIsPageMenu(true);
                break;
              case 6:
                setIsPageBranches(true);
                break;
              case 7:
                setIsPageEmployees(true);
                break;
              case 8:
                setIsPageRoles(true);
                break;
              default:
                break;
            }
          });
        }
      } catch (error) {
        console.error("Error fetching role permissions:", error);
      }
    };

    fetchRolePermissions();
  }, []);

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setUserName(name);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const tab = urlParams.get("tab");

  useEffect(() => {
    document.title = "Admin Panel";
  }, []);

  return (
    <div className="bg-white">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 z-50 w-full bg-gray-800">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            {/* Sidebar Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            {/* Logo */}
            <a href="/?second-visit=1" className="flex ms-2 md:me-24">
              <img src={Logo} className="h-8 " alt="Eatwell" />
            </a>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform  ${
          isSidebarOpen ? "" : "-translate-x-full"
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-800 rounded-3xl">
          <h1 className=" text-white ml-2 text-2xl"> Welcome {userName}</h1>
          {/* Menu Items */}
          <ul className="space-y-2 font-medium">
            {isPageSales && (
              <li>
                <a
                  href="/Admin?tab=Sales"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    tab === "Sales" ? "bg-slate-700" : ""
                  }`}
                >
                  <span className="ms-3">Sales</span>
                </a>
              </li>
            )}
            {isPageRoles && (
              <li>
                <a
                  href="/Admin?tab=Roles"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    tab === "Roles" ? "bg-slate-700" : ""
                  }`}
                >
                  <span className="ms-3">Roles</span>
                </a>
              </li>
            )}
            {isPageEmployees && (
              <li>
                <a
                  href="/Admin?tab=Employees"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    tab === "Employees" ? "bg-slate-700" : ""
                  }`}
                >
                  <span className="ms-3">Employees</span>
                </a>
              </li>
            )}
            {isPageBranches && (
              <li>
                <a
                  href="/Admin?tab=Branches"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    tab === "Branches" ? "bg-slate-700" : ""
                  }`}
                >
                  <span className="ms-3">Branches</span>
                </a>
              </li>
            )}
            {isPageMenu && (
              <li>
                <a
                  href="/Admin?tab=Menus"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    tab === "Menus" ? "bg-slate-700" : ""
                  }`}
                >
                  <span className="ms-3">Menu</span>
                </a>
              </li>
            )}
            {isPageOrders && (
              <li>
                <a
                  href="/Admin?tab=Orders"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    tab === "Orders" ? "bg-slate-700" : ""
                  }`}
                >
                  <span className="ms-3">Orders</span>
                </a>
              </li>
            )}
            {isPageReservations && (
              <li>
                <a
                  href="/Admin?tab=Reservations"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    tab === "Reservations" ? "bg-slate-700" : ""
                  }`}
                >
                  <span className="ms-3">Reservations</span>
                </a>
              </li>
            )}
            {isPageUsers && (
              <li>
                <a
                  href="/Admin?tab=Users"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    tab === "Users" ? "bg-slate-700" : ""
                  }`}
                >
                  <span className="ms-3">Users</span>
                </a>
              </li>
            )}
                <li>
                <p
                  onClick={logout}
                  className={`flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 group cursor-pointer`}
                >
                  <span className="ms-3">Logout</span>
                </p>
              </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="p-4 sm:ml-64 mt-14">
        {tab === "Menu-items" && <ManageMenuItems />}
        {tab === "Sales" && <ManageSales />}
        {tab === "Employees" && <ManageEmployees />}
        {tab === "Reservations" && <ManageReservations />}
        {tab === "Menus" && <ManageMenu />}
        {tab === "Orders" && <ManageOrders />}
        {tab === "Users" && <ManageUsers />}
        {tab === "Branches" && <Branches />}
        {tab === "Roles" && <Roles />}
      </div>
    </div>
  );
};

export default Sidebar;
