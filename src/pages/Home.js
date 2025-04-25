import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [usuarios, setUsuarios] = useState([]);

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

    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
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
                                <td>{usuario.name}</td>
                                <td>{usuario.correo}</td>
                                <td>{usuario.password}</td>
                                <td>{usuario.rol}</td>
                                <td>
                                    <button className="btn btn-outline-primary mx-2">Ver</button>
                                    <button className="btn btn-outline-warning mx-2">Editar</button>
                                    <button className="btn btn-outline-danger mx-2">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
