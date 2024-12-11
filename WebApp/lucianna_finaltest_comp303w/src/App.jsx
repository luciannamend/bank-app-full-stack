import { Routes, Route, Link } from 'react-router-dom';
import './css/App.css'
import DisplayBanks from "./DisplayBanks.jsx";
import CreateBank from "./CreateBank.jsx";

function App() {

  return (
    <>
        <div>
            <nav>
                <Link to="/banks">Display Banks</Link> |
                <Link to="/"> Create Bank</Link> |
                {/*<Link to="/history"> History</Link> |*/}
                {/*<Link to="/registration"> Registration</Link> |*/}
                {/*<Link to="/login"> Login</Link>*/}
                {/*<Link to="/logout">Logout</Link>*/}
            </nav>
            <Routes>
                <Route path="/banks" element={<DisplayBanks/>}/>
                <Route path="/" element={<CreateBank/>}/>
                {/*<Route path="/history" element={<DonorHistory/>}/>*/}
                {/*<Route path="/registration" element={<Registration/>}/>*/}
                {/*<Route path="/login" element={<Login/>}/>*/}
                {/*<Route path="/logout" element={<Logout/>}/>*/}
            </Routes>
        </div>

    </>
  )
}

export default App
