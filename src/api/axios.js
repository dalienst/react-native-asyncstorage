/* eslint-disable no-unused-vars */
import axios from "axios";

const ACCOUNTS_URL = "https://project-tracker-824z.onrender.com/accounts/";
// const ACCOUNTS_URL = "http://127.0.0.1:8000/accounts/"
const VAULT_URL = "https://project-tracker-824z.onrender.com/vault/"

export default axios.create({
    baseURL: ACCOUNTS_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export const api = axios.create({
    baseURL: ACCOUNTS_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

export const vaultApi = axios.create({
    baseURL: VAULT_URL,
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true
})
