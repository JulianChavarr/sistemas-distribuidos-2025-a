import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        loadUsuarios();
    }, []);

    const loadUsuarios = async () => {
        try {
            const result = await axios.get("http://54.165.104.165:8080/api/usuario");
            console.log("API Response:", result.data); // Debugging: Log the API response
            if (Array.isArray(result.data.data)) {
                setUsuarios(result.data.data); // Access the nested array
            } else {
                console.error("API did not return an array:", result.data);
                setUsuarios([]); // Fallback to an empty array
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setUsuarios([]); // Fallback to an empty array in case of error
        }
    };

    const deleteUsuarios = async (id) => {
        console.log("ID a eliminar:", id); // Verifica el ID
        try {
            await axios.delete(`http://54.165.104.165:8080/api/usuario/${id}`);
            loadUsuarios(); // Recarga la lista después de eliminar
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            alert("No se pudo eliminar el usuario. Inténtalo de nuevo.");
        }
    };

    return (
        <div className='container'>
            <div className='d-flex justify-content-end py-3'>
                <Link className="btn btn-primary me-2" to="/AddUsuario">
                    <i className="fas fa-user-plus"></i> Nuevo Usuario
                </Link>
            </div>
            <div className='py-0'>
                <table className="table table-hover border shadow">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Rol</th>
                            <th scope="col">Agendas</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario, index) => (
                            <tr key={usuario.id || index}>
                                <th scope="row">{index + 1}</th>
                                <td>{usuario.id}</td>
                                <td>{usuario.username}</td>
                                <td>{usuario.rol}</td>
                                <td style={{ width: '150px', textAlign: 'center' }}>
                                    <Link className="btn btn-outline-success btn-sm" to={`/HomeAgenda/${usuario.id}`}>
                                        <i className="fas fa-calendar-alt"></i> Ver Agendas
                                    </Link>
                                </td>
                                <td style={{ width: '300px', textAlign: 'center' }}>
                                    <Link className="btn btn-outline-primary btn-sm mx-1" to={`/ViewUsuario/${usuario.id}`}>
                                        <i className="fas fa-eye"></i> Ver
                                    </Link>
                                    <Link className="btn btn-outline-warning btn-sm mx-1" to={`/EditUsuario/${usuario.id}`}>
                                        <i className="fas fa-edit"></i> Editar
                                    </Link>
                                    <button
                                        className="btn btn-outline-danger btn-sm mx-1"
                                        onClick={() => deleteUsuarios(usuario.id)}
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
