import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Link, Route } from "react-router-dom";
import Home from './pages/home.js';
import Create from './pages/create.js'

function App() {
  return (
    <div>
      <div>
        here
        {/* <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
        </Routes> */}
      </div>
    </div>
  );
}

export default App;
