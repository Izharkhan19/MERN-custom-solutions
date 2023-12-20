import React, { useCallback, useEffect, useState } from "react";
import { LoginSocialFacebook } from "reactjs-social-login";

// CUSTOMIZE ANY UI BUTTON
import { FacebookLoginButton } from "react-social-login-buttons";
import { Button, Card, Col, Row } from "react-bootstrap";
import Mainpage from "./Pages/Mainpage";
import { ToastError } from "../../CommonComponents/Toasters";
import axios from "axios";
import FB from "../NewFB/FB";

const FacebookPage = () => {
  const [data, setData] = useState([]);

  const [Token, setToken] = useState(localStorage.getItem("userData"));
  // let Token = localStorage.getItem("accessToken");

  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState(null);

  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setToken("");
    localStorage.clear();
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  const FetchData = async () => {
    debugger;
    let res = await axios(
      `https://graph.facebook.com/facebook/picture?redirect=false`
    );
    if (res?.data) {
      if (res?.data?.data) {
        setData(res.data.data);
      } else {
        ToastError("Somethin went wrong.");
      }
    } else {
      ToastError("Somethin went wrong.");
    }
  };

  const handleLogin = async (provider, data) => {
    await FetchData();
    localStorage.setItem("userData", JSON.stringify(data.accessToken));
    setToken(data.accessToken);
    // setProvider(provider);
    setProfile(data);
  };

  useEffect(() => {
    // http://localhost:3000/register-signin
    // FetchData();
  }, []);

  return (
    <>
      <FB />
      <br />
      <div>
        {!Token && (
          <div className={`App ${provider && profile ? "hide" : ""}`}>
            <LoginSocialFacebook
              isOnlyGetToken
              appId={"316257101206144"}
              onLoginStart={onLoginStart}
              onResolve={({ provider, data }) => {
                handleLogin(provider, data);
              }}
              onReject={(err) => {
                console.log(err);
              }}
            >
              {/* <FacebookLoginButton /> */}
            </LoginSocialFacebook>
          </div>
        )}
        {Token && (
          <>
            <div className="d-flex">
              <div>
                <img src={data.url} alt="" /> Facebook
              </div>
              <div style={{ marginBottom: "5px", marginLeft: "1120px" }}>
                <Button
                  style={{ width: "100px" }}
                  onClick={(e) => onLogoutSuccess(e)}
                >
                  Logout
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {Token && <Mainpage />}
    </>
  );
};

export default FacebookPage;
