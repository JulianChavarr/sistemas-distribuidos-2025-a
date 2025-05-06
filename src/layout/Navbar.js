import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#25CA9F' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">FullStack AgendaDB Application</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="d-flex ms-auto">
                        <Link className="btn btn-outline-dark me-2" to="/AddUsuario">Registrar Usuario</Link>
                        <Link className="btn btn-outline-dark me-2" to="/AddAgenda">Registrar Agenda</Link>
                        <Link className="btn btn-outline-dark me-2" to="/AddActividad">Registrar Actividad</Link>
                        <Link className="btn btn-outline-dark" to="/AddClase">Registrar Clase</Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}
