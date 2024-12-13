import { useState } from 'react';
import {deleteBankByName, getBankByName, updateBankByName} from '../services/bankService.js';
import '../css/App.css'
import BankForm from "./BankForm.jsx";

function ManageBankByName() {
    const [currentBankName, setCurrentBankName] = useState('');
    const [nameToDelete, setNameToDelete] = useState('');
    const [bankNameSearch, setBankNameSearch] = useState('')
    const [newBankName, setNewBankName] = useState('')
    const [bankYear, setBankYear] = useState('');
    const [bankEmp, setBankEmp] = useState('');
    const [bankAddress, setBankAddress] = useState('');
    const [bankBranches, setBankBranches] = useState('');
    const [bankATMs, setBankATMs] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const clearFormValues = () =>{
        // Clear form on successful submission
        setNewBankName('')
        setBankYear('');
        setBankEmp('');
        setBankAddress('');
        setBankBranches('');
        setBankATMs('');
        setErrorMessage('');
    }

    const handleSearchByName = () => {
        getBankByName(bankNameSearch)
            .then((response) => {
                console.log(response.data)
                setCurrentBankName(response.data.bankName);
                setNewBankName(response.data.bankName)
                setBankYear(response.data.bankYear);
                setBankEmp(response.data.bankEmp);
                setBankAddress(response.data.bankAddress);
                setBankBranches(response.data.bankBranches);
                setBankATMs(response.data.bankATMs);
            })
            .catch((error) => {
                console.error('Error fetching bank by Name:', error);
                alert('Error fetching bank: ' + error.message);
            });
    };

    const handleDeleteByName = () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the bank ${nameToDelete}?`);
        if (confirmDelete) {
            deleteBankByName(nameToDelete)
                .then(() => {
                    alert('Bank deleted successfully');
                    setNameToDelete('');
                    clearFormValues()
                })
                .catch((error) => {
                    console.error('Error deleting bank by name:', error);
                    setErrorMessage('Error deleting bank: ' + error.message);
                });
        } else {
            console.log('Deletion canceled by the user.');
            setNameToDelete('');
            clearFormValues()
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('BANK NAME SEARCH: ' + bankNameSearch)
        console.log('BANK NAME TO BE CHANGED: ' + currentBankName)
        console.log('NEW BANK NAME: ' + newBankName)

        // Validate required fields before sending the request
        if (!currentBankName || !bankYear || !bankEmp || !bankAddress || !bankBranches || !bankATMs) {
            setErrorMessage('All fields are required');
            return;
        }

        // the updated bank object to be passed to the method
        const updatedBank = {
            bankName: newBankName,
            bankYear: parseInt(bankYear),
            bankEmp: parseInt(bankEmp),
            bankAddress: bankAddress,
            bankBranches: parseInt(bankBranches),
            bankATMs: parseInt(bankATMs),
        };

        updateBankByName(currentBankName, updatedBank)
            .then(() => {
                console.log('old bank name:' + currentBankName)
                console.log('updated bank name: ' + newBankName)
                alert('Bank updated successfully');
                clearFormValues()
            })
            .catch((error) => {
                setErrorMessage('Error updating bank: ' + error.message);
            });
    };

    return (
        <div>
            <h2>Edit Bank By Name</h2>
            <section>
                {/*Search by name*/}
                <div className="input-button-container">
                    <input
                        type="text"
                        placeholder="Search by Bank Name"
                        value={bankNameSearch}
                        onChange={(e) => setBankNameSearch(e.target.value)}
                    />
                    <button onClick={handleSearchByName}>Search</button>
                </div>
            </section>

            <section>
                {/*Form */}
                <BankForm handleSubmit={handleSubmit}
                          btnDisplay="Save changes"
                          bankId={null}
                          bankName={newBankName}
                          setBankName={setNewBankName}
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
            </section>
            <hr/>

            <section>
                {/*Delete by name*/}
                <h2>Delete By Name</h2>
                <div className="input-button-container">
                    <input
                        type="text"
                        placeholder="Delete by Bank Name"
                        value={nameToDelete}
                        onChange={(e) => setNameToDelete(e.target.value)}
                    />
                    <button className="btn-danger" onClick={handleDeleteByName}>Delete</button>
                </div>
            </section>
        </div>
    );
}

export default ManageBankByName;