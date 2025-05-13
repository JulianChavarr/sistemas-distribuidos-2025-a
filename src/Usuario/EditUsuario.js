import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function EditUsuario() {

    let navigate = useNavigate();

    const {id} = useParams();

    const [usuarios, setUsuarios] = useState({
        status: true,
        codeAuth: true,
        username: "",
        name: "",
        correo: "",
        password: "",
        rol: ""
    });

    const { username, name, correo, password, rol } = usuarios;

    const onInputChange = (e) => {
        setUsuarios({ ...usuarios, [e.target.name]: e.target.value });
    }

    useEffect(() => {
    
        loadUsuario();

    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos enviados:", usuarios); // Verifica los datos
        try {
            await axios.put(`http://54.165.104.165:8080/api/usuario/${id}`, usuarios);
            navigate("/");
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
        }
    }

    const loadUsuario = async () => {
        console.log("ID enviado:", id); // Verifica el ID
        try {
            const result = await axios.get(`http://54.165.104.165:8080/api/usuario/${id}`);
            setUsuarios(result.data.data); // Asegúrate de que el servidor devuelva los datos correctamente
        } catch (error) {
            console.error("Error al cargar el usuario:", error);
        }
    }

    return (
        <div>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-8 border rounded p-4 mt-2 shadow' style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
                        <h2 className='text-center m-4' style={{ color: '#212529' }}>
                            <i className="fas fa-user-edit"></i> Editar Usuario
                        </h2>
                        <div className='card'>
                            <div className='card-header text-white text-center' style={{ backgroundColor: '#212529' }}>
                                <strong><i className="fas fa-edit"></i> Editar Usuario ID #{id}</strong>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={(e) => onSubmit(e)}>
                                    <div className='mb-3'>
                                        <label htmlFor='Username' className='form-label' style={{ color: '#212529' }}>
                                            <i className="fas fa-user-circle"></i> Nombre de Usuario
                                        </label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Ingrese su nombre de usuario'
                                            name='username'
                                            value={username}
                                            onChange={(e) => onInputChange(e)}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor='Name' className='form-label' style={{ color: '#212529' }}>
                                            <i className="fas fa-id-card"></i> Nombre
                                        </label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Ingrese su nombre'
                                            name='name'
                                            value={name}
                                            onChange={(e) => onInputChange(e)}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor='Correo' className='form-label' style={{ color: '#212529' }}>
                                            <i className="fas fa-envelope"></i> Correo
                                        </label>
                                        <input
                                            type='email'
                                            className='form-control'
                                            placeholder='Ingrese su correo'
                                            name='correo'
                                            value={correo}
                                            onChange={(e) => onInputChange(e)}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor='Password' className='form-label' style={{ color: '#212529' }}>
                                            <i className="fas fa-key"></i> Contraseña
                                        </label>
                                        <input
                                            type='password'
                                            className='form-control'
                                            placeholder='Ingrese su contraseña'
                                            name='password'
                                            value={password}
                                            onChange={(e) => onInputChange(e)}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor='Rol' className='form-label' style={{ color: '#212529' }}>
                                            <i className="fas fa-user-tag"></i> Rol
                                        </label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Ingrese su rol'
                                            name='rol'
                                            value={rol}
                                            onChange={(e) => onInputChange(e)}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <button type='submit' className='btn btn-outline-primary mx-2'>
                                            <i className="fas fa-save"></i> Actualizar
                                        </button>
                                        <button
                                            type='button'
                                            className='btn btn-outline-danger mx-2'
                                            onClick={() => navigate(-1)}
                                        >
                                            <i className="fas fa-times"></i> Cancelar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
