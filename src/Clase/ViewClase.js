import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function ViewClase() {
    const [clases, setClases] = useState({
        status: true,
        codeAuth: true,
        agendaId: {
            status: true,
            codeAuth: true,
            id: 0,
            name: ""
        },
        name: "",
        programa: "",
        grupo: 1,
        sede: "",
        horasSemanales: 1,
        horasSemestre: 1
    });

    const { id } = useParams();
    const navigate = useNavigate();

    const loadClase = useCallback(async () => {
        try {
            const result = await axios.get(`http://54.165.104.165:8080/api/clase/${id}`);
            setClases(result.data.data);
        } catch (error) {
            console.error("Error al cargar los detalles de la clase:", error);
        }
    }, [id]);

    useEffect(() => {
        loadClase();
    }, [loadClase]);

    return (
        <div>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-8 border rounded p-4 mt-2 shadow' style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
                        <h2 className='text-center m-4' style={{ color: '#212529' }}>
                            <i className="fas fa-chalkboard"></i> Detalles de la Clase
                        </h2>
                        <div className='card'>
                            <div className='card-header text-white text-center' style={{ backgroundColor: '#212529' }}>
                                <strong><i className="fas fa-info-circle"></i> Detalles de la Clase ID #{id}</strong>
                            </div>
                            <div className='card-body'>
                                <table className='table table-hover table-bordered'>
                                    <tbody>
                                        <tr>
                                            <th style={{ color: '#212529' }}><i className="fas fa-book"></i> Asignatura</th>
                                            <td>{clases.name}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ color: '#212529' }}><i className="fas fa-graduation-cap"></i> Programa</th>
                                            <td>{clases.programa}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ color: '#212529' }}><i className="fas fa-users"></i> Grupo</th>
                                            <td>{clases.grupo}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ color: '#212529' }}><i className="fas fa-map-marker-alt"></i> Sede</th>
                                            <td>{clases.sede}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ color: '#212529' }}><i className="fas fa-clock"></i> Horas Semanales</th>
                                            <td>{clases.horasSemanales}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ color: '#212529' }}><i className="fas fa-calendar-alt"></i> Horas Semestre</th>
                                            <td>{clases.horasSemestre}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ color: '#212529' }}><i className="fas fa-calendar-alt"></i> ID Agenda</th>
                                            <td>{clases.agendaId.id}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ color: '#212529' }}><i className="fas fa-folder-open"></i> Agenda</th>
                                            <td>{clases.agendaId.name}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="text-center mt-4">
                            <Link className='btn btn-outline-warning my-2 mx-2' to={`/EditClase/${id}`}>
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