import React from "react";
import "./wrongRoute.scss";
import { Link } from "react-router-dom";
import CommonButton from "../components/Common/Button/CommonButton";

const WrongRoute = () => {
  return (
    <div className="wrongRoutePage">
      <p className="oop">OOPS, Looks Like You Picked A Wrong Route </p>
      <p className="errCode"> Error : </p> : null
      <div>
        <h1 className="four">4</h1>
        <span className="material-icons sadEmoji">
          sentiment_very_dissatisfied
        </span>
        <h1 className="four">4</h1>
      </div>
      <p className="oop">Let's Go Back To Feed Page Together</p>
      <Link className="home" to="/feed">
        <CommonButton text={"Feed"} color={"blue"} />
      </Link>
    </div>
  );
};

export default WrongRoute;
