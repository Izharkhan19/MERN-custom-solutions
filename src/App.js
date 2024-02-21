import React from "react";
import EmpDetails from "./EmpDetails";
import NodeCRUD from "./Manage Note CRUD/NodeCRUD";
// import UserDetails from "./Manage Note CRUD/UserDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./View/Default/DefaultLayout";
import Login from "./View/Authorise/Login";
import RegisterUser from "./View/Authorise/RegisterUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTopOnReload from "./CommonServices/ScrollToTopOnReload";
import Preloader from "./CommonServices/PreLoader";
import GetPassword from "./View/Authorise/GetPassword";

function App() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${"https://png.pngtree.com/background/20220724/original/pngtree-abstract-flowing-design-with-plenty-of-copy-space-picture-image_1745813.jpg"})`,
          // backgroundImage: `url(${"https://img.freepik.com/free-vector/dark-hexagonal-background-with-gradient-color_79603-1409.jpg"})`,
          backgroundSize: "cover",
          minHeight: "100vh",
          position: "relative",
        }}
      >
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
        <Preloader />

        <BrowserRouter>
          <ScrollToTopOnReload />
          <Routes>
            <Route path={"/"} element={<Login />} />
            <Route path={"/registeruser"} element={<RegisterUser />} />
            <Route path={"/getpassword"} element={<GetPassword />} />
            <Route path={"/*"} element={<DefaultLayout />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
