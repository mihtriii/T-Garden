import React, { useState, useEffect } from "react";
import "./Login.scss";
import { FaRegUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { TfiWorld } from "react-icons/tfi";
//import img from  './logo.jpg';
const Login = () => {
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
    <div className="TG_Login">
      <div className="TG_Login_Left">
        <img
          className="TG_Login_Left_Background"
          src="./img/Start_background.jpg"
        />
      </div>

      <div className="TG_Login_Right">
        <div className="TG_Login_Right_Logintext">
          Log in
          <div className="TG_Login_Right_Logintext_underline" div />
        </div>
        <div className="TG_Login_Right_Enterusername">
          <FaRegUser size={25} />
          <div className="TG_Login_Right_Enterusername_container">
            <input
              className="TG_Login_Right_Enterusername_container_input"
              type="text"
              placeholder="Username"
            />
            <div
              className="TG_Login_Right_Enterusername_container_underline"
              div
            />
          </div>
        </div>

        <div className="TG_Login_Right_Enterpassword">
          <FaLock size={25} />
          <div className="TG_Login_Right_Enterpassword_container">
            <input
              className="TG_Login_Right_Enterpassword_container_input"
              type="text"
              placeholder="Password"
            />
            <div
              className="TG_Login_Right_Enterpassword_container_underline"
              div
            />
          </div>
          <button onClick={revealpasswordButton}>
            {setrevealpassword ? (
              <IoIosEye size={25} />
            ) : (
              <IoIosEyeOff size={25} />
            )}
          </button>
        </div>
        <div
          button
          onClick={ForgotPWButton}
          className="TG_Login_Right_Forgotpassword"
        >
          Forgot Password?
        </div>
        <div className="TG_Login_Right_Rememberme">
          <input
            className="TG_Login_Right_Rememberme_checkbox"
            type="checkbox"
            id="myCheck"
          />
          <div className="TG_Login_Right_Rememberme_text">Remember me </div>
        </div>
        <div className="TG_Login_Right_Enter">
          <button
            className="TG_Login_Right_Enter_button"
            iconClick={EnterButton}
          >
            Enter
            <div
              className="TG_Login_Right_Enter_button_underline"
              style={{ display: "block" }}
            ></div>
          </button>
        </div>
        <div className="TG_Login_Right_Contact">
          <div className="TG_Login_Right_Contact_icon">
            <TfiWorld size={20} />
          </div>
          <div className="TG_Login_Right_Contact_text">
            Contact us: abc@durianmail.com
            <div className="TG_Login_Right_Contact_text_underline" div />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
