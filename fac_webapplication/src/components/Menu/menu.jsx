import React, { useEffect, useState, useContext } from "react";
import { FiGrid, FiBell, FiSettings, FiUserMinus } from "react-icons/fi";
import { WiDayCloudy } from "react-icons/wi";

import { BrowserView, MobileView } from "react-device-detect";
import "./menu.scss";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../Context/AuthContext";
import { FaRegAddressBook } from "react-icons/fa6";
import ChatBot from "../chatbot/ai";
import { VscRobot } from "react-icons/vsc";

const Menu = ({ handleWeather, weatherState }) => {
  const { URL, login, user, authDispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const [menuState, setMenuState] = useState("dashboard")
    const [userState, setUserState] = useState("")
    const [adminState,setAdminState] = useState(false)
    const [chatbotState,setChatbotState] = useState(false)
 
    const handleLogout = () => {
        authDispatch({
            type: "SET_LOGIN",
            payload: { status: false, isSave: '' },
          })
        localStorage.clear();
        sessionStorage.clear();
        navigate("/");
    }
    const handleMenu = (key) => {
        if (key === userState) {setUserState("");}
        else {setUserState(key);}
        if (key !== "user") {setMenuState(key);}
    }
    const handleClick = () => {
      setChatbotState(!chatbotState);
      setMenuState(!menuState);
  }


  return (
    <div className="Fac_Menu">
        <BrowserView className="Fac_Menu_Web">
                <div className="Fac_Menu_Web_Container">
                    <img className="Fac_Menu_Web_Container_Logo" src="/icons/durian.png" alt="" />
                    <div className="Fac_Menu_Web_Container_Menu">
                        {
                            !adminState &&  
                            <div className="Fac_Menu_Web_Container_Menu_Elements" onClick={() => handleWeather(false)} style={weatherState ? { backgroundColor: "rgba(200, 200, 200, 0.3)", borderRadius: "50%" } : {}}>
                            <WiDayCloudy className="Fac_Menu_Web_Container_Menu_Elements_Icon" size={35} />

                        </div>
                        }
                        
                        <div className="Fac_Menu_Web_Container_Menu_Elements" onClick={() => {handleMenu("dashboard");setAdminState(false); navigate("/dashboard") }} style={menuState === "dashboard" ? { backgroundColor: "rgba(200, 200, 200, 0.3)", borderRadius: "50%" } : {}}>
                            <FiGrid className="Fac_Menu_Web_Container_Menu_Elements_Icon" size={25} />

                        </div>
                        <div className="Fac_Menu_Web_Container_Menu_Elements" onClick={() => handleMenu("Notification")} style={menuState === "Notification" ? { backgroundColor: "rgba(200, 200, 200, 0.3)", borderRadius: "50%" } : {}}>
                            <FiSettings className="Fac_Menu_Web_Container_Menu_Elements_Icon" size={25} />

                        </div>
                        <div className="Fac_Menu_Web_Container_Menu_Elements" onClick={() => handleMenu("Settings")} style={menuState === "Settings" ? { backgroundColor: "rgba(200, 200, 200, 0.3)", borderRadius: "50%" } : {}}>
                            <FiBell className="Fac_Menu_Web_Container_Menu_Elements_Icon" size={25} />
                        </div>
                        <div className="Fac_Menu_Web_Container_Menu_Elements">
                          <VscRobot className="Fac_Menu_Web_Container_Menu_Elements_Icon" size={25} color="white" onClick={handleClick}/>
                        </div>
                        {
                            user["membership_"]  == "admin"&&  
                            <div className="Fac_Menu_Web_Container_Menu_Elements" onClick={() => { handleWeather(true);setAdminState(true);handleMenu("Manage");navigate("/admin")}} style={menuState === "Manage" ? { backgroundColor: "rgba(200, 200, 200, 0.3)", borderRadius: "50%" } : {}}>
                            <FaRegAddressBook className="Fac_Menu_Web_Container_Menu_Elements_Icon" size={30} />
                        </div>
                        }

                    </div>
                    
                    <div style={{ position: "relative", zIndex: "10" }}>
                        <img className="Fac_Menu_Web_Container_Avartar" src="/icons/user.png" alt="" onClick={() => handleMenu("user")} />
                        {userState === "user" ?
                            <div className="Fac_Menu_Web_Container_Dropbox" >
                                <div className="Fac_Menu_Web_Container_Dropbox_Header">
                                    <div className="Fac_Menu_Web_Container_Dropbox_Header_Info">
                                        {user.user_name_}
                                        <div style={{ fontSize: "12px", fontWeight: "400" }}>{user.gmail_}</div>
                                    </div>

                                </div>
                                <div className="Fac_Menu_Web_Container_Dropbox_Options" onClick={() => { navigate("/usersetting"); setUserState("") }}>
                                    <FiSettings style={{ marginRight: "10px" }} />
                                    Account
                                </div>
                                <div onClick={() => handleLogout()} className="Fac_Menu_Web_Container_Dropbox_Options">
                                    <FiUserMinus style={{ marginRight: "10px" }} />
                                    Log out
                                </div>

                            </div> :
                            <></>
                        }

                    </div>

                </div>
            </BrowserView>
            
            
           { chatbotState && 
              <>{weatherState == true && <iframe
        src="http://38.242.250.193:8080/chatbot/z7RBE47FbvWwY3JO"
        style={{ width: '83.5vw', height: '87vh',right:"15px", minHeight: '700px',position: "relative", zIndex: "10", float: "right", top: "15px", borderRadius: "8px" }}
        frameborder="0"
        allow="microphone"
        title="Chat Bot" />
              }
              
              {weatherState != true && <iframe
        src="http://38.242.250.193:8080/chatbot/z7RBE47FbvWwY3JO"
        style={{ width: '98vw', height: '87vh',right:"15px", minHeight: '700px',position: "relative", zIndex: "10", float: "right", top: "15px", borderRadius: "8px" }}
        frameborder="0"
        allow="microphone"
        title="Chat Bot" />
              }
              </>
          }
           
      <MobileView className="Fac_Menu_Mobile">
        <div className="Fac_Menu_Mobile_Container">
          <div className="Fac_Menu_Mobile_Container_Menu">
            
            <div
              className="Fac_Menu_Mobile_Container_Menu_Elements"
              onClick={() => (handleMenu("dashboard"), navigate("/dashboard"))}
              style={
                menuState === "dashboard"
                  ? {
                      backgroundColor: "rgba(200, 200, 200, 0.3)",
                      borderRadius: "50%",
                    }
                  : {}
              }
            >
              <FiGrid
                className="Fac_Menu_Mobile_Container_Menu_Elements_Icon"
                size={25}
              />
            </div>
            <div
              className="Fac_Menu_Mobile_Container_Menu_Elements"
              onClick={() => handleWeather()}
              style={
                weatherState
                  ? {
                      backgroundColor: "rgba(200, 200, 200, 0.3)",
                      borderRadius: "50%",
                    }
                  : {}
              }
            >
              <WiDayCloudy
                className="Fac_Menu_Mobile_Container_Menu_Elements_Icon"
                size={35}
              />
            </div>
            <div
              className="Fac_Menu_Mobile_Container_Menu_Elements"
              onClick={() => handleMenu("Notification")}
              style={
                menuState === "Notification"
                  ? {
                      backgroundColor: "rgba(200, 200, 200, 0.3)",
                      borderRadius: "50%",
                    }
                  : {}
              }
            >
              <FiSettings
                className="Fac_Menu_Mobile_Container_Menu_Elements_Icon"
                size={25}
              />
            </div>
            <div
              className="Fac_Menu_Mobile_Container_Menu_Elements"
              onClick={() => handleMenu("Settings")}
              style={
                menuState === "Settings"
                  ? {
                      backgroundColor: "rgba(200, 200, 200, 0.3)",
                      borderRadius: "50%",
                    }
                  : {}
              }
            >
              <FiBell
                className="Fac_Menu_Mobile_Container_Menu_Elements_Icon"
                size={25}
              />
            </div>
            <div className="Fac_Menu_Mobile_Container_Menu_Elements">
            <img
              className="Fac_Menu_Mobile_Container_Menu_Elements_Avartar"
              src="/icons/user.png"
              alt=""
              onClick={() => handleMenu("user")}
            />

            {userState === "user" ? (
              <div className="Fac_Menu_Mobile_Container_Dropbox">
                <div className="Fac_Menu_Mobile_Container_Dropbox_Header">
                  <div className="Fac_Menu_Mobile_Container_Dropbox_Header_Info">
                    {user.user_name_}
                    <div style={{ fontSize: "12px", fontWeight: "400" }}>
                      {user.gmail_}
                    </div>
                  </div>
                </div>
                <div
                  className="Fac_Menu_Mobile_Container_Dropbox_Options"
                  onClick={() => {
                    navigate("/usersetting");
                    setUserState("");
                  }}
                >
                  <FiSettings style={{ marginRight: "10px" }} />
                  Account
                </div>
                <div
                  onClick={() => handleLogout()}
                  className="Fac_Menu_Mobile_Container_Dropbox_Options"
                >
                  <FiUserMinus style={{ marginRight: "10px" }} />
                  Log out
                </div>
              </div>
            ) : (
              <></>
            )}
            </div>
          </div>
          <div style={{ position: "relative", zIndex: "10" }}>
            
          </div>
        </div>
      </MobileView>
    </div>
  );
};
export default Menu;