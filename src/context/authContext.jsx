import React, { useState, useEffect, createContext } from "react";
import axios from "../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { urls } from "../navigation/Links";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(null);
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
    const storedTokens = await AsyncStorage.getItem("tokens");

    if (storedTokens) {
      try {
        const decodedToken = jwtDecode(storedTokens.access);
        setUser(decodedToken);
        setTokens(JSON.parse(storedTokens));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    setIsLoading(false);
  };

  const loginUser = async (inputs) => {
    try {
      const response = await axios.post(urls.LOGIN, inputs);
      setTokens(response.data);
      const userID = jwtDecode(response.data.access);
      setUser(userID);
      await AsyncStorage.setItem("tokens", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("tokens");
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
      const decodedToken = jwtDecode(data.access);
      setUser(decodedToken);
      await AsyncStorage.setItem("tokens", JSON.stringify(data));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const authContextValue = {
    user,
    userId: user ? user.id : null,
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
