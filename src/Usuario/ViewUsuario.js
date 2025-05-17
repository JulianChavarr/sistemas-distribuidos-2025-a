import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function ViewUsuario() {
    const [usuarios, setUsuarios] = useState({
        status: true,
        codeAuth: true,
        username: "",
        name: "",
        correo: "",
        password: "",
        rol: "PROFESOR"
    });

    const { id } = useParams();
    const navigate = useNavigate();

    const loadUsuario = useCallback(async () => {
        const result = await axios.get(`http://54.165.104.165:8080/api/usuario/${id}`);
        setUsuarios(result.data.data);
    }, [id]);

    useEffect(() => {
        loadUsuario();
    }, [loadUsuario]);

    return (
        <div>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-8 border rounded p-4 mt-2 shadow' style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
                        <h2 className='text-center m-4' style={{ color: '#212529' }}>
                            <i className="fas fa-user"></i> Detalles del Usuario
                        </h2>
                        <div className='card'>
                            <div className='card-header text-white text-center' style={{ backgroundColor: '#212529' }}>
                                <strong><i className="fas fa-info-circle"></i> Detalles del Usuario ID #{id}</strong>
                            </div>
                            <div className='card-body'>
                                <table className='table table-hover table-bordered'>
                                    <tbody>
                                        <tr>
                                            <th style={{ color: '#212529' }}>
                                                <i className="fas fa-user-circle"></i> Usuario
                                            </th>
                                            <td>{usuarios.username}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ color: '#212529' }}>
                                                <i className="fas fa-id-card"></i> Nombre
                                            </th>
                                            <td>{usuarios.name}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ color: '#212529' }}>
                                                <i className="fas fa-envelope"></i> Correo
                                            </th>
                                            <td>{usuarios.correo}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ color: '#212529' }}>
                                                <i className="fas fa-key"></i> Contraseña
                                            </th>
                                            <td>{usuarios.password}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ color: '#212529' }}>
                                                <i className="fas fa-user-tag"></i> Rol
                                            </th>
                                            <td>{usuarios.rol}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="text-center">
                            <Link className='btn btn-outline-warning my-2 mx-2' to={`/EditUsuario/${id}`}>
                                <i className="fas fa-edit"></i> Editar
                            </Link>
                            <button
                                type='button'
                                className='btn btn-outline-primary mx-2'
                                onClick={() => navigate(-1)}
                            >
                                <i className="fas fa-arrow-left"></i> Regresar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
