import React from "react";
import "./LandingPage.scss";
import banner from "../../imgs/landingpage Banner.png";
import { Link } from "react-router-dom";

const LandingPage = ({currentPage}) => {
  return (
    <>
      <div className="LandingPageContainer">
        <div className="homeLeft">
          {/* <!--================== left part ======================--> */}
          <div className="HeadingDescContainer">
            <h1 className="heading"> Welcome to <span className="spaceHeading">Quamtom Space</span> </h1>
            <p className="desc">
              {" "}
              “Join our community and stay connected with friends, family, and
              people who share your interests. Share your thoughts, photos, and
              experiences in real-time.”
            </p>

            {/* <!--===================  buttons  ======================= --> */}

            <div className="HomePageButtonsFlex">
              <Link className="btn btn1" to="/login">
                Get started
              </Link>
              {/* <a className=" btn btn2" href="">Learn more</a> */}
            </div>
          </div>
        </div>

        {/* <!-- =========== right banner illustration part  ========== --> */}
        <div className="homeRight">
         {
         currentPage ==="landingPage" ? <img src={banner} alt="illustration" className="banner" /> :null
         }
        </div>
      </div>
    </>
  );
};

export default LandingPage;
