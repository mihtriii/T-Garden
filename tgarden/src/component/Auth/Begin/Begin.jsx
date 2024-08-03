import React, { useState, useEffect } from "react";
import "./Begin.scss";
import { FaRegUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { TfiWorld } from "react-icons/tfi";
//import img from  './logo.jpg';
const Begin = () => {
  const [setrevealpassword, revealpasswordState] = useState(false);
  const revealpasswordButton = () => {
    revealpasswordState(!setrevealpassword);
  };

  const ForgotPWButton = () => {
    revealpasswordState(!setrevealpassword);
  };

  const EnterButton = () => {
    revealpasswordState(!setrevealpassword);
  };
  return (
    <div className="TG_Begin">
      <div className="TG_Begin_Left">
        <img
          className="TG_Begin_Left_Background"
          src="./img/Start_background.jpg"
        />
      </div>

      <div className="TG_Begin_Right">
        <div className="TG_Begin_Right_Login">
          <button
            className="TG_Begin_Right_Login_button"
            iconClick={EnterButton}
          >
            Login
            <div
              className="TG_Begin_Right_Login_button_underline"
              style={{ display: "block" }}
            ></div>
          </button>
        </div>
        <div className="TG_Begin_Right_Signin">
          <button
            className="TG_Begin_Right_Signin_button"
            iconClick={EnterButton}
          >
            Sign in
            <div
              className="TG_Begin_Right_Signin_button_underline"
              style={{ display: "block" }}
            ></div>
          </button>
        </div>
        <div className="TG_Begin_Right_Contact">
          <div className="TG_Begin_Right_Contact_icon">
            <TfiWorld size={20} />
          </div>
          <div className="TG_Begin_Right_Contact_text">
            Contact us: abc@durianmail.com
            <div className="TG_Begin_Right_Contact_text_underline" div />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Begin;
