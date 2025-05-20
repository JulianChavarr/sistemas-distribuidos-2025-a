import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
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

    const [errores, setErrores] = useState({});

    const { agendaId, name, programa, grupo, sede, horasSemanales, horasSemestre } = clases;

    const onInputChange = (e) => {
        const { name, value } = e.target;

        // Campos que deben ser siempre mayúsculas
        const camposMayusculas = ["name", "programa", "sede"];

        if (name === "agendaId") {
            const parsedValue = parseInt(value, 10);
            setClases({
                ...clases,
                agendaId: {
                    ...clases.agendaId,
                    id: isNaN(parsedValue) ? 0 : parsedValue,
                },
            });
        } else if (camposMayusculas.includes(name)) {
            setClases({ ...clases, [name]: value.toUpperCase() });
        } else {
            setClases({ ...clases, [name]: value });
        }
    };

    const loadClase = useCallback(async () => {
        try {
            const result = await axios.get(`http://54.165.104.165:8080/api/clase/${id}`);
            setClases(result.data.data);
        } catch (error) {
            console.error("Error al cargar la clase:", error);
        }
    }, [id]);

    useEffect(() => {
        loadClase();
    }, [loadClase]);

    // Calcula horasSemestre automáticamente cuando cambian las horasSemanales
    useEffect(() => {
        setClases((prev) => ({
            ...prev,
            horasSemestre: Number(prev.horasSemanales) > 0 ? Number(prev.horasSemanales) * 16 : 0
        }));
    }, [clases.horasSemanales]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const erroresValidacion = validar();
        if (Object.keys(erroresValidacion).length > 0) {
            setErrores(erroresValidacion);
            return;
        }
        try {
            await axios.put(`http://54.165.104.165:8080/api/clase/${id}`, clases);
            navigate(`/HomeFormulario/${agendaId.id}`);
        } catch (error) {
            console.error("Error al actualizar la clase:", error);
        }
    };

    const validar = () => {
        const errores = {};
        if (!name) {
            errores.name = "El nombre de la clase es obligatorio";
        } else if (name.length < 3) {
            errores.name = "Debe tener al menos 3 caracteres";
        } else if (name.length > 50) {
            errores.name = "No puede tener más de 50 caracteres";
        } else if (name !== name.toUpperCase()) {
            errores.name = "Solo se permiten letras mayúsculas";
        } else if (!/^[A-ZÁÉÍÓÚÑ\s]+$/.test(name)) {
            errores.name = "Solo se permiten letras mayúsculas y espacios";
        } else if (!name.trim()) {
            errores.name = "El nombre no puede ser solo espacios";
        } else if (/\s{2,}/.test(name)) {
            errores.name = "El nombre no debe tener espacios dobles";
        } else if (/^\s|\s$/.test(name)) {
            errores.name = "El nombre no debe iniciar ni terminar con espacios";
        }

        if (!programa) {
            errores.programa = "El programa es obligatorio";
        } else if (programa.length < 3) {
            errores.programa = "Debe tener al menos 3 caracteres";
        } else if (programa.length > 50) {
            errores.programa = "No puede tener más de 50 caracteres";
        } else if (programa !== programa.toUpperCase()) {
            errores.programa = "Solo se permiten letras mayúsculas";
        } else if (!/^[A-ZÁÉÍÓÚÑ\s]+$/.test(programa)) {
            errores.programa = "Solo se permiten letras mayúsculas y espacios";
        } else if (!programa.trim()) {
            errores.programa = "El programa no puede ser solo espacios";
        } else if (/\s{2,}/.test(programa)) {
            errores.programa = "El programa no debe tener espacios dobles";
        } else if (/^\s|\s$/.test(programa)) {
            errores.programa = "El programa no debe iniciar ni terminar con espacios";
        }

        if (!grupo) {
            errores.grupo = "El grupo es obligatorio";
        } else if (isNaN(grupo) || grupo <= 0) {
            errores.grupo = "El grupo debe ser un número positivo";
        } else if (!Number.isInteger(Number(grupo))) {
            errores.grupo = "El grupo debe ser un número entero";
        } else if (Number(grupo) > 99) {
            errores.grupo = "El grupo no puede ser mayor a 99";
        }

        if (!sede) {
            errores.sede = "La sede es obligatoria";
        } else if (sede.length < 3) {
            errores.sede = "Debe tener al menos 3 caracteres";
        } else if (sede.length > 50) {
            errores.sede = "No puede tener más de 50 caracteres";
        } else if (sede !== sede.toUpperCase()) {
            errores.sede = "Solo se permiten letras mayúsculas";
        } else if (!/^[A-ZÁÉÍÓÚÑ\s]+$/.test(sede)) {
            errores.sede = "Solo se permiten letras mayúsculas y espacios";
        } else if (!sede.trim()) {
            errores.sede = "La sede no puede ser solo espacios";
        } else if (/\s{2,}/.test(sede)) {
            errores.sede = "La sede no debe tener espacios dobles";
        } else if (/^\s|\s$/.test(sede)) {
            errores.sede = "La sede no debe iniciar ni terminar con espacios";
        }

        if (!horasSemanales) {
            errores.horasSemanales = "Las horas semanales son obligatorias";
        } else if (isNaN(horasSemanales) || horasSemanales <= 0) {
            errores.horasSemanales = "Debe ser un número positivo";
        } else if (!Number.isInteger(Number(horasSemanales))) {
            errores.horasSemanales = "Debe ser un número entero";
        }

        if (!horasSemestre) {
            errores.horasSemestre = "Las horas del semestre son obligatorias";
        } else if (isNaN(horasSemestre) || horasSemestre <= 0) {
            errores.horasSemestre = "Debe ser un número positivo";
        } else if (!Number.isInteger(Number(horasSemestre))) {
            errores.horasSemestre = "Debe ser un número entero";
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
                                        min={1}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                    {errores.agendaId && <div className="text-danger">{errores.agendaId}</div>}
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
                                    {errores.name && <div className="text-danger">{errores.name}</div>}
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
                                    {errores.programa && <div className="text-danger">{errores.programa}</div>}
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
                                        min={1} // <-- Esto evita que el usuario seleccione un valor menor a 1
                                        onChange={(e) => onInputChange(e)}
                                    />
                                    {errores.grupo && <div className="text-danger">{errores.grupo}</div>}
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
                                    {errores.sede && <div className="text-danger">{errores.sede}</div>}
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
                                        min={0}
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