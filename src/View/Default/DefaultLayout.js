import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "../Header";
import Home from "../Home/Home";
import DataTable from "../DataTable/DataTable";
import Map from "../map/Map";
import ChatGPT from "../Chat-GPT/ChatGPT";
import Calendar from "../FullCallender/Calendar";
import Playlist from "../MyPlayList/Playlist";
import UserDetails from "../User/UserDetails";
import Product from "../Products/Product";
import NotFound from "../../CommonComponents/NotFound";

const DefaultLayout = () => {
  let authorized = localStorage.getItem("authorized");
  let navigate = useNavigate();
  useEffect(() => {
    if (!authorized) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Header />
      {authorized && (
        <Routes>
          <Route path="/*" element={<NotFound />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<UserDetails />} />
          <Route path="/datatable" element={<DataTable />} />
          {/* <Route path="/calendar" element={<FullCalender />} /> */}
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/map" element={<Map />} />
          <Route path="/chat-gpt" element={<ChatGPT />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/product" element={<Product />} />
          {/* <Route path="/register-signin" element={<FB />} /> */}
        </Routes>
      )}

      {/* <Footer /> */}
    </div>
  );
};

export default DefaultLayout;
