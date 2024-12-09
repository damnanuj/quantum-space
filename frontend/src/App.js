import { Route, Routes, useNavigate } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import "./App.scss";
import LoadingWrapper from "./components/Common/LoadingWrapper/LoadingWrapper";
import { isTokenValid } from "./utils/isTokenValid";
import ProfilePage from "./pages/ProfilePage";
import PostsPage from "./pages/PostsPage";
import { UserProvider } from "./context/userContext";

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

    if (!loggedIn) {
      if (
        currentPath !== "/" &&
        currentPath !== "/login" &&
        currentPath !== "/signup"
      ) {
        navigate("/login");
      }
    } else {
      if (currentPath === "/login" || currentPath === "/signup") {
        navigate("/feed");
      }
    }
  }, [navigate, isUserLogged, window.location.pathname]);

  return (
    <div className="App">
      <UserProvider>
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
              <Route path="/" element={<LoadingWrapper Component={Feed} />}>
                <Route path="/feed" element={<PostsPage />} />
                <Route path="/profile/:username" element={<ProfilePage />} />
              </Route>
            </>
          )}
          {/* fallback ui 404 */}
          <Route path="*" element={<LoadingWrapper Component={WrongRoute} />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
