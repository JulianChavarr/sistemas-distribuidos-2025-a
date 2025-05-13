import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function HomeFormulario() {
    const navigate = useNavigate();
    const { id } = useParams(); // Obtén el id del usuario y el id de la agenda desde la URL

    // Estados y funciones para HomeClase
    const [clases, setClases] = useState([]);
    const loadClases = async () => {
        try {
            const result = await axios.get("http://54.165.104.165:8080/api/clase");
            if (Array.isArray(result.data.data)) {
                // Filtrar clases por usuarioId y agendaId
                const filteredClases = result.data.data.filter(clase => clase.agendaId.id === parseInt(id, 10));
                setClases(filteredClases);
            } else {
                console.error("API did not return an array:", result.data);
                setClases([]); // Fallback to an empty array
            }
        } catch (error) {
            console.error("Error fetching classes:", error);
            setClases([]); // Fallback to an empty array in case of error
        }
    };
    const deleteClases = async (claseId) => {
        try {
            await axios.delete(`http://54.165.104.165:8080/api/clase/${claseId}`);
            loadClases();
        } catch (error) {
            console.error("Error al eliminar la clase:", error);
        }
    };

    // Estados y funciones para HomeActividad
    const [actividades, setActividades] = useState([]);
    const loadActividades = async () => {
        try {
            const result = await axios.get("http://54.165.104.165:8080/api/actividad");
            if (Array.isArray(result.data.data)) {
                // Filtrar actividades por usuarioId y agendaId
                const filteredActividades = result.data.data.filter(actividad => actividad.agendaId.id === parseInt(id, 10));
                setActividades(filteredActividades);
            } else {
                console.error("API did not return an array:", result.data);
                setActividades([]); // Fallback to an empty array
            }
        } catch (error) {
            console.error("Error fetching activities:", error);
            setActividades([]); // Fallback to an empty array in case of error
        }
    };
    const deleteActividades = async (actividadId) => {
        try {
            await axios.delete(`http://54.165.104.165:8080/api/actividad/${actividadId}`);
            loadActividades();
        } catch (error) {
            console.error("Error al eliminar la actividad:", error);
        }
    };

    useEffect(() => {
        loadClases();
        loadActividades();
    }, [id]); // Ejecuta las funciones cuando cambien el id del usuario o el id de la agenda

    return (
        <div className="container">
            {/* Tabla de Clases */}
            <div className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3 py-3">
                    <h2 className="mb-0" style={{ color: '#212529', fontWeight: 'bold' }}>
                        <i className="fas fa-chalkboard"></i> Clases
                    </h2>
                    <div>
                        {/* Botón Nueva Clase */}
                        <Link className="btn btn-success me-2" to={`/AddClase/${id}`}>
                            <i className="fas fa-chalkboard-teacher"></i> Nueva Clase
                        </Link>
                        {/* Botón Volver */}
                        <button
                            type='button'
                            className='btn btn-primary mx-2'
                            onClick={() => navigate(`/HomeAgenda/${actividades[0]?.agendaId?.usuarioId?.id || id}`)} // Redirige a HomeAgenda con el id del usuario
                        >
                            <i className="fas fa-arrow-circle-left"></i> Volver
                        </button>
                    </div>
                </div>
                <table className="table table-hover border shadow">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Asignatura</th>
                            <th scope="col">Programa</th>
                            <th scope="col">Grupo</th>
                            <th scope="col">Sede</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clases.map((clase, index) => (
                            <tr key={clase.id || index}>
                                <th scope="row">{index + 1}</th>
                                <td>{clase.id}</td>
                                <td>{clase.name}</td>
                                <td>{clase.programa}</td>
                                <td>{clase.grupo}</td>
                                <td>{clase.sede}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <Link className="btn btn-outline-primary btn-sm mx-1" to={`/ViewClase/${clase.id}`}>
                                        <i className="fas fa-eye"></i> Ver
                                    </Link>
                                    <Link className="btn btn-outline-warning btn-sm mx-1" to={`/EditClase/${clase.id}`}>
                                        <i className="fas fa-edit"></i> Editar
                                    </Link>
                                    <button
                                        className="btn btn-outline-danger btn-sm mx-1"
                                        onClick={() => deleteClases(clase.id)}
                                    >
                                        <i className="fas fa-trash-alt"></i> Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Tabla de Actividades */}
            <div>
                <div className="d-flex justify-content-between align-items-center mb-3 py-3">
                    <h2 className="mb-0" style={{ color: '#212529', fontWeight: 'bold' }}>
                        <i className="fas fa-tasks"></i> Actividades
                    </h2>
                    <div>
                        {/* Botón Nueva Actividad */}
                        <Link className="btn btn-info me-2" to={`/AddActividad/${id}`}>
                            <i className="fas fa-tasks"></i> Nueva Actividad
                        </Link>
                    </div>
                </div>
                <table className="table table-hover border shadow">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Subcategoría</th>
                            <th scope="col">Horas Semanales</th>
                            <th scope="col">Horas Semestre</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {actividades.map((actividad, index) => (
                            <tr key={actividad.id || index}>
                                <th scope="row">{index + 1}</th>
                                <td>{actividad.id}</td>
                                <td>{actividad.categoria}</td>
                                <td>{actividad.subCategoria}</td>
                                <td>{actividad.horasSemanales}</td>
                                <td>{actividad.horasSemestre}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <Link className="btn btn-outline-primary btn-sm mx-1" to={`/ViewActividad/${actividad.id}`}>
                                        <i className="fas fa-eye"></i> Ver
                                    </Link>
                                    <Link className="btn btn-outline-warning btn-sm mx-1" to={`/EditActividad/${actividad.id}`}>
                                        <i className="fas fa-edit"></i> Editar
                                    </Link>
                                    <button
                                        className="btn btn-outline-danger btn-sm mx-1"
                                        onClick={() => deleteActividades(actividad.id)}
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