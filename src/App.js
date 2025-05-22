import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import AddUsuario from './Usuario/AddUsuario';
import EditUsuario from './Usuario/EditUsuario';
import ViewUsuario from './Usuario/ViewUsuario';
import HomeAgenda from './pages/HomeAgenda';
import AddAgenda from './Agenda/AddAgenda';
import EditAgenda from './Agenda/EditAgenda';
import ViewAgenda from './Agenda/ViewAgenda';
import AgendasEliminadas from './pages/AgendasEliminadas';
import ViewAgendasEliminadas from './Agenda/ViewAgendasEliminadas';
import HomeFormulario from './pages/HomeFormulario';
import AddClase from './Clase/AddClase';
import EditClase from './Clase/EditClase';
import ViewClase from './Clase/ViewClase';
import AddActividad from './Actividad/AddActividad';
import EditActividad from './Actividad/EditActividad';
import ViewActividad from './Actividad/ViewActividad';
import FormulariosEliminados from './pages/FormulariosEliminados';
import ViewClasesEliminadas from './Clase/ViewClasesEliminadas';
import ViewActividadesEliminadas from './Actividad/ViewActividadadesEliminadas';

function App() {
  return <div className="App">
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/AddUsuario" element={<AddUsuario />} />
        <Route exact path="/EditUsuario/:id" element={<EditUsuario />} />
        <Route exact path="/ViewUsuario/:id" element={<ViewUsuario />} />
        <Route exact path="/HomeAgenda/:id" element={<HomeAgenda />} />
        <Route exact path="/AddAgenda/:id" element={<AddAgenda />} />
        <Route exact path="/EditAgenda/:id" element={<EditAgenda />} />
        <Route exact path="/ViewAgenda/:id" element={<ViewAgenda />} />
        <Route exact path="/AgendasEliminadas/:id" element={<AgendasEliminadas />} />
        <Route exact path="/ViewAgendasEliminadas/:id" element={<ViewAgendasEliminadas />} />
        <Route exact path="/HomeFormulario/:id" element={<HomeFormulario />} />
        <Route exact path="/AddClase/:id" element={<AddClase />} />
        <Route exact path="/EditClase/:id" element={<EditClase />} />
        <Route exact path="/ViewClase/:id" element={<ViewClase />} />
        <Route exact path="/AddActividad/:id" element={<AddActividad />} />
        <Route exact path="/EditActividad/:id" element={<EditActividad />} />
        <Route exact path="/ViewActividad/:id" element={<ViewActividad />} />
        <Route exact path="/FormulariosEliminados/:id" element={<FormulariosEliminados />} />
        <Route exact path="/ViewClasesEliminadas/:id" element={<ViewClasesEliminadas />} />
        <Route exact path="/ViewActividadesEliminadas/:id" element={<ViewActividadesEliminadas />} />
      </Routes>
    </Router>
  </div>;
}


export default App;
