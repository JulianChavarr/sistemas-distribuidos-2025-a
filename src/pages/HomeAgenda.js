import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function HomeAgenda() {
    const [agendas, setAgendas] = useState([]);
    const { id } = useParams(); // Obtiene el id del usuario desde la URL

    const loadAgendas = useCallback(async () => {
        try {
            const result = await axios.get("http://54.165.104.165:8080/api/agenda");
            if (Array.isArray(result.data.data)) {
                // Filtrar agendas por usuarioId
                const filteredAgendas = result.data.data.filter(agenda => agenda.usuarioId.id === parseInt(id, 10));
                setAgendas(filteredAgendas);
            } else {
                console.error("API did not return an array:", result.data);
                setAgendas([]); // Fallback to an empty array
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setAgendas([]); // Fallback to an empty array in case of error
        }
    }, [id]);

    useEffect(() => {
        loadAgendas();
    }, [loadAgendas]);
    //
    const deleteAgendas = async (id) => {
        console.log("ID a eliminar:", id); // Verifica el ID
        try {
            await axios.delete(`http://54.165.104.165:8080/api/agenda/${id}`);
            loadAgendas(); // Recarga la lista después de eliminar
        } catch (error) {
            console.error("Error al eliminar la agenda:", error);
            alert("No se pudo eliminar la agenda. Inténtalo de nuevo.");
        }
    };

    return (
        <div className='container'>
            <div className='d-flex justify-content-end py-3'>
                <Link className="btn btn-success me-2" to={`/AddAgenda/${id}`}>
                    <i className="fas fa-calendar-plus"></i> Nueva Agenda
                </Link>
                <Link className="btn btn-primary me-2" to={`/`}>
                    <i className="fas fa-arrow-circle-left"></i> Volver
                </Link>
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
                            <th scope="col">Finalización</th>
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
                                <td>{agenda.fechaFin}</td>
                                <td style={{ width: '200px', textAlign: 'center' }}>
                                    <Link className="btn btn-outline-success btn-sm" to={`/HomeFormulario/${agenda.id}`}>
                                        <i className="fas fa-edit"></i> Editar Formulario
                                    </Link>
                                </td>
                                <td style={{ width: '300px', textAlign: 'center' }}>
                                    <Link className="btn btn-outline-primary btn-sm mx-1" to={`/ViewAgenda/${agenda.id}`}>
                                        <i className="fas fa-eye"></i> Ver
                                    </Link>
                                    <Link className="btn btn-outline-warning btn-sm mx-1" to={`/EditAgenda/${agenda.id}`}>
                                        <i className="fas fa-edit"></i> Editar
                                    </Link>
                                    <button
                                        className="btn btn-outline-danger btn-sm mx-1"
                                        onClick={() => deleteAgendas(agenda.id)}
                                    >
                                        <i className="fas fa-trash-alt"></i> Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}