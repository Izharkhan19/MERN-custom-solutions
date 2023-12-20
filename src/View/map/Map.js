// // import React, { useState } from "react";
// // import {
// //   GoogleMap,
// //   StandaloneSearchBox,
// //   LoadScript,
// //   Marker,
// // } from "@react-google-maps/api";
// // import BreadcrumPath from "../../CommonComponents/BreadCrum";

// // const lib = ["places"];

// // function Map() {
// //   const pageNav = [
// //     {
// //       name: "Home",
// //       link: "/home",
// //       active: false,
// //     },
// //     {
// //       name: "Map",
// //       link: "/map",
// //       active: true,
// //     },
// //   ];
// //   // if (!presentLocation) {
// //   //   presentLocation = { lat: 38.21347, lng: -90.407188 };
// //   // }
// //   let presentLocation = { lat: 38.21347, lng: -90.407188 };
// //   const [center, setCenter] = useState();
// //   const [searchBox, setSearchBox] = useState(null);

// //   const onPlacesChanged = () => {
// //     const [place] = searchBox.getPlaces();
// //     if (place) {
// //       // setLocation(
// //       //   `${place?.geometry?.location?.lat()},${place?.geometry?.location?.lng()}`
// //       // );
// //       setCenter({
// //         lat: place?.geometry?.location?.lat(),
// //         lng: place?.geometry?.location?.lng(),
// //       });
// //     }
// //   };
// //   const onSBLoad = (ref) => {
// //     setSearchBox(ref);
// //   };

// //   return (
// //     <>
// //       <BreadcrumPath pageNav={pageNav} />

// //       <LoadScript
// //         googleMapsApiKey={"AIzaSyC5jLWPa_hRkT8ryV11Tmi_Zpd05hG3S2A"}
// //         libraries={lib}
// //       >
// //         <GoogleMap
// //           mapContainerStyle={{ height: "70vh", width: "100%" }}
// //           center={center ? center : presentLocation}
// //           zoom={12}
// //           options={{ mapTypeControl: false }}
// //         >
// //           <StandaloneSearchBox
// //             onPlacesChanged={onPlacesChanged}
// //             onLoad={onSBLoad}
// //           >
// //             <div
// //               style={{ position: "absolute" }}
// //               className="from-groups no-border-break m-3"
// //             >
// //               {/* <input type="text" placeholder="Enter location" /> */}
// //             </div>
// //           </StandaloneSearchBox>
// //           <Marker position={center ? center : presentLocation} />
// //         </GoogleMap>
// //       </LoadScript>
// //     </>
// //   );
// // }
// // export default Map;

// import React, { useState } from "react";
// import {
//   GoogleMap,
//   StandaloneSearchBox,
//   LoadScript,
//   Marker,
//   DirectionsService,
//   DirectionsRenderer,
// } from "@react-google-maps/api";
// import BreadcrumPath from "../../CommonComponents/BreadCrum";

// const lib = ["places", "directions"]; // Add "directions" library

// function Map() {
//   const pageNav = [
//     {
//       name: "Home",
//       link: "/home",
//       active: false,
//     },
//     {
//       name: "Map",
//       link: "/map",
//       active: true,
//     },
//   ];

//   let presentLocation = { lat: 38.21347, lng: -90.407188 };
//   const [center, setCenter] = useState();
//   const [searchBox, setSearchBox] = useState(null);
//   const [directions, setDirections] = useState(null);

//   const onPlacesChanged = () => {
//     const [place] = searchBox.getPlaces();
//     if (place) {
//       setCenter({
//         lat: place?.geometry?.location?.lat(),
//         lng: place?.geometry?.location?.lng(),
//       });
//     }
//   };

//   const onSBLoad = (ref) => {
//     setSearchBox(ref);
//   };

//   const onDirectionsServiceLoad = (directionsService) => {
//     const destination = new window.google.maps.LatLng(
//       center.lat,
//       center.lng
//     );

