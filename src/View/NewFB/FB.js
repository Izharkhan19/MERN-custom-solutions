import React, { useState } from "react";
// import FacebookLogin from "react-facebook-login";
import FacebookLogin from "@greatsumini/react-facebook-login";

const FB = () => {
  //   const responseFacebook = (response) => {
  //     console.log("first response ::", response);
  //   };
  //   const [first, setfirst] = useState(false);
  //   const componentClicked = (data) => {
  //     setfirst(true);
  //     console.log("second response ::", data);
  //   };
  return (
    <div>
      {/* {" "}
      <FacebookLogin
        appId="358962536669167"
        autoLoad={false}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
      /> */}

      <FacebookLogin
        appId="358962536669167"
        onSuccess={(response) => {
          // console.log("Login Success!", response);
        }}
        onFail={(error) => {
          // console.log("Login Failed!", error);
        }}
        onProfileSuccess={(response) => {
          // console.log("Get Profile Success!", response);
        }}
      />
    </div>
  );
};

export default FB;
