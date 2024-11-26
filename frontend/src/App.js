import { Route, Routes, useNavigate } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import "./App.scss";
import LoadingWrapper from "./components/Common/LoadingWrapper/LoadingWrapper";
import { isTokenValid } from "./utils/isTokenValid";

const Homepage = lazy(() => import("./pages/Homepage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const Feed = lazy(() => import("./pages/FeedPage"));
const WrongRoute = lazy(() => import("./pages/WrongRoute"));

function App() {
  const [isUserLogged, setIsUserLogged] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = isTokenValid();
    setIsUserLogged(loggedIn);

    const currentPath = window.location.pathname;
    if (loggedIn && (currentPath === "/login" || currentPath === "/signup")) {
      navigate("/feed");
    }
  }, [navigate]);

  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoadingWrapper Component={Homepage} />} />

        {!isUserLogged && (
          <>
            <Route
              path="/login"
              element={<LoadingWrapper Component={LoginPage} />}
            />
            <Route
              path="/signup"
              element={<LoadingWrapper Component={SignupPage} />}
            />
          </>
        )}

        {/* Protected Routes */}
        {isUserLogged && (
          <>
            <Route path="/feed" element={<LoadingWrapper Component={Feed} />} />
          </>
        )}
        {/* fallback ui 404 */}
        <Route path="*" element={<LoadingWrapper Component={WrongRoute} />} />
      </Routes>
    </div>
  );
}

export default App;
