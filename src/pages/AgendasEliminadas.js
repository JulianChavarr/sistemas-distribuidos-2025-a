import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function AgendasEliminadas() {
    const [agendas, setAgendas] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const loadAgendas = useCallback(async () => {
        try {
            const result = await axios.get("http://54.165.104.165:8080/api/agenda");
            if (Array.isArray(result.data.data)) {
                // Filtrar por usuario y solo agendas eliminadas
                const filteredAgendas = result.data.data.filter(agenda => 
                    agenda.usuarioId.id === parseInt(id, 10) && 
                    agenda.deletedAt != null && 
                    agenda.deletedBy != null
                );
                setAgendas(filteredAgendas);
            } else {
                setAgendas([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setAgendas([]);
        }
    }, [id]);

    useEffect(() => {
        loadAgendas();
    }, [loadAgendas]);

    return (
        <div className='container'>
            <div className='d-flex justify-content-end py-3'>
                <button
                    type='button'
                    className='btn btn-primary me-2'
                    onClick={() => navigate(-1)}
                >
                    <i className="fas fa-arrow-left"></i> Volver
                </button>
            </div>
            <div className='py-0'>
                <table className="table table-hover border shadow">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Periodo</th>
                            <th scope="col">Creación</th>
                            <th scope="col">Eliminación</th>
                            <th scope="col" style={{ width: '150px', textAlign: 'center' }}>Formulario</th>
                            <th scope="col" style={{ width: '200px', textAlign: 'center' }}>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agendas.map((agenda, index) => (
                            <tr key={agenda.id || index}>
                                <th scope="row">{index + 1}</th>
                                <td>{agenda.id}</td>
                                <td>{agenda.name}</td>
                                <td>{agenda.periodo}</td>
                                <td>{agenda.fechaInicio}</td>
                                <td>{agenda.deletedAt}</td>
                                <td style={{ width: '200px', textAlign: 'center' }}>
                                    <Link className="btn btn-outline-success btn-sm" to={`/FormulariosEliminados/${agenda.id}`}>
                                        <i className="fas fa-edit"></i> Ver Formulario
                                    </Link>
                                </td>
                                <td style={{ width: '300px', textAlign: 'center' }}>
                                    <Link className="btn btn-outline-primary btn-sm mx-1" to={`/ViewAgendasEliminadas/${agenda.id}`}>
                                        <i className="fas fa-eye"></i> Ver
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}