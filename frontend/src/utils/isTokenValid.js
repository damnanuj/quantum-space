import { jwtDecode } from "jwt-decode";

export const isTokenValid = () => {
  const token = localStorage.getItem("quantum-space");
  if (!token) return false;

  const decoded = jwtDecode(token);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};
