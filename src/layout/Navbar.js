import React from 'react'
import { Link } from 'react-router-dom'
import LogoCorhuila from '../images/LogoCorhuila.png';

export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg shadow" style={{ backgroundColor: '#25CA9F', borderBottom: '4px solid #1E7F6E' }}> {/* Fondo verde con sombra */}
                <div className="container-fluid">
                    <Link className="navbar-brand d-flex align-items-center" to="/" style={{ fontSize: '2rem', color: '#000000', fontWeight: 'bold' }}> {/* Texto negro y bold */}
                        <img src={LogoCorhuila} alt="Logo" style={{ height: '60px', marginRight: '15px' }} /> {/* Logo más grande */}
                        Corporación Universitaria del Huila
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="d-flex ms-auto">
                        <Link className="btn btn-dark me-2 fw-bold" to="/" style={{ borderRadius: '20px' }}>
                            <i className="fas fa-users"></i> Usuarios
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}
