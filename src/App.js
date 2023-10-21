import React from "react";
import EmpDetails from "./EmpDetails";
import NodeCRUD from "./Manage Note CRUD/NodeCRUD";
// import UserDetails from "./Manage Note CRUD/UserDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./View/Default/DefaultLayout";
import Login from "./View/Authorise/Login";
import RegisterUser from "./View/Authorise/RegisterUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/registeruser"} element={<RegisterUser />} />
          <Route path={"/*"} element={<DefaultLayout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
// {/* <EmpDetails/> */}
// {/* <NodeCRUD /> */}
// {/* <UserDetails /> */}
