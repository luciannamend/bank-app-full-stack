import { Routes, Route, Link } from 'react-router-dom';
import './css/App.css'
import DisplayBanks from "./DisplayBanks.jsx";
import CreateBank from "./CreateBank.jsx";
import UpdateBankById from "./UpdateBankById.jsx";

function App() {

  return (
    <>
        <div>
            <nav>
                <Link to="/banks"> Bank List </Link> |
                <Link to="/"> Create </Link> |
                <Link to="/update-bank/id"> Update By Id </Link> |
                {/*<Link to="/registration"> Registration</Link> |*/}
                {/*<Link to="/login"> Login</Link>*/}
                {/*<Link to="/logout">Logout</Link>*/}
            </nav>
            <Routes>
                <Route path="/banks" element={<DisplayBanks/>}/>
                <Route path="/" element={<CreateBank/>}/>
                <Route path="/update-bank/id" element={<UpdateBankById/>}/>
                {/*<Route path="/registration" element={<Registration/>}/>*/}
                {/*<Route path="/login" element={<Login/>}/>*/}
                {/*<Route path="/logout" element={<Logout/>}/>*/}
            </Routes>
        </div>

    </>
  )
}

export default App
