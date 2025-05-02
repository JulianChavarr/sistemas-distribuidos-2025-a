import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditUsuario() {

    let navigate = useNavigate();

    const {id} = useParams();

    const [usuarios, setUsuarios] = useState({
        status: true,
        codeAuth: true,
        name: "",
        correo: "",
        password: "",
        rol: ""
    });

    const { name, correo, password, rol } = usuarios;

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
            await axios.put(`http://107.22.67.73:8080/api/usuario/${id}`, usuarios);
            navigate("/");
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
        }
    }

    const loadUsuario = async () => {
        console.log("ID enviado:", id); // Verifica el ID
        try {
            const result = await axios.get(`http://107.22.67.73:8080/api/usuario/${id}`);
            setUsuarios(result.data.data); // Asegúrate de que el servidor devuelva los datos correctamente
        } catch (error) {
            console.error("Error al cargar el usuario:", error);
        }
    }

    return <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Editar Usuario</h2>

                <form onSubmit={(e) => onSubmit(e)}>
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
                            Actualizar
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
