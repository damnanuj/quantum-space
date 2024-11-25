// App.js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";

import "./App.scss";

import LoadingWrapper from "./components/Common/LoadingWrapper/LoadingWrapper";
import { isTokenValid } from "./utils/isTokenValid";
import Header from "./components/Common/Header/Header";

const Homepage = lazy(() => import("./pages/Homepage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const Feed = lazy(() => import("./pages/FeedPage"));
const WrongRoute = lazy(() => import("./pages/WrongRoute"));

function App() {
  useEffect(() => {
    if (!isTokenValid()) {
      console.log("unauthorized");
      // localStorage.removeItem("quantum-space");
      // window.location.href = "/login";
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoadingWrapper Component={Homepage} />} />
          <Route
            path="/login"
            element={<LoadingWrapper Component={LoginPage} />}
          />
          <Route
            path="/signup"
            element={<LoadingWrapper Component={SignupPage} />}
          />

          {/* Private Route */}
          <Route path="/feed" element={<LoadingWrapper Component={Feed} />} />

          {/* Fallback Route */}
          <Route path="*" element={<LoadingWrapper Component={WrongRoute} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
