import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Link, Route } from "react-router-dom";
import Home from './pages/home.js';

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path='/gramworkx' element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
