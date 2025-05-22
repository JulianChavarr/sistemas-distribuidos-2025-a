import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoCorhuila from '../images/LogoCorhuila.png';

export default function Navbar() {
    const [isLogged, setIsLogged] = useState(false);
    const [userId, setUserId] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setIsLogged(location.pathname !== '/Login' && location.pathname !== '/');
        const storedId = sessionStorage.getItem('userId');
        setUserId(storedId);
    }, [location]);

    const handleLogout = () => {
        sessionStorage.removeItem('userId');
        navigate('/Login');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg shadow" style={{ backgroundColor: '#25CA9F', borderBottom: '4px solid #1E7F6E' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand d-flex align-items-center" to="/" style={{ fontSize: '2rem', color: '#000000', fontWeight: 'bold' }}>
                        <img src={LogoCorhuila} alt="Logo" style={{ height: '60px', marginRight: '15px' }} />
                        Corporación Universitaria del Huila
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="d-flex ms-auto">
                        {!isLogged && (
                            <Link className="btn btn-dark me-2 fw-bold" to="/AddUsuario" style={{ borderRadius: '20px' }}>
                                <i className="fas fa-users"></i> Registrar
                            </Link>
                        )}
                        {isLogged && userId && (
                            <>
                                <Link className="btn btn-dark fw-bold me-2" to={`/ViewUsuario/${userId}`} style={{ borderRadius: '20px' }}>
                                    <i className="fas fa-user"></i> Mi Perfil
                                </Link>
                                <button className="btn btn-danger fw-bold" style={{ borderRadius: '20px' }} onClick={handleLogout}>
                                    <i className="fas fa-sign-out-alt"></i> Cerrar sesión
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
