import React, { useState, useEffect } from 'react';
import { getAllBanks, getBankById, getBankByName } from './services/bankService.js';
import './css/App.css'

function DisplayBanks() {
    const [banks, setBanks] = useState([]);
    const [bankId, setBankId] = useState('');
    const [bankName, setBankName] = useState('');

    useEffect(() => {
        getAllBanks()
            .then((response) => {
                setBanks(response.data);
            })
            .catch((error) => {
                console.error('Error fetching banks:', error);
            });
    }, []);

    const handleSearchById = () => {
        getBankById(bankId)
            .then((response) => {
                setBanks([response.data]);
            })
            .catch((error) => {
                console.error('Error fetching bank by ID:', error);
            });
    };

    const handleSearchByName = () => {
        getBankByName(bankName)
            .then((response) => {
                setBanks([response.data]);
            })
            .catch((error) => {
                console.error('Error fetching bank by Name:', error);
            });
    };

    const handleDisplayAllBanks = () => {
        getAllBanks()
            .then((response) => {
                setBanks(response.data);
            })
            .catch((error) => {
                console.error('Error fetching all banks:', error);
            });
    };

    return (
        <div>
            <h2>List of Banks</h2>

            <button onClick={handleDisplayAllBanks}>Display All Banks</button>

            <div>
                <input
                    type="text"
                    placeholder="Search by Bank ID"
                    value={bankId}
                    onChange={(e) => setBankId(e.target.value)}
                />
                <button onClick={handleSearchById}>Search by ID</button>
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Search by Bank Name"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                />
                <button onClick={handleSearchByName}>Search by Name</button>
            </div>

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

export default DisplayBanks;
