import React, { useState, useEffect } from 'react';
import { getAllBanks } from './services/bankService.js';
import './css/App.css'

function Display() {
    const [banks, setBanks] = useState([]);
    // const [bankId, setBankId] = useState('');
    // const [bankName, setBankName] = useState('');

    useEffect(() => {
        getAllBanks()
            .then((response) => {
                setBanks(response.data);
            })
            .catch((error) => {
                console.error('Error fetching banks:', error);
            });
    }, []);

    return (
        <div>
            <h2>Bank List</h2>
            <ul>
                {banks.map((bank) => (
                    <li key={bank.bankId}>
                        <strong>{bank.bankName}</strong>
                        <p>Foundation Year: {bank.bankYear}</p>
                        <p>Number of Employees: {bank.bankEmp}</p>
                        <p>Number of Branches: {bank.bankBranches}</p>
                        <p>Number of ATMs: {bank.bankATMs}</p>
                        <p>{bank.bankAddress}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Display;
