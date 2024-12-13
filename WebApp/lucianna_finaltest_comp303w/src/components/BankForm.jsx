import "react";

export default function BankForm(formName, handleSubmit, btnDisplay, bank, bankId, bankName, setBankName,
                                 bankAddress, setBankAddress, bankYear, setBankYear, bankEmp,
                                 setBankEmp, bankBranches, setBankBranches, bankATMs, setBankATMs,
                                 errorMessage) {
    return (
        <>
            <h2>{formName}</h2>
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

                <button type="submit">{btnDisplay}</button>
            </form>
        </>
    )
}