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
  const [isSignedIn, setIsSignedIn] = useState(false);

  const loginUser = async (inputs) => {
    try {
      const response = await axios.post(urls.LOGIN, inputs);
      setTokens(response.data);
      const userID = jwtDecode(response.data.access);
      setUser(userID);
      await AsyncStorage.setItem("tokens", JSON.stringify(response.data));
      setIsSignedIn(true);
    } catch (error) {}
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("tokens");
      setTokens(null);
      setUser(null);
    } catch (error) {}
  };

  const updateUser = async () => {
    try {
      const storedTokens = await AsyncStorage.getItem("tokens");

      if (storedTokens) {
        const response = await axios.post(urls.REFRESH, {
          refresh: JSON.parse(storedTokens).refresh,
        });

        const data = response.data;
        setTokens(data);
        const decodedToken = jwtDecode(data.access);
        setUser(decodedToken);
        await AsyncStorage.setItem("tokens", JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    // Check authentication status on app start
    const checkAuthentication = async () => {
      try {
        const storedTokens = await AsyncStorage.getItem("tokens");

        if (storedTokens) {
          const decodedToken = jwtDecode(JSON.parse(storedTokens).access);
          setUser(decodedToken);
          setTokens(JSON.parse(storedTokens));
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }

      setIsLoading(false);
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    // refresh user
    const tenMinutes = 1000 * 60 * 30;
    const interval = setInterval(() => {
      if (!tokens) {
        updateUser();
      }
    }, tenMinutes);

    return () => clearInterval(interval);
  }, [tokens]);

  const authContextValue = {
    user,
    loginUser,
    tokens,
    logout,
    isSignedIn,
    setIsSignedIn,
    isLoading,
    setUser,
    setTokens,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
