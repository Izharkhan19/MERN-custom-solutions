import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Header";
import Home from "../Home/Home";
import DataTable from "../DataTable/DataTable";
// import Calendar from "../Callender/Calendar";
import FullCalender from "../Callender/FullCalender";
import Map from "../map/Map";
import ChatGPT from "../Chat-GPT/ChatGPT";
import Calendar from "../FullCallender/Calendar";
import Playlist from "../MyPlayList/Playlist";
import UserDetails from "../User/UserDetails";
import FacebookPage from "../Facebook/FacebookPage";
import FB from "../NewFB/FB";

const DefaultLayout = () => {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<UserDetails />} />
        <Route path="/datatable" element={<DataTable />} />
        {/* <Route path="/calendar" element={<FullCalender />} /> */}
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/map" element={<Map />} />
        <Route path="/chat-gpt" element={<ChatGPT />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/register-signin" element={<FB />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
};

export default DefaultLayout;
