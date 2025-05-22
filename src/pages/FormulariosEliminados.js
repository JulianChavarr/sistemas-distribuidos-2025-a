import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function FormulariosEliminados() {

    const navigate = useNavigate();
    const { id } = useParams();

    // Estados y funciones para Clases
    const [clases, setClases] = useState([]);
    const loadClases = useCallback(async () => {
        try {
            const result = await axios.get("http://54.165.104.165:8080/api/clase");
            if (Array.isArray(result.data.data)) {
                // Filtrar clases por agendaId y que estén eliminadas
                const filteredClases = result.data.data.filter(clase => 
                    clase.agendaId.id === parseInt(id, 10) && 
                    clase.deletedAt !== null && clase.deletedBy !== null
                );
                setClases(filteredClases);
            } else {
                console.error("API did not return an array:", result.data);
                setClases([]);
            }
        } catch (error) {
            console.error("Error fetching classes:", error);
            setClases([]);
        }
    }, [id]);

    // Estados y funciones para HomeActividad
    const [actividades, setActividades] = useState([]);
    const loadActividades = useCallback(async () => {
        try {
            const result = await axios.get("http://54.165.104.165:8080/api/actividad");
            if (Array.isArray(result.data.data)) {
                // Filtrar actividades por agendaId y que estén eliminadas
                const filteredActividades = result.data.data.filter(actividad => 
                    actividad.agendaId.id === parseInt(id, 10) && 
                    actividad.deletedAt !== null && actividad.deletedBy !== null
                );
                setActividades(filteredActividades);
            } else {
                console.error("API did not return an array:", result.data);
                setActividades([]);
            }
        } catch (error) {
            console.error("Error fetching activities:", error);
            setActividades([]);
        }
    }, [id]);

    useEffect(() => {
        loadClases();
        loadActividades();
    }, [id, loadClases, loadActividades]);

    return (
        <div className="container">
            <div className="d-flex justify-content-end mt-4 mb-2">
            </div>
            {/* Tabla de Clases */}
            <div className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3 py-3">
                    <h2 className="mb-0" style={{ color: '#212529', fontWeight: 'bold' }}>
                        <i className="fas fa-chalkboard"></i> Clases
                    </h2>
                    <div>
                        {/* Botón Volver */}
                        <button
                            type='button'
                            className='btn btn-primary mx-2'
                            onClick={() => navigate(-1)}
                        >
                            <i className="fas fa-arrow-left"></i> Volver
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
                            <th scope="col">Eliminación</th>
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
                                <td>{clase.deletedAt}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <Link className="btn btn-outline-primary btn-sm mx-1" to={`/ViewClasesEliminadas/${clase.id}`}>
                                        <i className="fas fa-eye"></i> Ver
                                    </Link>
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
                            <th scope="col">Eliminación</th>
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
                                <td>{actividad.deletedAt}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <Link className="btn btn-outline-primary btn-sm mx-1" to={`/ViewActividadesEliminadas/${actividad.id}`}>
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