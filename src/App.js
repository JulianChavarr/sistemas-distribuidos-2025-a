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
import HomeActividad from './pages/HomeActividad.js';
import AddActividad from './Actividad/AddActividad.js';
import EditActividad from './Actividad/EditActividad.js';
import ViewActividad from './Actividad/ViewActividad.js';
import HomeClase from './pages/HomeClase.js';
import AddClase from './Clase/AddClase.js';
import EditClase from './Clase/EditClase.js';
import ViewClase from './Clase/ViewClase.js';

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
        <Route exact path="/HomeActividad" element={<HomeActividad />} />
        <Route exact path="/AddActividad" element={<AddActividad />} />
        <Route exact path="/EditActividad/:id" element={<EditActividad />} />
        <Route exact path="/ViewActividad/:id" element={<ViewActividad />} />
        <Route exact path="/HomeClase" element={<HomeClase />} />
        <Route exact path="/AddClase" element={<AddClase />} />
        <Route exact path="/EditClase/:id" element={<EditClase />} />
        <Route exact path="/ViewClase/:id" element={<ViewClase />} />
      </Routes>
    </Router>
  </div>;
}


export default App;
