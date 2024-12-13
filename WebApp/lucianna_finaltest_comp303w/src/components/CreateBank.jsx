import { useState } from 'react';
import { createBank } from '../services/bankService.js';
import '../css/App.css'
import BankForm from "./BankForm.jsx";

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

        // CreateBank the bank object
        const newBank = {
            bankName,
            bankYear: parseInt(bankYear),
            bankEmp: parseInt(bankEmp),
            bankAddress,
            bankBranches: parseInt(bankBranches),
            bankATMs: parseInt(bankATMs),
        };

        createBank(newBank)
            .then(() => {
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
            <BankForm handleSubmit={handleSubmit}
                      btnDisplay="Create Bank"
                      bank={null}
                      bankId={null}
                      bankName={bankName}
                      setBankName={setBankName}
                      bankAddress={bankAddress}
                      setBankAddress={setBankAddress}
                      bankYear={bankYear}
                      setBankYear={setBankYear}
                      bankEmp={bankEmp}
                      setBankEmp={setBankEmp}
                      bankBranches={bankBranches}
                      setBankBranches={setBankBranches}
                      bankATMs={bankATMs}
                      setBankATMs={setBankATMs}
                      errorMessage={errorMessage}/>
        </div>
    );
}

export default CreateBank;
