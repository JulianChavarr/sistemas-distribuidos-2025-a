import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function Home() {
    const [usuarios, setUsuarios] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadUsuarios();
    }, []);

    const loadUsuarios = async () => {
        try {
            const result = await axios.get("http://localhost:8080/api/usuario");
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
            await axios.delete(`http://localhost:8080/api/usuario/${id}`);
            loadUsuarios(); // Recarga la lista después de eliminar
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            alert("No se pudo eliminar el usuario. Inténtalo de nuevo.");
        }
    };

    return (
        <div className='container'>
            <div className='d-flex justify-content-end py-3'>
                <Link className="btn btn-primary me-2" to="/">Usuarios</Link>
                <Link className="btn btn-success me-2" to="/HomeAgenda">Agendas</Link>
                <Link className="btn btn-danger" to="/HomeActividad">Actividades</Link>
            </div>
            <div className='py-0'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Contraseña</th>
                            <th scope="col">Rol</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario, index) => (
                            <tr key={usuario.id || index}>
                                <th scope="row">{index + 1}</th>
                                <td>{usuario.id}</td>
                                <td>{usuario.name}</td>
                                <td>{usuario.correo}</td>
                                <td>{usuario.password}</td>
                                <td>{usuario.rol}</td>
                                <td>
                                    <Link className="btn btn-outline-primary mx-2" to={`/ViewUsuario/${usuario.id}`}>Ver</Link>
                                    <Link className="btn btn-outline-warning mx-2" to={`/EditUsuario/${usuario.id}`}>Editar</Link>
                                    <button
                                        className="btn btn-outline-danger mx-2"
                                        onClick={() => deleteUsuarios(usuario.id)}
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
