import React, { useState, useEffect } from "react";
import "./Signup.scss";
import { FaRegUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { TfiWorld } from "react-icons/tfi";
//import img from  './logo.jpg';
const Signup = () => {
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
    <div className="TG_Signup">
      <div className="TG_Signup_Left">
        <img
          className="TG_Signup_Left_Background"
          src="./img/Start_background.jpg"
        />
      </div>
      <div className="TG_Signup_Right">
        <div className="TG_Signup_Right_Signuptext">
          Sign up
          <div className="TG_Signup_Right_Signuptext_underline" div />
        </div>
        <div className="TG_Signup_Right_Enterusername">
          <FaRegUser size={25} />
          <div className="TG_Signup_Right_Enterusername_container">
            <input
              className="TG_Signup_Right_Enterusername_container_input"
              type="text"
              placeholder="Username"
            />
            <div
              className="TG_Signup_Right_Enterusername_container_underline"
              div
            />
          </div>
        </div>

        <div className="TG_Signup_Right_Enterpassword">
          <FaLock size={25} />
          <div className="TG_Signup_Right_Enterpassword_container">
            <input
              className="TG_Signup_Right_Enterpassword_container_input"
              type="text"
              placeholder="Password"
            />
            <div
              className="TG_Signup_Right_Enterpassword_container_underline"
              div
            />
          </div>
          <button onClick={revealpasswordButton}>
            {setrevealpassword ? (
              <IoIosEye size={25}/>
            ) : (
              <IoIosEyeOff size={25} />
            )}
          </button>
        </div>

        <div className="TG_Signup_Right_Confirmpassword">
          <FaLock size={25} />
          <div className="TG_Signup_Right_Confirmpassword_container">
            <input
              className="TG_Signup_Right_Confirmpassword_container_input"
              type="text"
              placeholder="Confirm password"
            />
            <div
              className="TG_Signup_Right_Confirmpassword_container_underline"
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
        <div className="TG_Signup_Right_Contact">
          <TfiWorld size={20} className="TG_Signup_Right_Contact_icon" />
          <div className="TG_Signup_Right_Contact_text">
            Contact us: abc@durianmail.com
            <div className="TG_Signup_Right_Contact_text_underline" div />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
