import { createContext, useState, useEffect } from "react";
import { validateToken } from "../utils/apis/auth/validateToken";
import { logout as logoutApi } from "../utils/apis/auth/logoutApi";
import { fetchUserProfile } from "../utils/apis/feed/fetchUserProfile";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const { success, user } = await validateToken();
        setIsLoggedIn(success);
        if (user && user.username) {
          await fetchAndSetUser(user.username);
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  const fetchAndSetUser = async (username) => {
    try {
      const { data } = await fetchUserProfile(username);
      if (data) {
        setUserDetails(data);
      }
    } catch (error) {
      console.error("Error setting user details:", error);
    }
  };

  const login = async (username) => {
    try {
      await fetchAndSetUser(username);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = async () => {
    const response = await logoutApi();
    if (response.success) {
      setIsLoggedIn(false);
      setUserDetails(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ userDetails, isLoggedIn, setIsLoggedIn, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
