import React, { useState, useEffect, createContext } from "react";
import axios from "../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { urls } from "../navigation/Links";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedTokens = AsyncStorage.getItem("tokens");
  const onLoadTokens = storedTokens ? storedTokens : null;
  const decodedToken = storedTokens ? jwtDecode(storedTokens.access) : null;
  const [user, setUser] = useState(() => decodedToken);
  const [tokens, setTokens] = useState(() => onLoadTokens);
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const loginUser = async (inputs) => {
    try {
      const response = await axios.post(urls.LOGIN, inputs);
      setTokens(response.data);
      const userID = jwtDecode(response.data.access);
      setUser(userID);
      AsyncStorage.setItem("tokens", JSON.stringify(response.data));
      setIsSignedIn(true);
    } catch (error) {}
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
    } catch (error) {}
  };

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

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        tokens,
        logout,
        isSignedIn,
        setIsSignedIn,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
