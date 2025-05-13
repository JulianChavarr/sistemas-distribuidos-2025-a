import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditActividad() {
    let navigate = useNavigate();
    const { id } = useParams();

    const [actividades, setActividades] = useState({
        status: true,
        codeAuth: true,
        agendaId: {
            id: parseInt(id, 10) || 0,
            status: true,
            codeAuth: true
        },
        categoria: "",
        subCategoria: "",
        horasSemanales: 1,
        horasSemestre: 1,
        descripcion: "",
        producto: ""
    });

    const { agendaId, categoria, subCategoria, horasSemanales, horasSemestre, descripcion, producto } = actividades;

    const onInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "agendaId") {
            const parsedValue = parseInt(value, 10);
            setActividades({
                ...actividades,
                agendaId: {
                    ...actividades.agendaId,
                    id: isNaN(parsedValue) ? 0 : parsedValue,
                },
            });
        } else {
            setActividades({ ...actividades, [name]: value });
        }
    };

    useEffect(() => {
        loadActividad();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://54.165.104.165:8080/api/actividad/${id}`, actividades);
            navigate(`/HomeFormulario/${agendaId.id}`);
        } catch (error) {
            console.error("Error al actualizar la actividad:", error);
        }
    };

    const loadActividad = async () => {
        try {
            const result = await axios.get(`http://54.165.104.165:8080/api/actividad/${id}`);
            setActividades(result.data.data);
        } catch (error) {
            console.error("Error al cargar la actividad:", error);
        }
    };

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-8 border rounded p-4 mt-2 shadow' style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
                    <h2 className='text-center m-4' style={{ color: '#212529' }}>
                        <i className="fas fa-tasks"></i> Editar Actividad
                    </h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='card'>
                            <div className='card-header text-white text-center' style={{ backgroundColor: '#212529' }}>
                                <strong><i className="fas fa-edit"></i> Editar Actividad ID #{id}</strong>
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
                                    <label htmlFor='Categoria' className='form-label'>
                                        <i className="fas fa-tag"></i> Categoría
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Ingrese la categoría'
                                        name='categoria'
                                        value={categoria}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='SubCategoria' className='form-label'>
                                        <i className="fas fa-tags"></i> Subcategoría
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Ingrese la subcategoría'
                                        name='subCategoria'
                                        value={subCategoria}
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
                                <div className='mb-3'>
                                    <label htmlFor='Descripcion' className='form-label'>
                                        <i className="fas fa-align-left"></i> Descripción
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Ingrese la descripción'
                                        name='descripcion'
                                        value={descripcion}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='Producto' className='form-label'>
                                        <i className="fas fa-box"></i> Producto
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Ingrese el producto'
                                        name='producto'
                                        value={producto}
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