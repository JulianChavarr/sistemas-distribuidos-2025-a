import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ViewActividadesEliminadas() {
    const [actividades, setActividades] = useState({
        status: true,
        codeAuth: true,
        agendaId: {
            status: true,
            codeAuth: true,
            id: 0,
            name: ""
        },
        categoria: "",
        subCategoria: "",
        horasSemanales: 1,
        horasSemestre: 1,
        descripcion: "",
        producto: ""
    });

    const { id } = useParams();
    const navigate = useNavigate();

    const loadActividad = useCallback(async () => {
        try {
            const result = await axios.get(`http://54.165.104.165:8080/api/actividad/${id}`);
            setActividades(result.data.data);
        } catch (error) {
            console.error("Error al cargar los detalles de la actividad:", error);
        }
    }, [id]);

    useEffect(() => {
        loadActividad();
    }, [loadActividad]);

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-8 border rounded p-4 mt-2 shadow' style={{ backgroundColor: '#FFFFFF', color: '#000000', position: 'relative' }}>
                    <button
                        type='button'
                        className='btn btn-outline-primary position-absolute'
                        style={{ top: 20, right: 20, zIndex: 2 }}
                        onClick={() => navigate(-1)}
                    >
                        <i className="fas fa-arrow-left"></i> Volver
                    </button>
                    <h2 className='text-center m-4' style={{ color: '#212529' }}>
                        <i className="fas fa-tasks"></i> Detalles de la Actividad
                    </h2>
                    <div className='card'>
                        <div className='card-header text-white text-center' style={{ backgroundColor: '#212529' }}>
                            <strong><i className="fas fa-info-circle"></i> Detalles de la Actividad ID #{id}</strong>
                        </div>
                        <div className='card-body'>
                            <table className='table table-hover table-bordered'>
                                <tbody>
                                    <tr>
                                        <th style={{ color: '#212529' }}><i className="fas fa-tag"></i> Categoría</th>
                                        <td>{actividades.categoria}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ color: '#212529' }}><i className="fas fa-tags"></i> Subcategoría</th>
                                        <td>{actividades.subCategoria}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ color: '#212529' }}><i className="fas fa-clock"></i> Horas Semanales</th>
                                        <td>{actividades.horasSemanales}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ color: '#212529' }}><i className="fas fa-calendar-alt"></i> Horas Semestre</th>
                                        <td>{actividades.horasSemestre}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ color: '#212529' }}><i className="fas fa-align-left"></i> Descripción</th>
                                        <td>{actividades.descripcion}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ color: '#212529' }}><i className="fas fa-box"></i> Producto</th>
                                        <td>{actividades.producto}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ color: '#212529' }}><i className="fas fa-calendar-alt"></i> ID Agenda</th>
                                        <td>{actividades.agendaId.id}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ color: '#212529' }}><i className="fas fa-folder-open"></i> Agenda</th>
                                        <td>{actividades.agendaId.name}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}