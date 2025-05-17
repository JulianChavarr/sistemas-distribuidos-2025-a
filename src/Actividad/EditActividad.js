import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
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
    const [errores, setErrores] = useState({});

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

    const validar = () => {
        const errores = {};

        if (!categoria) {
            errores.categoria = "La categoría es obligatoria";
        } else if (!["ACADÉMICAS", "FORMATIVAS", "CIENTÍFICAS", "EXTENSIÓN", "CULTURALES", "ADMINISTRATIVA"].includes(categoria)) {
            errores.categoria = "Seleccione una categoría válida";
        }

        if (!subCategoria) {
            errores.subCategoria = "La subcategoría es obligatoria";
        } else if (subCategoria.length < 3) {
            errores.subCategoria = "Debe tener al menos 3 caracteres";
        } else if (subCategoria.length > 50) {
            errores.subCategoria = "No puede tener más de 50 caracteres";
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(subCategoria)) {
            errores.subCategoria = "Solo se permiten letras y espacios";
        } else if (!subCategoria.trim()) {
            errores.subCategoria = "La subcategoría no puede ser solo espacios";
        } else if (/\s{2,}/.test(subCategoria)) {
            errores.subCategoria = "La subcategoría no debe tener espacios dobles";
        } else if (/^\s|\s$/.test(subCategoria)) {
            errores.subCategoria = "La subcategoría no debe iniciar ni terminar con espacios";
        }

        if (!horasSemanales) {
            errores.horasSemanales = "Las horas semanales son obligatorias";
        } else if (isNaN(horasSemanales) || horasSemanales <= 0) {
            errores.horasSemanales = "Debe ser un número positivo";
        } else if (!Number.isInteger(Number(horasSemanales))) {
            errores.horasSemanales = "Debe ser un número entero";
        } else if (Number(horasSemanales) > 40) {
            errores.horasSemanales = "No puede ser mayor a 40 horas semanales";
        } else if (Number(horasSemanales) < 1) {
            errores.horasSemanales = "Debe ser al menos 1 hora semanal";
        }

        if (!horasSemestre) {
            errores.horasSemestre = "Las horas del semestre son obligatorias";
        } else if (isNaN(horasSemestre) || horasSemestre <= 0) {
            errores.horasSemestre = "Debe ser un número positivo";
        } else if (!Number.isInteger(Number(horasSemestre))) {
            errores.horasSemestre = "Debe ser un número entero";
        }

        if (!descripcion) {
            errores.descripcion = "La descripción es obligatoria";
        } else if (descripcion.length < 3) {
            errores.descripcion = "Debe tener al menos 3 caracteres";
        } else if (descripcion.length > 100) {
            errores.descripcion = "No puede tener más de 100 caracteres";
        } else if (!descripcion.trim()) {
            errores.descripcion = "La descripción no puede ser solo espacios";
        } else if (/\s{2,}/.test(descripcion)) {
            errores.descripcion = "La descripción no debe tener espacios dobles";
        } else if (/^\s|\s$/.test(descripcion)) {
            errores.descripcion = "La descripción no debe iniciar ni terminar con espacios";
        }

        if (!producto) {
            errores.producto = "El producto es obligatorio";
        } else if (producto.length < 3) {
            errores.producto = "Debe tener al menos 3 caracteres";
        } else if (producto.length > 100) {
            errores.producto = "No puede tener más de 100 caracteres";
        } else if (!producto.trim()) {
            errores.producto = "El producto no puede ser solo espacios";
        } else if (/\s{2,}/.test(producto)) {
            errores.producto = "El producto no debe tener espacios dobles";
        } else if (/^\s|\s$/.test(producto)) {
            errores.producto = "El producto no debe iniciar ni terminar con espacios";
        }

        if (!agendaId.id) {
            errores.agendaId = "El ID de la agenda es obligatorio";
        } else if (isNaN(agendaId.id) || agendaId.id <= 0) {
            errores.agendaId = "El ID de la agenda debe ser un número positivo";
        } else if (!Number.isInteger(Number(agendaId.id))) {
            errores.agendaId = "El ID de la agenda debe ser un número entero";
        }

        return errores;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const erroresValidacion = validar();
        setErrores(erroresValidacion);
        if (Object.keys(erroresValidacion).length > 0) {
            return;
        }
        try {
            await axios.put(`http://54.165.104.165:8080/api/actividad/${id}`, actividades);
            navigate(`/HomeFormulario/${agendaId.id}`);
        } catch (error) {
            console.error("Error al actualizar la actividad:", error);
        }
    };

    const loadActividad = useCallback(async () => {
        try {
            const result = await axios.get(`http://54.165.104.165:8080/api/actividad/${id}`);
            setActividades(result.data.data);
        } catch (error) {
            console.error("Error al cargar la actividad:", error);
        }
    }, [id]);

    useEffect(() => {
        loadActividad();
    }, [loadActividad]);

    // Calcula horasSemestre automáticamente cuando cambian las horasSemanales
    useEffect(() => {
        setActividades((prev) => ({
            ...prev,
            horasSemestre: Number(prev.horasSemanales) > 0 ? Number(prev.horasSemanales) * 16 : 0
        }));
    }, [actividades.horasSemanales]);

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
                                    {errores.agendaId && <div className="text-danger">{errores.agendaId}</div>}
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='Categoria' className='form-label'>
                                        <i className="fas fa-tag"></i> Categoría
                                    </label>
                                    <select
                                        className='form-control'
                                        name='categoria'
                                        value={categoria}
                                        onChange={onInputChange}
                                    >
                                        <option value="">Seleccione una categoría</option>
                                        <option value="ACADÉMICAS">ACADÉMICAS</option>
                                        <option value="FORMATIVAS">FORMATIVAS</option>
                                        <option value="CIENTÍFICAS">CIENTÍFICAS</option>
                                        <option value="EXTENSIÓN">EXTENSIÓN</option>
                                        <option value="CULTURALES">CULTURALES</option>
                                        <option value="ADMINISTRATIVA">ADMINISTRATIVA</option>
                                    </select>
                                    {errores.categoria && <div className="text-danger">{errores.categoria}</div>}
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
                                    {errores.subCategoria && <div className="text-danger">{errores.subCategoria}</div>}
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
                                    {errores.horasSemanales && <div className="text-danger">{errores.horasSemanales}</div>}
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='HorasSemestre' className='form-label'>
                                        <i className="fas fa-calendar-alt"></i> Horas Semestre
                                    </label>
                                    <input
                                        type='number'
                                        className='form-control'
                                        placeholder='Horas del semestre'
                                        name='horasSemestre'
                                        value={horasSemestre}
                                        readOnly
                                    />
                                    {errores.horasSemestre && <div className="text-danger">{errores.horasSemestre}</div>}
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
                                    {errores.descripcion && <div className="text-danger">{errores.descripcion}</div>}
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
                                    {errores.producto && <div className="text-danger">{errores.producto}</div>}
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