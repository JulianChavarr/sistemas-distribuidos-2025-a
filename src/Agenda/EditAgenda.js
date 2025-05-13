import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditAgenda() {
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

    const { usuarioId, name, facultad, programa, periodo, fechaInicio, fechaFin } = agendas;

    const onInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "usuarioId") {
            const parsedValue = parseInt(value, 10);
            setAgendas({
                ...agendas,
                usuarioId: {
                    ...agendas.usuarioId,
                    id: isNaN(parsedValue) ? 0 : parsedValue,
                },
            });
        } else {
            setAgendas({ ...agendas, [name]: value });
        }
    };

    useEffect(() => {
        loadAgenda();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos enviados:", agendas);
        try {
            await axios.put(`http://54.165.104.165:8080/api/agenda/${id}`, agendas);
            navigate(`/HomeAgenda/${usuarioId.id}`);
        } catch (error) {
            console.error("Error al actualizar la agenda:", error);
        }
    };

    const loadAgenda = async () => {
        console.log("ID enviado:", id);
        try {
            const result = await axios.get(`http://54.165.104.165:8080/api/agenda/${id}`);
            setAgendas(result.data.data);
        } catch (error) {
            console.error("Error al cargar la agenda:", error);
        }
    };

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-8 border rounded p-4 mt-2 shadow' style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
                    <h2 className='text-center m-4' style={{ color: '#212529' }}>
                        <i className="fas fa-calendar-alt"></i> Editar Agenda
                    </h2>
                    <div className='card'>
                        <div className='card-header text-white text-center' style={{ backgroundColor: '#212529' }}>
                            <strong><i className="fas fa-edit"></i> Editar Agenda ID #{id}</strong>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={(e) => onSubmit(e)}>
                                <div className='mb-3'>
                                    <label htmlFor='UsuarioId' className='form-label' style={{ color: '#212529' }}>
                                        <i className="fas fa-user"></i> Usuario ID
                                    </label>
                                    <input
                                        type='number'
                                        className='form-control'
                                        placeholder='Ingrese su ID de usuario'
                                        name='usuarioId'
                                        value={usuarioId.id || 0}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
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
    );
}