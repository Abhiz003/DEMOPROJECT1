import React from "react";
import "./AdminDashboard.css";
import AdminNavbar from "../components/AdminNavbar";
import videoFile from './videos/vid1.mp4'; 
import videoFile1 from './videos/vid2.mp4'; 
import CustomNavbar from "../components/CustomNavbar";
import { isBlogger, isUser } from "../utils/TokenUtil";

const AdminDashboard = () => {
  return (
    <div className="temp">
      {/* <AdminNavbar /> */}

      <h1>Welcome Admin...</h1>
      <div>
      <video src={videoFile} className="mt-4" autoPlay loop muted playsInline />
      <video src={videoFile1} className="mt-4" autoPlay loop muted playsInline />
      </div>
    </div>
  );
};

export default AdminDashboard;
