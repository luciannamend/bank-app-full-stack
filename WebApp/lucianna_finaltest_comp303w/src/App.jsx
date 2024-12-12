import { Routes, Route, Link } from 'react-router-dom';
import './css/App.css'
import Display from "./Display.jsx";
import Create from "./Create.jsx";
import ManageById from "./ManageById.jsx";
import ManageByName from "./ManageByName.jsx";

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
                <Route path="/banks" element={<Display/>}/>
                <Route path="/" element={<Create/>}/>
                <Route path="/update-bank/id" element={<ManageById/>}/>
                <Route path="/update-bank/name" element={<ManageByName/>}/>
                {/*<Route path="/login" element={<Login/>}/>*/}
                {/*<Route path="/logout" element={<Logout/>}/>*/}
            </Routes>
        </div>

    </>
  )
}

export default App
