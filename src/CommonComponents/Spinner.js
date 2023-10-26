import { useState, CSSProperties } from "react";
import { ScaleLoader } from "react-spinners";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "black",
};

function Spinner() {
  return (
    <div
      style={{ width: "100%", height: "63vh", padding: "10%" }}
      className="sweet-loading text-center"
    >
      <ScaleLoader
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
        color="#364AD6"
      />
    </div>
  );
}

export default Spinner;
