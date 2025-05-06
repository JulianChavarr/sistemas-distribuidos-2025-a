import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function AddUsuario() {

    let navigate = useNavigate();

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

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/api/usuario", usuarios)
        navigate("/");
    }

    return <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Registrar Usuario</h2>

                <form onSubmit={(e) => onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='Username' className='form-label'>
                            Nombre de Usuario
                        </label>
                        <input type='text' className='form-control' placeholder='Ingrese su nombre de usuario' name='username' value={username} onChange={(e) => onInputChange(e)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>
                            Nombre
                        </label>
                        <input type='text' className='form-control' placeholder='Ingrese su nombre' name='name' value={name} onChange={(e) => onInputChange(e)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Correo' className='form-label'>
                            Correo
                        </label>
                        <input type='email' className='form-control' placeholder='Ingrese su correo' name='correo' value={correo} onChange={(e) => onInputChange(e)} />
                        <div className='mb-3'>
                            <label htmlFor='Password' className='form-label'>
                                Contraseña
                            </label>
                            <input type='password' className='form-control' placeholder='Ingrese su contraseña' name='password' value={password} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Rol' className='form-label'>
                                Rol
                            </label>
                            <input type='text' className='form-control' placeholder='Ingrese su rol' name='rol' value={rol} onChange={(e) => onInputChange(e)} />
                        </div>
                        <button type='submit' className='btn btn-outline-primary'>
                            Registrar
                        </button>
                        <Link className='btn btn-outline-danger mx-2' to="/">
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
}
