import React, { useState, useEffect } from 'react';
import { getAllBanks } from '../services/bankService.js';
import '../css/App.css'

function BankList() {
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
                        <p>Bank Name:<strong> {bank.bankName}</strong></p>
                        <p>Founded in {bank.bankYear}, has {bank.bankEmp} employees, {bank.bankBranches} branches, and {bank.bankATMs} ATMs</p>
                        <p>Address: {bank.bankAddress}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BankList;
