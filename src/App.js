import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUsuario from './Usuario/AddUsuario';
import EditUsuario from './Usuario/EditUsuario';

function App() {
  return <div className="App">
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/AddUsuario" element={<AddUsuario />} />
        <Route exact path="/EditUsuario/:id" element={<EditUsuario />} />
      </Routes>
    </Router>
  </div>;
}


export default App;
