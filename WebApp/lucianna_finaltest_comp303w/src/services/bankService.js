import axios from 'axios';

// handles all interactions with bank api

const API_URL = 'http://localhost:8080/api/banks'; // base url


// • Get a list of all the Banks in the “Bank” table
export const getAllBanks = () => {
    return axios.get(API_URL);
};

// • Get a Bank via BankID
export const getBankById = (bankId) => {
    return axios.get(`${API_URL}/by-id/${bankId}`);
};

// • Get a Bank via BankName
export const getBankByName = (bankName) => {
    return axios.get(`${API_URL}/by-name/${bankName}`);
};

// • Add a Bank to the “Bank” Table
export const createBank = (bank) => {
    return axios.post(API_URL, bank);
};

// • Update a Bank via BankID
export const updateBankById = (bankId, updatedBank) => {
    return axios.put(`${API_URL}/by-id/${bankId}`, updatedBank);
};

// • Update a Bank via BankName
export const updateBankByName = (bankName, updatedBank) => {
    return axios.put(`${API_URL}/by-name/${bankName}`, updatedBank);
};

// • Delete a Bank via BankID
export const deleteBankById = (bankId) => {
    return axios.delete(`${API_URL}/by-id/${bankId}`);
};

// • Delete a Bank via BankName
export const deleteBankByName = (bankName) => {
    return axios.delete(`${API_URL}/by-name/${bankName}`);
};
