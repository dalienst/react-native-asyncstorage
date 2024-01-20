import React, { useState, useEffect, createContext } from "react";
import axios, { api } from "../api/axios";
import { urls } from "../navigation/Links";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const tokensLocalStorage = JSON.parse(localStorage.getItem("tokens"));
  const onLoadTokens = tokensLocalStorage ? tokensLocalStorage : null;
  const decodedToken = tokensLocalStorage
    ? jwt_decode(tokensLocalStorage.access)
    : null;
  const [user, setUser] = useState(() => decodedToken);
  const [tokens, setTokens] = useState(() => onLoadTokens);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on app start
    checkAuthentication();
    // refresh user
    const tenMinutes = 1000 * 60 * 10;
    const interval = setInterval(() => {
      if (!tokens) {
        updateUser();
      }
    }, tenMinutes);

    return () => clearInterval(interval);
  }, [tokens]);

  const checkAuthentication = async () => {
    if (tokens) {
      try {
        const response = await api.get(`me/${user?.user_id}/`, {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
          },
        });
        setUser(response.data);
      } catch (error) {}
    }
    setIsLoading(false);
  };

  const loginUser = async (inputs) => {
    const response = await axios.post(urls.LOGIN, inputs);
    setTokens(response.data);
    const userID = jwt_decode(response.data.access);
    setUser(userID);
    localStorage.setItem("tokens", JSON.stringify(response.data));
  };

  const logout = () => {
    localStorage.removeItem("tokens");
    setTokens(null);
    setUser(null);
  };

  const updateUser = async () => {
    try {
      const response = await axios.post(urls.REFRESH, {
        refresh: tokens.refresh,
      });
      const data = await response.json();
      setTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("tokens", JSON.stringify(data));
    } catch (error) {}
  };

  const authContextValue = {
    user,
    userId: user ? user.id : null, // Include user ID in the context
    isLoading,
    loginUser,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
