import React, { useState } from 'react';
import {deleteBankById, getBankById, updateBankById} from '../services/bankService.js';
import '../css/App.css'
import BankForm from "./BankForm.jsx";

function ManageBankById() {
    const [banks, setBanks] = useState([]);
    const [bankId, setBankId] = useState('');
    const [idToDelete, setIdToDelete] = useState('');
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
                alert('Error fetching bank: ' + error.message);
            });
    };

    const handleDeleteById = () => {
        deleteBankById(idToDelete)
            .then((response) => {
                setBanks([response.data]);
                alert('Bank deleted successfully');
                setIdToDelete('')
            })
            .catch((error) => {
                console.error('Error deleting bank by ID:', error);
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

        updateBankById(bankId, updatedBank)
            .then((response) => {
                alert('Bank updated successfully');
                // Clear form on successful submission
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
            <h2>Manage Bank by ID</h2>

            <section>
                {/*Search by id*/}
                <div>
                    <input
                        type="text"
                        placeholder="Search by Bank ID"
                        value={bankId}
                        onChange={(e) => setBankId(e.target.value)}
                    />
                    <button onClick={handleSearchById}>Search by ID</button>
                </div>
            </section>

            <section>
                {/*Delete by id*/}
                <div>
                    <input
                        type="text"
                        placeholder="Delete by Bank ID"
                        value={idToDelete}
                        onChange={(e) => setIdToDelete(e.target.value)}
                    />
                    <button className="btn-danger" onClick={handleDeleteById}>Delete by ID</button>
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

export default ManageBankById;
