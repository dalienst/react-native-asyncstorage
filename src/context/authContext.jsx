import React, { useState, useEffect, createContext } from "react";
import axios from "../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { urls } from "../navigation/Links";
import JWT from "expo-jwt";
import base64 from "react-native-base64";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const loginUser = async (inputs) => {
    try {
      const response = await axios.post(urls.LOGIN, inputs);
      setTokens(response.data.access);
      const decodedTokens = base64.decode(response.data.access.split(".")[1]);
      const decodedTokensObject = JSON.parse(decodedTokens);
      setUser(decodedTokensObject?.user_id);
      await AsyncStorage.setItem(
        "tokens",
        JSON.stringify(response.data.access)
      );
      setIsSignedIn(true);
    } catch (error) {}
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("tokens");
      setTokens(null);
      setUser(null);
      setIsSignedIn(false);
    } catch (error) {}
  };

  // TODO: correct the tokens decoding
  const updateUser = async () => {
    try {
      const storedTokens = await AsyncStorage.getItem("tokens");

      if (storedTokens) {
        const response = await axios.post(urls.REFRESH, {
          refresh: JSON.parse(storedTokens).refresh,
        });

        const data = response.data;
        setTokens(data);
        const decodedToken = base64.decode(data.access.split(".")[1]);
        const decodedTokenObject = JSON.parse(decodedToken);
        setUser(decodedTokenObject);
        await AsyncStorage.setItem("tokens", JSON.stringify(data));
      }
    } catch (error) {}
  };

  useEffect(() => {
    // refresh user
    const tenMinutes = 1000 * 60 * 60;
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
