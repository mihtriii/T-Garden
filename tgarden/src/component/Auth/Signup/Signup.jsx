import React, { useState, useEffect } from "react";
import "./Signup.scss";
import { FaRegUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { TfiWorld } from "react-icons/tfi";
import { MdOutlineMail } from "react-icons/md";
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
        <div className="TG_Signup_Right_Top_Top">
          <div className="TG_Signup_Right_Top_Signuptext">
            Sign up
            <div className="TG_Signup_Right_Top_Signuptext_underline" div />
          </div>
          <div className="TG_Signup_Right_Top_Enterusername">
            <FaRegUser size={25} />
            <div className="TG_Signup_Right_Top_Enterusername_container">
              <input
                className="TG_Signup_Right_Top_Enterusername_container_input"
                type="text"
                placeholder="Username"
              />
              <div
                className="TG_Signup_Right_Top_Enterusername_container_underline"
                div
              />
            </div>
          </div>
          <div className="TG_Signup_Right_Top_Enteremail">
            <MdOutlineMail size={25} />
            <div className="TG_Signup_Right_Top_Enteremail_container">
              <input
                className="TG_Signup_Right_Top_Enteremail_container_input"
                type="password"
                placeholder="Email"
              />
              <div
                className="TG_Signup_Right_Top_Enteremail_container_underline"
                div
              />
            </div>
          </div>
          <div className="TG_Signup_Right_Top_Enterpassword">
            <FaLock size={25} />
            <div className="TG_Signup_Right_Top_Enterpassword_container">
              <input
                className="TG_Signup_Right_Top_Enterpassword_container_input"
                type="password"
                placeholder="Password"
              />
              <div
                className="TG_Signup_Right_Top_Enterpassword_container_underline"
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

          <div className="TG_Signup_Right_Top_Confirmpassword">
            <FaLock size={25} />
            <div className="TG_Signup_Right_Top_Confirmpassword_container">
              <input
                className="TG_Signup_Right_Top_Confirmpassword_container_input"
                type="text"
                placeholder="Confirm password"
              />
              <div
                className="TG_Signup_Right_Top_Confirmpassword_container_underline"
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
          <div className="TG_Signup_Right_Top_Enter">
            <button
              className="TG_Signup_Right_Top_Enter_button"
              iconClick={EnterButton}
            >
              Enter
              <div
                className="TG_Signup_Right_Top_Enter_button_underline"
                style={{ display: "block" }}
              ></div>
            </button>
          </div>
        </div>
        <div className="TG_Signup_Right_Bottom">
          <div className="TG_Signup_Right_Bottom_Contact">
            <TfiWorld size={20} className="TG_Signup_Right_Bottom_Contact_icon" />
            <div className="TG_Signup_Right_Bottom_Contact_text">
              Contact us: abc@durianmail.com
              <div className="TG_Signup_Right_Bottom_Contact_text_underline" div />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
