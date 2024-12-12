import React, { useState } from 'react';
import {getBankById,updateBankById} from './services/bankService.js';
import './css/App.css'

function UpdateById() {
    const [banks, setBanks] = useState([]);
    const [bankId, setBankId] = useState('');
    const [bankName, setBankName] = useState('');
    const [bankYear, setBankYear] = useState('');
    const [bankEmp, setBankEmp] = useState('');
    const [bankAddress, setBankAddress] = useState('');
    const [bankBranches, setBankBranches] = useState('');
    const [bankATMs, setBankATMs] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearchById = () => {
        getBankById(bankId)
            .then((response) => {
                setBanks([response.data]);
            })
            .catch((error) => {
                console.error('Error fetching bank by ID:', error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate required fields before sending the request
        if (!bankName || !bankYear || !bankEmp || !bankAddress || !bankBranches || !bankATMs) {
            setErrorMessage('All fields are required');
            return;
        }

        // Create the updated bank object
        const updatedBank = {
            bankName,
            bankYear: parseInt(bankYear),
            bankEmp: parseInt(bankEmp),
            bankAddress,
            bankBranches: parseInt(bankBranches),
            bankATMs: parseInt(bankATMs),
        };

        updateBankById(bankId, updatedBank)
            .then((response) => {
                alert('Bank updated successfully');
                // Clear form on successful submission
                setBankNameSearch('')
                setBankId('')
                setBankName('');
                setBankYear('');
                setBankEmp('');
                setBankAddress('');
                setBankBranches('');
                setBankATMs('');
                setErrorMessage('');
            })
            .catch((error) => {
                setErrorMessage('Error updating bank: ' + error.message);
            });


    };

    return (
        <div>
            <h2>Update Bank by ID</h2>

            <div>
                <input
                    type="text"
                    placeholder="Search by Bank ID"
                    value={bankId}
                    onChange={(e) => setBankId(e.target.value)}
                />
                <button onClick={handleSearchById}>Search by ID</button>
            </div>

            {banks.map((bank) => (
                <form onSubmit={handleSubmit} key={bank.bankId}>

                    <div>
                        <label>Bank Name:</label>
                        <input
                            type="text"
                            value={bankName}
                            placeholder={bank.bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Bank Address:</label>
                        <input
                            type="text"
                            value={bankAddress}
                            placeholder={bank.bankAddress}
                            onChange={(e) => setBankAddress(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Bank Year (Foundation Year):</label>
                        <input
                            type="number"
                            value={bankYear}
                            placeholder={bank.bankYear}
                            onChange={(e) => setBankYear(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Number of Employees:</label>
                        <input
                            type="number"
                            value={bankEmp}
                            placeholder={bank.bankEmp}
                            onChange={(e) => setBankEmp(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Number of Branches:</label>
                        <input
                            type="number"
                            value={bankBranches}
                            placeholder={bank.bankBranches}
                            onChange={(e) => setBankBranches(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Number of ATMs:</label>
                        <input
                            type="number"
                            value={bankATMs}
                            placeholder={bank.bankATMs}
                            onChange={(e) => setBankATMs(e.target.value)}
                            required
                        />
                    </div>

                    {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}

                    <button type="submit">Update Bank</button>
                </form>
            ))}
        </div>
    );
}

export default UpdateById;
