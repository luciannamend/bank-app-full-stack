import { Routes, Route, Link } from 'react-router-dom';
import './css/App.css'
import BankList from "./components/BankList.jsx";
import CreateBank from "./components/CreateBank.jsx";
import ManageBankById from "./components/ManageBankById.jsx";
import ManageBankByName from "./components/ManageBankByName.jsx";

function App() {

  return (
    <>
        <div>
            <nav>
                <Link to="/banks"> Bank List </Link> |
                <Link to="/"> Create </Link> |
                <Link to="/update-bank/id"> Manage By Id </Link> |
                <Link to="/update-bank/name"> Manage By Name</Link> |
                {/*<Link to="/login"> Login</Link>*/}
                {/*<Link to="/logout">Logout</Link>*/}
            </nav>
            <Routes>
                <Route path="/banks" element={<BankList/>}/>
                <Route path="/" element={<CreateBank/>}/>
                <Route path="/update-bank/id" element={<ManageBankById/>}/>
                <Route path="/update-bank/name" element={<ManageBankByName/>}/>
                {/*<Route path="/login" element={<Login/>}/>*/}
                {/*<Route path="/logout" element={<Logout/>}/>*/}
            </Routes>
        </div>

    </>
  )
}

export default App
