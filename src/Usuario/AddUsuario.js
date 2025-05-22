import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AddUsuario() {

    let navigate = useNavigate();

    const [usuarios, setUsuarios] = useState({
        status: true,
        codeAuth: true,
        username: "",
        name: "",
        correo: "",
        password: "",
        rol: "PROFESOR"
    });

    const { username, name, correo, password, rol } = usuarios;

    const [errores, setErrores] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        const camposMayusculas = ["name"];

        if (camposMayusculas.includes(name)) {
            setUsuarios({ ...usuarios, [name]: value.toUpperCase() });
        } else {
            setUsuarios({ ...usuarios, [name]: value });
        }
    }

    const validar = () => {
        const nuevosErrores = {};
        if (!username) {
            nuevosErrores.username = "El nombre de usuario es obligatorio";
        } else {
            if (/\s/.test(username)) {
                nuevosErrores.username = "El nombre de usuario no puede contener espacios";
            } else if (!/\d/.test(username)) {
                nuevosErrores.username = "El nombre de usuario debe contener al menos un número";
            } else if (!/[A-Z]/.test(username)) {
                nuevosErrores.username = "El nombre de usuario debe contener al menos una letra mayúscula";
            } else if (!/^([A-Za-z0-9_*]+)$/.test(username)) {
                nuevosErrores.username = "Solo se permiten letras, números, _ o *";
            } else if (!/[_*]/.test(username)) {
                nuevosErrores.username = "Debe contener al menos un _ o *";
            } else if (username.length < 6) {
                nuevosErrores.username = "El nombre de usuario debe tener al menos 6 caracteres";
            } else if (username.length > 20) {
                nuevosErrores.username = "El nombre de usuario no puede tener más de 20 caracteres";
            } else if (/^[_*]/.test(username) || /[_*]$/.test(username)) {
                nuevosErrores.username = "El nombre de usuario no debe iniciar ni terminar con _ o *";
            } else if (/^\d+$/.test(username)) {
                nuevosErrores.username = "El nombre de usuario no puede ser solo números";
            } else if (/^[A-Z]+$/.test(username)) {
                nuevosErrores.username = "El nombre de usuario no puede ser solo letras mayúsculas";
            }
        }
        if (!name) {
            nuevosErrores.name = "El nombre es obligatorio";
        } else if (name !== name.toUpperCase()) {
            nuevosErrores.name = "El nombre solo puede contener letras mayúsculas";
        } else if (!/^[A-ZÁÉÍÓÚÑ\s]+$/.test(name)) {
            nuevosErrores.name = "El nombre solo puede contener letras mayúsculas y espacios";
        } else if (name.length < 2) {
            nuevosErrores.name = "El nombre debe tener al menos 2 letras";
        } else if (name.length > 50) {
            nuevosErrores.name = "El nombre no puede tener más de 50 letras";
        } else if (/^\s|\s$/.test(name)) {
            nuevosErrores.name = "El nombre no debe iniciar ni terminar con espacios";
        } else if (/\s{2,}/.test(name)) {
            nuevosErrores.name = "El nombre no debe tener espacios dobles";
        } else if (!name.trim()) {
            nuevosErrores.name = "El nombre no puede ser solo espacios";
        }
        if (!correo) nuevosErrores.correo = "El correo es obligatorio";
        else if (!/\S+@\S+\.\S+/.test(correo)) nuevosErrores.correo = "Correo inválido";
        else if (/^\s|\s$/.test(correo)) {
            nuevosErrores.correo = "El correo no debe iniciar ni terminar con espacios";
        } else if (/\s/.test(correo)) {
            nuevosErrores.correo = "El correo no debe contener espacios";
        } else if (correo.length > 100) {
            nuevosErrores.correo = "El correo no puede tener más de 100 caracteres";
        }
        if (!password) nuevosErrores.password = "La contraseña es obligatoria";
        else if (password.length < 8) {
            nuevosErrores.password = "La contraseña debe tener al menos 8 caracteres";
        } else if (password.length > 32) {
            nuevosErrores.password = "La contraseña no puede tener más de 32 caracteres";
        } else if (!/[A-Z]/.test(password)) {
            nuevosErrores.password = "La contraseña debe contener al menos una letra mayúscula";
        } else if (!/[a-z]/.test(password)) {
            nuevosErrores.password = "La contraseña debe contener al menos una letra minúscula";
        } else if (!/\d/.test(password)) {
            nuevosErrores.password = "La contraseña debe contener al menos un número";
        } else if (!/[!@#$%^&*()_\-+=;':"|,.<>?]/.test(password)) {
            nuevosErrores.password = "La contraseña debe contener al menos un carácter especial";
        } else if (/\s/.test(password)) {
            nuevosErrores.password = "La contraseña no debe contener espacios";
        }
        if (!rol) nuevosErrores.rol = "El rol es obligatorio";
        return nuevosErrores;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const nuevosErrores = validar();
        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }
        await axios.post("http://54.165.104.165:8080/api/usuario", usuarios)
        navigate("/");
    }

    return (
        <div>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-8 border rounded p-4 mt-2 shadow' style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
                        <h2 className='text-center m-4' style={{ color: '#212529' }}>
                            <i className="fas fa-user-plus"></i> Registrar Usuario
                        </h2>
                        <div className='card'>
                            <div className='card-header text-white text-center' style={{ backgroundColor: '#212529' }}>
                                <strong><i className="fas fa-plus-circle"></i> Nuevo Usuario</strong>
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
                                        {errores.username && <div className="text-danger">{errores.username}</div>}
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
                                        {errores.name && <div className="text-danger">{errores.name}</div>}
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
                                        {errores.correo && <div className="text-danger">{errores.correo}</div>}
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor='Password' className='form-label' style={{ color: '#212529' }}>
                                            <i className="fas fa-key"></i> Contraseña
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                className='form-control'
                                                placeholder='Ingrese su contraseña'
                                                name='password'
                                                value={password}
                                                onChange={(e) => onInputChange(e)}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                tabIndex={-1}
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                            >
                                                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                                            </button>
                                        </div>
                                        {errores.password && <div className="text-danger">{errores.password}</div>}
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor='Rol' className='form-label' style={{ color: '#212529' }}>
                                            <i className="fas fa-user-tag"></i> Rol
                                        </label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='rol'
                                            value="PROFESOR"
                                            readOnly
                                        />
                                        {errores.rol && <div className="text-danger">{errores.rol}</div>}
                                    </div>
                                    <div className="text-center">
                                        <button type='submit' className='btn btn-outline-primary mx-2'>
                                            <i className="fas fa-save"></i> Registrar
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
