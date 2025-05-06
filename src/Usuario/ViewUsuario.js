import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function ViewUsuario() {

    const [usuarios, setUsuarios] = useState({
        status: true,
        codeAuth: true,
        username: "",
        name: "",
        correo: "",
        password: "",
        rol: ""
    });

    const {id}= useParams();

    useEffect(() => {
        loadUsuario();
    }, []);

    const loadUsuario = async () => {
        const result = await axios.get(`http://localhost:8080/api/usuario/${id}`);
        setUsuarios(result.data.data); 
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Detalles del Usuario</h2>
                    <div className='card'>
                        <div className='card-header'>
                            Detalles del Usuario ID #{id}:
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>Nombre de Usuario:</b>
                                    {usuarios.username}
                                </li>
                                <li className='list-group-item'>
                                    <b>Nombre:</b>
                                    {usuarios.name}
                                </li>
                                <li className='list-group-item'>
                                    <b>Correo:</b>
                                    {usuarios.correo}
                                </li>
                                <li className='list-group-item'>
                                    <b>Contraseña:</b>
                                    {usuarios.password}
                                </li>
                                <li className='list-group-item'>
                                    <b>Rol:</b>
                                    {usuarios.rol}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className='btn btn-primary my-2' to={"/"}>Regresar</Link>
                </div>
            </div>
        </div>
    );
}
