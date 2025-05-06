import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function HomeAgenda() {
    const [agendas, setAgendas] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadAgendas();
    }, []);

    const loadAgendas = async () => {
        try {
            const result = await axios.get("http://localhost:8080/api/agenda");
            console.log("API Response:", result.data); // Debugging: Log the API response
            if (Array.isArray(result.data.data)) {
                setAgendas(result.data.data); // Access the nested array
            } else {
                console.error("API did not return an array:", result.data);
                setAgendas([]); // Fallback to an empty array
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setAgendas([]); // Fallback to an empty array in case of error
        }
    };

    const deleteAgendas = async (id) => {
        console.log("ID a eliminar:", id); // Verifica el ID
        try {
            await axios.delete(`http://localhost:8080/api/agenda/${id}`);
            loadAgendas(); // Recarga la lista después de eliminar
        } catch (error) {
            console.error("Error al eliminar la agenda:", error);
            alert("No se pudo eliminar la agenda. Inténtalo de nuevo.");
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
                            <th scope="col">ID Agenda</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Facultad</th>
                            <th scope="col">Programa</th>
                            <th scope="col">Periodo</th>
                            <th scope="col">Creación</th>
                            <th scope="col">Finalización</th>
                            <th scope="col">ID Usuario</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Rol</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agendas.map((agenda, index) => (
                            <tr key={agenda.id || index}>
                                <th scope="row">{index + 1}</th>
                                <td>{agenda.id}</td>
                                <td>{agenda.name}</td>
                                <td>{agenda.facultad}</td>
                                <td>{agenda.programa}</td>
                                <td>{agenda.periodo}</td>
                                <td>{agenda.fechaInicio}</td>
                                <td>{agenda.fechaFin}</td>
                                <td>{agenda.usuarioId.id}</td>
                                <td>{agenda.usuarioId.username}</td>
                                <td>{agenda.usuarioId.rol}</td>
                                <td>
                                    <Link className="btn btn-outline-primary mx-2" to={`/ViewAgenda/${agenda.id}`}>Ver</Link>
                                    <Link className="btn btn-outline-warning mx-2" to={`/EditAgenda/${agenda.id}`}>Editar</Link>
                                    <button
                                        className="btn btn-outline-danger mx-2"
                                        onClick={() => deleteAgendas(agenda.id)}
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