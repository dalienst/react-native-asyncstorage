import base64 from "react-native-base64";
import { api } from "../api/axios";

export const fetchPerson = async (tokens) => {
  try {
    const decodedTokens = base64.decode(tokens.split(".")[1]);
    const decodedTokensObject = JSON.parse(decodedTokens);
    const userID = decodedTokensObject.user_id;

    if (!userID) {
      return null;
    }

    const response = await api.get(`me/${userID}/`, {
      headers: {
        Authorization: `Bearer ${tokens}`,
      },
    });

    return response?.data;
  } catch (error) {
    return null;
  }
};

// You can add more functions here if needed
// For example, you can create separate functions for fetching other data

export const fetchSomeOtherData = async (tokens) => {
  // Your logic for fetching other data
};
