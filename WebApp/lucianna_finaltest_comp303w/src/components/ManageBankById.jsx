import {useState} from 'react';
import {deleteBankById, getBankById, updateBankById} from '../services/bankService.js';
import '../css/App.css'
import BankForm from "./BankForm.jsx";

function ManageBankById() {
    const [bankId, setBankId] = useState('');
    const [idToDelete, setIdToDelete] = useState('');
    const [bankName, setBankName] = useState('');
    const [bankYear, setBankYear] = useState('');
    const [bankEmp, setBankEmp] = useState('');
    const [bankAddress, setBankAddress] = useState('');
    const [bankBranches, setBankBranches] = useState('');
    const [bankATMs, setBankATMs] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const clearValues = () =>{
        // Clear form on successful submission
        setBankId('')
        setBankName('');
        setBankYear('');
        setBankEmp('');
        setBankAddress('');
        setBankBranches('');
        setBankATMs('');
        setErrorMessage('');
    }

    const handleSearchById = () => {
        getBankById(bankId)
            .then((response) => {
                setBankId(response.data.bankId)
                setBankName(response.data.bankName);
                setBankYear(response.data.bankYear);
                setBankEmp(response.data.bankEmp);
                setBankAddress(response.data.bankAddress);
                setBankBranches(response.data.bankBranches);
                setBankATMs(response.data.bankATMs);
            })
            .catch((error) => {
                console.error('Error fetching bank by ID:', error);
                alert('Error fetching bank: ' + error.message);
            });
    };

    const handleDeleteById = () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the bank with ID ${idToDelete}?`);
        if (confirmDelete) {
            deleteBankById(idToDelete)
                .then(() => {
                    alert('Bank deleted successfully');
                    setIdToDelete('');
                    clearValues()
                })
                .catch((error) => {
                    console.error('Error deleting bank by ID:', error);
                    setErrorMessage('Error deleting bank: ' + error.message);
                });
        } else {
            console.log('Deletion canceled by the user.');
            setIdToDelete('');
            clearValues()
        }
    };

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
            .then(() => {
                alert('Bank updated successfully');
                clearValues()
            })
            .catch((error) => {
                setErrorMessage('Error updating bank: ' + error.message);
            });
    };

    return (
        <div>
            <h2>Edit Bank By Id</h2>
            <section>
                {/*Search by id*/}
                <div className="input-button-container">
                    <input
                        type="text"
                        placeholder="Search by Bank ID"
                        value={bankId}
                        onChange={(e) => setBankId(e.target.value)}
                    />
                    <button onClick={handleSearchById}>Search</button>
                </div>
            </section>

            <section>
                {/*Form */}
                <BankForm handleSubmit={handleSubmit}
                          btnDisplay="Save changes"
                          bankId={bankId}
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
            </section>
            <hr/>

            <section>
                {/*Delete by id*/}
                <h2>Delete By Id</h2>
                <div className="input-button-container">
                    <input
                        type="text"
                        placeholder="Delete by Bank ID"
                        value={idToDelete}
                        onChange={(e) => setIdToDelete(e.target.value)}
                    />
                    <button className="btn-danger" onClick={handleDeleteById}>Delete</button>
                </div>
            </section>
        </div>
    );
}

export default ManageBankById;
