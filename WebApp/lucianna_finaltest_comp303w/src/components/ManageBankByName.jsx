import React, { useState } from 'react';
import {
    deleteBankByName,
    getBankByName,
    updateBankByName
} from '../services/bankService.js';
import '../css/App.css'
import BankForm from "./BankForm.jsx";

function ManageBankByName() {
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

        // CreateBank the updated bank object
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

            <section>
                {/*Search by name*/}
                <div>
                    <input
                        type="text"
                        placeholder="Search by Bank Name"
                        value={bankNameSearch}
                        onChange={(e) => setBankNameSearch(e.target.value)}
                    />
                    <button onClick={handleSearchByName}>Search by Name</button>
                </div>
            </section>

            <section>
                {/*Delete by name*/}
                <div>
                    <input
                        type="text"
                        placeholder="Delete by Bank Name"
                        value={nameToDelete}
                        onChange={(e) => setNameToDelete(e.target.value)}
                    />
                    <button className="btn-danger" onClick={handleDeleteByName}>Delete by Name</button>
                </div>
            </section>

            <section>
                {/*Form section*/}
                {banks.map((bank) => (
                    BankForm(["Edit Bank"], handleSubmit, ["Save changes"], bank, bankName,
                        setBankName, bankAddress, setBankAddress, bankYear, setBankYear, bankEmp, setBankEmp,
                        bankBranches, setBankBranches, bankATMs, setBankATMs, errorMessage)
                ))}
            </section>
        </div>
    );
}

export default ManageBankByName;