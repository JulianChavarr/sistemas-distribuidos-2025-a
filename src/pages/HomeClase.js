import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function HomeClase() {
    const [clases, setClases] = useState([]);

    useEffect(() => {
        loadClases();
    }, []);

    const loadClases = async () => {
        try {
            const result = await axios.get("http://54.165.104.165:8080/api/clase");
            console.log("API Response:", result.data); // Debugging: Log the API response
            if (Array.isArray(result.data.data)) {
                setClases(result.data.data); // Access the nested array
            } else {
                console.error("API did not return an array:", result.data);
                setClases([]); // Fallback to an empty array
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setClases([]); // Fallback to an empty array in case of error
        }
    };

    const deleteClases = async (id) => {
        console.log("ID a eliminar:", id); // Verifica el ID
        try {
            await axios.delete(`http://54.165.104.165:8080/api/clase/${id}`);
            loadClases(); // Recarga la lista después de eliminar
        } catch (error) {
            console.error("Error al eliminar la clase:", error);
            alert("No se pudo eliminar la clase. Inténtalo de nuevo.");
        }
    };

    return (
        <div className='container'>
            <div className='d-flex justify-content-end py-3'>
                            <Link className="btn btn-primary me-2" to="/">Usuarios</Link>
                            <Link className="btn btn-success me-2" to="/HomeAgenda">Agendas</Link>
                            <Link className="btn btn-danger me-2" to="/HomeActividad">Actividades</Link>
                            <Link className="btn btn-warning" to="/HomeClase">Clases</Link>
                        </div>
            <div className='py-0'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID Actividad</th>
                            <th scope="col">Asignatura</th>
                            <th scope="col">Programa</th>
                            <th scope="col">Grupo</th>
                            <th scope="col">Sede</th>
                            <th scope="col">Horas Semanales</th>
                            <th scope="col">Horas Semestre</th>
                            <th scope="col">ID Agenda</th>
                            <th scope="col">Nombre</th>
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
                                <td>{clase.horasSemanales}</td>
                                <td>{clase.horasSemestre}</td>
                                <td>{clase.agendaId.id}</td>
                                <td>{clase.agendaId.name}</td>
                                <td>
                                    <Link className="btn btn-outline-primary mx-2" to={`/ViewClase/${clase.id}`}>Ver</Link>
                                    <Link className="btn btn-outline-warning mx-2" to={`/EditClase/${clase.id}`}>Editar</Link>
                                    <button
                                        className="btn btn-outline-danger mx-2"
                                        onClick={() => deleteClases(clase.id)}
                                    >
                                        Eliminar
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