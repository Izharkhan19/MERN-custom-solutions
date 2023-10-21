import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  StandaloneSearchBox,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import axios from "axios";
import BreadcrumPath from "../../CommonComponents/BreadCrum";

const lib = ["places"];

function Map() {
  const pageNav = [
    {
      name: "Home",
      link: "/home",
      active: false,
    },
    {
      name: "Map",
      link: "/map",
      active: true,
    },
  ];
  // if (!presentLocation) {
  //   presentLocation = { lat: 38.21347, lng: -90.407188 };
  // }
  let presentLocation = { lat: 38.21347, lng: -90.407188 };
  const [center, setCenter] = useState();
  const [searchBox, setSearchBox] = useState(null);

  const onPlacesChanged = () => {
    const [place] = searchBox.getPlaces();
    if (place) {
      // setLocation(
      //   `${place?.geometry?.location?.lat()},${place?.geometry?.location?.lng()}`
      // );
      setCenter({
        lat: place?.geometry?.location?.lat(),
        lng: place?.geometry?.location?.lng(),
      });
    }
  };
  const onSBLoad = (ref) => {
    setSearchBox(ref);
  };

  async function fnLocationDetails() {
    try {
      const response = await axios.get("https://ipapi.co/json");
      const data = response.data;
      setCenter({
        lat: data.latitude,
        lng: data.longitude,
      });
      // setlatitude(data.latitude);
      // setlongitude(data.longitude);
      // settimezone(data.timezone);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  }
  useEffect(() => {
    fnLocationDetails();
  }, []);

  return (
    <>
      <BreadcrumPath pageNav={pageNav} />

      <LoadScript
        googleMapsApiKey={"AIzaSyC5jLWPa_hRkT8ryV11Tmi_Zpd05hG3S2A"}
        libraries={lib}
      >
        <GoogleMap
          mapContainerStyle={{ height: "70vh", width: "100%" }}
          center={center ? center : presentLocation}
          zoom={12}
          options={{ mapTypeControl: false }}
        >
          <StandaloneSearchBox
            onPlacesChanged={onPlacesChanged}
            onLoad={onSBLoad}
          >
            <div
              style={{ position: "absolute" }}
              className="from-groups no-border-break m-3"
            >
              <input type="text" placeholder="Enter location" />
            </div>
          </StandaloneSearchBox>
          <Marker position={center ? center : presentLocation} />
        </GoogleMap>
      </LoadScript>
    </>
  );
}
export default Map;
