import React from "react";
import spinner from "./spinner.svg";
import "./spinner.scss";

const Spinner = () => {
  return (
    <div className="loading">
      <img src={spinner} alt="spinner" />
    </div>
  );
};

export default Spinner;
