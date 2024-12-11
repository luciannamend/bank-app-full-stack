import React, { useState } from 'react';
import { createBank } from './services/bankService.js'; // Assuming you have a service function to create a bank

function CreateBank() {
    const [bankName, setBankName] = useState('');
    const [bankYear, setBankYear] = useState('');
    const [bankEmp, setBankEmp] = useState('');
    const [bankAddress, setBankAddress] = useState('');
    const [bankBranches, setBankBranches] = useState('');
    const [bankATMs, setBankATMs] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate required fields before sending the request
        if (!bankName || !bankYear || !bankEmp || !bankAddress || !bankBranches || !bankATMs) {
            setErrorMessage('All fields are required');
            return;
        }

        // Create the bank object
        const newBank = {
            bankName,
            bankYear: parseInt(bankYear),
            bankEmp: parseInt(bankEmp),
            bankAddress,
            bankBranches: parseInt(bankBranches),
            bankATMs: parseInt(bankATMs),
        };

        createBank(newBank)
            .then((response) => {
                alert('Bank created successfully');
                // Clear form on successful submission
                setBankName('');
                setBankYear('');
                setBankEmp('');
                setBankAddress('');
                setBankBranches('');
                setBankATMs('');
                setErrorMessage('');
            })
            .catch((error) => {
                setErrorMessage('Error creating bank: ' + error.message);
            });
    };

    return (
        <div>
            <h2>Create Bank</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Bank Name:</label>
                    <input
                        type="text"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Bank Year (Foundation Year):</label>
                    <input
                        type="number"
                        value={bankYear}
                        onChange={(e) => setBankYear(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Number of Employees:</label>
                    <input
                        type="number"
                        value={bankEmp}
                        onChange={(e) => setBankEmp(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Bank Address:</label>
                    <input
                        type="text"
                        value={bankAddress}
                        onChange={(e) => setBankAddress(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Number of Branches:</label>
                    <input
                        type="number"
                        value={bankBranches}
                        onChange={(e) => setBankBranches(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Number of ATMs:</label>
                    <input
                        type="number"
                        value={bankATMs}
                        onChange={(e) => setBankATMs(e.target.value)}
                        required
                    />
                </div>

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                <button type="submit">Create Bank</button>
            </form>
        </div>
    );
}

export default CreateBank;
