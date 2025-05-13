import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function ViewAgenda() {
    const [agendas, setAgendas] = useState({
        status: true,
        codeAuth: true,
        usuarioId: {
            id: 0,
            status: true,
            codeAuth: true
        },
        name: "",
        facultad: "",
        programa: "",
        periodo: "",
        fechaInicio: "",
        fechaFin: ""
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadAgenda();
    }, []);

    const loadAgenda = async () => {
        const result = await axios.get(`http://54.165.104.165:8080/api/agenda/${id}`);
        setAgendas(result.data.data);
    };

    return (
        <div>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-8 border rounded p-4 mt-2 shadow' style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
                        <h2 className='text-center m-4' style={{ color: '#212529' }}>
                            <i className="fas fa-calendar-alt"></i> Detalles de la Agenda
                        </h2>
                        <div className='card'>
                            <div className='card-header text-white text-center' style={{ backgroundColor: '#212529' }}>
                                <strong><i className="fas fa-info-circle"></i> Detalles de la Agenda ID #{id}</strong>
                            </div>
                            <div className='card-body'>
                                <table className='table table-hover table-bordered'>
                                    <tbody>
                                        <tr>
                                            <th style={{ color: '#212529' }}><i className="fas fa-book"></i> Nombre</th>
                                            <td>{agendas.name}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ color: '#212529' }}><i className="fas fa-university"></i> Facultad</th>
                                            <td>{agendas.facultad}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ color: '#212529' }}><i className="fas fa-graduation-cap"></i> Programa</th>
                                            <td>{agendas.programa}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ color: '#212529' }}><i className="fas fa-calendar-alt"></i> Periodo</th>
                                            <td>{agendas.periodo}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ color: '#212529' }}><i className="fas fa-clock"></i> Creación</th>
                                            <td>{agendas.fechaInicio}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ color: '#212529' }}><i className="fas fa-calendar-check"></i> Finalización</th>
                                            <td>{agendas.fechaFin}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ color: '#212529' }}><i className="fas fa-user"></i> ID Usuario</th>
                                            <td>{agendas.usuarioId.id}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ color: '#212529' }}><i className="fas fa-user-circle"></i> Usuario</th>
                                            <td>{agendas.usuarioId.username}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ color: '#212529' }}><i className="fas fa-user-tag"></i> Rol</th>
                                            <td>{agendas.usuarioId.rol}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="text-center">
                            <Link className='btn btn-outline-warning my-2 mx-2' to={`/EditAgenda/${id}`}>
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
