import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditClase() {
    let navigate = useNavigate();
    const { id } = useParams();

    const [clases, setClases] = useState({
        status: true,
        codeAuth: true,
        agendaId: {
            id: parseInt(id, 10) || 0,
            status: true,
            codeAuth: true
        },
        name: "",
        programa: "",
        grupo: 1,
        sede: "",
        horasSemanales: 1,
        horasSemestre: 1
    });

    const { agendaId, name, programa, grupo, sede, horasSemanales, horasSemestre } = clases;

    const onInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "agendaId") {
            const parsedValue = parseInt(value, 10);
            setClases({
                ...clases,
                agendaId: {
                    ...clases.agendaId,
                    id: isNaN(parsedValue) ? 0 : parsedValue,
                },
            });
        } else {
            setClases({ ...clases, [name]: value });
        }
    };

    useEffect(() => {
        loadClase();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://54.165.104.165:8080/api/clase/${id}`, clases);
            navigate(`/HomeFormulario/${agendaId.id}`);
        } catch (error) {
            console.error("Error al actualizar la clase:", error);
        }
    };

    const loadClase = async () => {
        try {
            const result = await axios.get(`http://54.165.104.165:8080/api/clase/${id}`);
            setClases(result.data.data);
        } catch (error) {
            console.error("Error al cargar la clase:", error);
        }
    };

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-8 border rounded p-4 mt-2 shadow' style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
                    <h2 className='text-center m-4' style={{ color: '#212529' }}>
                        <i className="fas fa-chalkboard"></i> Editar Clase
                    </h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='card'>
                            <div className='card-header text-white text-center' style={{ backgroundColor: '#212529' }}>
                                <strong><i className="fas fa-edit"></i> Editar Clase ID #{id}</strong>
                            </div>
                            <div className='card-body'>
                                <div className='mb-3'>
                                    <label htmlFor='AgendaId' className='form-label'>
                                        <i className="fas fa-calendar-alt"></i> Agenda ID
                                    </label>
                                    <input
                                        type='number'
                                        className='form-control'
                                        placeholder='Ingrese el ID de la agenda'
                                        name='agendaId'
                                        value={agendaId.id || 0}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='Name' className='form-label'>
                                        <i className="fas fa-book"></i> Nombre de la Clase
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Ingrese el nombre de la clase'
                                        name='name'
                                        value={name}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='Programa' className='form-label'>
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
                                    <label htmlFor='Grupo' className='form-label'>
                                        <i className="fas fa-users"></i> Grupo
                                    </label>
                                    <input
                                        type='number'
                                        className='form-control'
                                        placeholder='Ingrese el grupo'
                                        name='grupo'
                                        value={grupo}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='Sede' className='form-label'>
                                        <i className="fas fa-map-marker-alt"></i> Sede
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Ingrese la sede'
                                        name='sede'
                                        value={sede}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='HorasSemanales' className='form-label'>
                                        <i className="fas fa-clock"></i> Horas Semanales
                                    </label>
                                    <input
                                        type='number'
                                        className='form-control'
                                        placeholder='Ingrese las horas semanales'
                                        name='horasSemanales'
                                        value={horasSemanales}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='HorasSemestre' className='form-label'>
                                        <i className="fas fa-calendar-alt"></i> Horas Semestre
                                    </label>
                                    <input
                                        type='number'
                                        className='form-control'
                                        placeholder='Ingrese las horas del semestre'
                                        name='horasSemestre'
                                        value={horasSemestre}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-4">
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
    );
}