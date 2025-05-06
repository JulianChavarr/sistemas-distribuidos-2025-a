import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function HomeActividad() {
    const [actividades, setActividades] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadActividades();
    }, []);

    const loadActividades = async () => {
        try {
            const result = await axios.get("http://54.165.104.165:8080/api/actividad");
            console.log("API Response:", result.data); // Debugging: Log the API response
            if (Array.isArray(result.data.data)) {
                setActividades(result.data.data); // Access the nested array
            } else {
                console.error("API did not return an array:", result.data);
                setActividades([]); // Fallback to an empty array
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setActividades([]); // Fallback to an empty array in case of error
        }
    };

    const deleteActividades = async (id) => {
        console.log("ID a eliminar:", id); // Verifica el ID
        try {
            await axios.delete(`http://54.165.104.165:8080/api/actividad/${id}`);
            loadActividades(); // Recarga la lista después de eliminar
        } catch (error) {
            console.error("Error al eliminar la actividad:", error);
            alert("No se pudo eliminar la actividad. Inténtalo de nuevo.");
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
                            <th scope="col">Categoria</th>
                            <th scope="col">Sub Categoria</th>
                            <th scope="col">Horas Semanales</th>
                            <th scope="col">Horas Semestre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Producto</th>
                            <th scope="col">ID Agenda</th>
                            <th scope="col">Nombre</th>
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
                                <td>{actividad.descripcion}</td>
                                <td>{actividad.producto}</td>
                                <td>{actividad.agendaId.id}</td>
                                <td>{actividad.agendaId.name}</td>
                                <td>
                                    <Link className="btn btn-outline-primary mx-2" to={`/ViewActividad/${actividad.id}`}>Ver</Link>
                                    <Link className="btn btn-outline-warning mx-2" to={`/EditActividad/${actividad.id}`}>Editar</Link>
                                    <button
                                        className="btn btn-outline-danger mx-2"
                                        onClick={() => deleteActividades(actividad.id)}
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