//     const origin = new window.google.maps.LatLng(
//       presentLocation.lat,
//       presentLocation.lng
//     );

//     directionsService.route(
//       {
//         origin: origin,
//         destination: destination,
//         travelMode: window.google.maps.TravelMode.DRIVING,
//       },
//       (result, status) => {
//         if (status === window.google.maps.DirectionsStatus.OK) {
//           setDirections(result);
//         } else {
//           console.error(`Directions request failed due to ${status}`);
//         }
//       }
//     );
//   };

//   return (
//     <>
//       <BreadcrumPath pageNav={pageNav} />

//       <LoadScript
//         googleMapsApiKey={"AIzaSyC5jLWPa_hRkT8ryV11Tmi_Zpd05hG3S2A"}
//         libraries={lib}
//       >
//         <GoogleMap
//           mapContainerStyle={{ height: "70vh", width: "100%" }}
//           center={center ? center : presentLocation}
//           zoom={12}
//           options={{ mapTypeControl: false }}
//         >
//           <StandaloneSearchBox
//             onPlacesChanged={onPlacesChanged}
//             onLoad={onSBLoad}
//           >
//             <div
//               style={{ position: "absolute" }}
//               className="from-groups no-border-break m-3"
//             />
//           </StandaloneSearchBox>
//           <Marker position={center ? center : presentLocation} />

//           {/* Add DirectionsService component */}
//           {center && (
//             <DirectionsService
//               onLoad={onDirectionsServiceLoad}
//               options={{ suppressMarkers: true }}
//             />
//           )}

//           {/* Display the route on the map */}
//           {directions && (
//             <DirectionsRenderer
//               directions={directions}
//               options={{
//                 polylineOptions: {
//                   strokeColor: "blue",
//                   strokeWeight: 4,
//                 },
//                 markerOptions: {
//                   icon: {
//                     url: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
//                     scaledSize: new window.google.maps.Size(30, 30),
//                   },
//                 },
//               }}
//             />
//           )}
//         </GoogleMap>
//       </LoadScript>
//     </>
//   );
// }

// export default Map;

import React, { useState } from "react";
import {
  GoogleMap,
  StandaloneSearchBox,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  Polyline,
} from "@react-google-maps/api";
import BreadcrumPath from "../../CommonComponents/BreadCrum";

const lib = ["places", "directions"];

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

  let presentLocation = { lat: 23.014509, lng: 72.591759 };
  const [center, setCenter] = useState();
  const [searchBox, setSearchBox] = useState(null);
  const [directions, setDirections] = useState(null);

  const onPlacesChanged = () => {
    const [place] = searchBox.getPlaces();
    if (place) {
      setCenter({
        lat: place?.geometry?.location?.lat(),
        lng: place?.geometry?.location?.lng(),
      });
    }
  };

  const onSBLoad = (ref) => {
    setSearchBox(ref);
  };

  const onDirectionsServiceLoad = (directionsService) => {
    const destination = new window.google.maps.LatLng(
      center.lat,
      center.lng
    );

    const origin = new window.google.maps.LatLng(
      presentLocation.lat,
      presentLocation.lng
    );

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`Directions request failed due to ${status}`);
        }
      }
    );
  };

  // Define static routes as an array of waypoints
  const staticRoutes = [
    { lat: 38.21347, lng: -90.407188 },
    { lat: 38.22347, lng: -90.407188 },
    // Add more waypoints as needed
  ];

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
            />
          </StandaloneSearchBox>
          <Marker position={center ? center : presentLocation} />

          {/* Display the route from DirectionsRenderer */}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  strokeColor: "blue",
                  strokeWeight: 4,
                },
              }}
            />
          )}

          {/* Display static routes using Polyline */}
          <Polyline
            path={staticRoutes}
            options={{
              strokeColor: "red",
              strokeWeight: 4,
            }}
          />
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default Map;
