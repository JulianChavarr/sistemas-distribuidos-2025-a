import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function AddAgenda() {
    let navigate = useNavigate();

    const { id } = useParams();

    const [agendas, setAgendas] = useState({
        status: true,
        codeAuth: true,
        usuarioId: {
            id: parseInt(id, 10) || 0,
            status: true,
            codeAuth: true
        },
        name: "",
        facultad: "",
        programa: "",
        periodo: "",
        fechaInicio: "",
        fechaFin: ""
    });

    const [errores, setErrores] = useState({});

    const { usuarioId, name, facultad, programa, periodo, fechaInicio, fechaFin } = agendas;

    const onInputChange = (e) => {
        const { name, value } = e.target;
        const camposMayusculas = ["name", "facultad", "programa", "periodo"];

        if (name === "usuarioId") {
            const parsedValue = parseInt(value, 10);
            setAgendas({
                ...agendas,
                usuarioId: {
                    ...agendas.usuarioId,
                    id: isNaN(parsedValue) ? 0 : parsedValue,
                },
            });
        } else if (camposMayusculas.includes(name)) {
            setAgendas({ ...agendas, [name]: value.toUpperCase() });
        } else {
            setAgendas({ ...agendas, [name]: value });
        }
    }

    const validar = () => {
        const errores = {};
        if (!name) {
            errores.name = "El nombre de la agenda es obligatorio";
        } else if (name !== name.toUpperCase()) {
            errores.name = "El nombre de la agenda debe estar en mayúsculas";
        } else if (name.length < 3) {
            errores.name = "Debe tener al menos 3 caracteres";
        } else if (name.length > 20) {
            errores.name = "No puede tener más de 20 caracteres";
        } else if (!name.trim()) {
            errores.name = "El nombre no puede ser solo espacios";
        } else if (!/^[A-ZÁÉÍÓÚÑ\s]+$/.test(name)) {
            errores.name = "El nombre solo puede contener letras mayúsculas y espacios";
        } else if (/\s{2,}/.test(name)) {
            errores.name = "El nombre no debe tener espacios dobles";
        }
        if (!facultad) {
            errores.facultad = "La facultad es obligatoria";
        } else if (facultad !== facultad.toUpperCase()) {
            errores.facultad = "La facultad solo puede contener letras mayúsculas";
        } else if (facultad.length < 3) {
            errores.facultad = "La facultad debe tener al menos 3 caracteres";
        } else if (facultad.length > 50) {
            errores.facultad = "La facultad no puede tener más de 50 caracteres";
        } else if (!facultad.trim()) {
            errores.facultad = "La facultad no puede ser solo espacios";
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(facultad)) {
            errores.facultad = "La facultad solo puede contener letras y espacios";
        } else if (/\s{2,}/.test(facultad)) {
            errores.facultad = "La facultad no debe tener espacios dobles";
        } else if (/^\s|\s$/.test(facultad)) {
            errores.facultad = "La facultad no debe iniciar ni terminar con espacios";
        }
        if (!programa) {
            errores.programa = "El programa es obligatorio";
        } else if (programa !== programa.toUpperCase()) {
            errores.programa = "El programa solo puede contener letras mayúsculas";
        } else if (programa.length < 3) {
            errores.programa = "El programa debe tener al menos 3 caracteres";
        } else if (programa.length > 50) {
            errores.programa = "El programa no puede tener más de 50 caracteres";
        } else if (!programa.trim()) {
            errores.programa = "El programa no puede ser solo espacios";
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(programa)) {
            errores.programa = "El programa solo puede contener letras y espacios";
        } else if (/\s{2,}/.test(programa)) {
            errores.programa = "El programa no debe tener espacios dobles";
        } else if (/^\s|\s$/.test(programa)) {
            errores.programa = "El programa no debe iniciar ni terminar con espacios";
        }
        if (!periodo) {
            errores.periodo = "El periodo es obligatorio";
        } else if (/\s/.test(periodo)) {
            errores.periodo = "El periodo no debe contener espacios";
        } else if (periodo.length !== 6) {
            errores.periodo = "El periodo debe tener exactamente 6 caracteres";
        } else if (!/^\d{4}-[A-Z]$/.test(periodo)) {
            errores.periodo = "El periodo debe tener el formato '2025-A' (año, guion y letra mayúscula)";
        }
        if (!fechaInicio) {
            errores.fechaInicio = "La fecha de inicio es obligatoria";
        } else if (new Date(fechaInicio) < new Date()) {
            errores.fechaInicio = "La fecha de inicio no puede ser anterior a hoy";
        } else if (fechaFin && new Date(fechaInicio) > new Date(fechaFin)) {
            errores.fechaInicio = "La fecha de inicio no puede ser posterior a la fecha de fin";
        }
        if (!fechaFin) {
            errores.fechaFin = "La fecha de fin es obligatoria";
        } else if (fechaInicio && new Date(fechaFin) < new Date(fechaInicio)) {
            errores.fechaFin = "La fecha de fin no puede ser anterior a la fecha de inicio";
        } else if (fechaInicio && new Date(fechaFin).getTime() === new Date(fechaInicio).getTime()) {
            errores.fechaFin = "La fecha de fin no puede ser igual a la fecha de inicio";
        } else if (new Date(fechaFin) < new Date()) {
            errores.fechaFin = "La fecha de fin no puede ser anterior a hoy";
        }

        return errores;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const nuevosErrores = validar();
        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }
        await axios.post("http://54.165.104.165:8080/api/agenda", agendas)
        navigate(`/HomeAgenda/${usuarioId.id}`);
    }

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-8 border rounded p-4 mt-2 shadow' style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
                    <h2 className='text-center m-4' style={{ color: '#212529' }}>
                        <i className="fas fa-calendar-plus"></i> Registrar Agenda
                    </h2>
                    <div className='card'>
                        <div className='card-header text-white text-center' style={{ backgroundColor: '#212529' }}>
                            <strong><i className="fas fa-plus-circle"></i> Nueva Agenda</strong>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={(e) => onSubmit(e)}>
                                <div className='mb-3'>
                                    <label htmlFor='Name' className='form-label' style={{ color: '#212529' }}>
                                        <i className="fas fa-book"></i> Nombre
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Ingrese nombre de la agenda'
                                        name='name'
                                        value={name}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                    {errores.name && <div className="text-danger">{errores.name}</div>}
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='Facultad' className='form-label' style={{ color: '#212529' }}>
                                        <i className="fas fa-university"></i> Facultad
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Ingrese la facultad'
                                        name='facultad'
                                        value={facultad}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                    {errores.facultad && <div className="text-danger">{errores.facultad}</div>}
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='Programa' className='form-label' style={{ color: '#212529' }}>
                                        <i className="fas fa-graduation-cap"></i> Programa
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Ingrese el programa'
                                        name='programa'
                                        value={programa}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                    {errores.programa && <div className="text-danger">{errores.programa}</div>}
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='Periodo' className='form-label' style={{ color: '#212529' }}>
                                        <i className="fas fa-calendar"></i> Periodo
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Ingrese el periodo'
                                        name='periodo'
                                        value={periodo}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                    {errores.periodo && <div className="text-danger">{errores.periodo}</div>}
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='FechaInicio' className='form-label' style={{ color: '#212529' }}>
                                        <i className="fas fa-calendar-day"></i> Fecha Inicio
                                    </label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        placeholder='Ingrese la fecha de inicio'
                                        name='fechaInicio'
                                        value={fechaInicio}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                    {errores.fechaInicio && <div className="text-danger">{errores.fechaInicio}</div>}
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='FechaFin' className='form-label' style={{ color: '#212529' }}>
                                        <i className="fas fa-calendar-check"></i> Fecha Fin
                                    </label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        placeholder='Ingrese la fecha de fin'
                                        name='fechaFin'
                                        value={fechaFin}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                    {errores.fechaFin && <div className="text-danger">{errores.fechaFin}</div>}
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
    );
}