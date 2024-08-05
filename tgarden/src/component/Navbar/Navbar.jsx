import React from "react";
import "./Navbar.scss";
import { TbMessageChatbot } from "react-icons/tb";
import { TiWeatherCloudy } from "react-icons/ti";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
function Navbar() {
  return (
    <div className="TG_Nabar"style={{ width: "100%", height: "50px", background: "brown" }}>
      <div className="TG_Nabar_Left">
        <img className="TG_Nabar_Left_Logo" src="./img/Logo.jpg" />
      </div>
      <div className="TG_Nabar_Center">
        <button className="TG_Nabar_Center_chatbot" >
            <TbMessageChatbot size={30} />
        </button>
        <button className="TG_Nabar_Center_weather" >
            <TiWeatherCloudy size={30} />
        </button>
        <button className="TG_Nabar_Center_home" >
            <IoHomeOutline size={30} />
        </button>
        <button className="TG_Nabar_Center_notifications" >
            <IoIosNotificationsOutline size={30} />
        </button>
        <button className="TG_Nabar_Center_settings">
            <CiSettings size={30} />
        </button>
      </div>
      <div className="TG_Nabar_Right">
        <img className="TG_Nabar_Right_Logo" src=".img/Logo.jpg"/>
      </div>
    </div>
  );
}

export default Navbar;