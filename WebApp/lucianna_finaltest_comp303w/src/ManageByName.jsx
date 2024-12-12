import React, { useState } from 'react';
import {
    deleteBankByName,
    getBankById,
    getBankByName,
    updateBankById,
    updateBankByName
} from './services/bankService.js';
import './css/App.css'

function ManageByName() {
    const [banks, setBanks] = useState([]);
    const [bankName, setBankName] = useState('');
    const [nameToDelete, setNameToDelete] = useState('');
    const [bankNameSearch, setBankNameSearch] = useState('')
    const [bankYear, setBankYear] = useState('');
    const [bankEmp, setBankEmp] = useState('');
    const [bankAddress, setBankAddress] = useState('');
    const [bankBranches, setBankBranches] = useState('');
    const [bankATMs, setBankATMs] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearchByName = () => {
        getBankByName(bankNameSearch)
            .then((response) => {
                setBanks([response.data]);
            })
            .catch((error) => {
                console.error('Error fetching bank by Name:', error);
                alert('Error fetching bank: ' + error.message);
            });
    };

    const handleDeleteByName = () => {
        deleteBankByName(nameToDelete)
            .then((response) => {
                setBanks([response.data]);
                alert('Bank deleted successfully')
                setNameToDelete('')
            })
            .catch((error) => {
                console.error('Error fetching bank by Name:', error);
                setErrorMessage('Error deleting bank: ' + error.message);
            });
    }

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

        updateBankByName(bankName, updatedBank)
            .then((response) => {
                alert('Bank updated successfully');
                // Clear form on successful submission
                setBankNameSearch('')
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
            <h2>Manage Bank by Name</h2>
            <div>
                <input
                    type="text"
                    placeholder="Search by Bank Name"
                    value={bankNameSearch}
                    onChange={(e) => setBankNameSearch(e.target.value)}
                />
                <button onClick={handleSearchByName}>Search by Name</button>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Delete by Bank Name"
                    value={nameToDelete}
                    onChange={(e) => setNameToDelete(e.target.value)}
                />
                <button className="btn-danger" onClick={handleDeleteByName}>Delete by Name</button>
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


export default ManageByName;