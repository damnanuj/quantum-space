// App.js
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { lazy, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import "./App.scss";

import LoadingWrapper from "./components/Common/LoadingWrapper/LoadingWrapper";
import Loader from "./components/Common/Loader/Loader";

const Homepage = lazy(() => import("./pages/Homepage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const Feed = lazy(() => import("./pages/FeedPage"));
const WrongRoute = lazy(() => import("./pages/WrongRoute"));

function App() {
  const { isLoggedIn, loading } = useContext(AuthContext);

  if (loading) return <Loader/>;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoadingWrapper Component={Homepage} />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/feed" /> : <LoadingWrapper Component={LoginPage} />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/feed" /> : <LoadingWrapper Component={SignupPage} />} />

          {/* Private Route */}
          <Route path="/feed" element={isLoggedIn ? <LoadingWrapper Component={Feed} /> : <Navigate to="/login" />} />

          {/* Fallback Route */}
          <Route path="*" element={<LoadingWrapper Component={WrongRoute} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
