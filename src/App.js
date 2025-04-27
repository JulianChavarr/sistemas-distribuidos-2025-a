import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUsuario from './Usuario/AddUsuario';
import EditUsuario from './Usuario/EditUsuario';
import ViewUsuario from './Usuario/ViewUsuario';
import AddAgenda from './Agenda/AddAgenda.js';
import EditAgenda from './Agenda/EditAgenda.js';
import HomeAgenda from './pages/HomeAgenda.js';
import ViewAgenda from './Agenda/ViewAgenda.js';

function App() {
  return <div className="App">
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/AddUsuario" element={<AddUsuario />} />
        <Route exact path="/EditUsuario/:id" element={<EditUsuario />} />
        <Route exact path="/ViewUsuario/:id" element={<ViewUsuario />} />
        <Route exact path="/HomeAgenda" element={<HomeAgenda />} />
        <Route exact path="/AddAgenda" element={<AddAgenda />} />
        <Route exact path="/EditAgenda/:id" element={<EditAgenda />} />
        <Route exact path="/ViewAgenda/:id" element={<ViewAgenda />} />
      </Routes>
    </Router>
  </div>;
}


export default App;
