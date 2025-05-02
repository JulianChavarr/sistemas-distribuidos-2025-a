import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditActividad() {

    let navigate = useNavigate();

    const { id } = useParams();

    const [actividades, setActividades] = useState({
        status: true,
        codeAuth: true,
        agendaId: {
            id: 0,
            status: true,
            codeAuth: true
        },
        name: "",
        descripcion: "",
        fechaActividad: ""
    });

    const { agendaId, name, descripcion, fechaActividad } = actividades;

    const onInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "agendaId") {
            const parsedValue = parseInt(value, 10);
            setActividades({
                ...actividades,
                agendaId: {
                    ...actividades.agendaId,
                    id: isNaN(parsedValue) ? 0 : parsedValue, // Actualiza solo el campo `id` dentro de `agendaId`
                },
            });
        } else {
            setActividades({ ...actividades, [name]: value }); // Actualiza los campos de nivel superior
        }
    }

    useEffect(() => {

        loadActividad();

    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos enviados:", actividades); // Verifica los datos
        try {
            await axios.put(`http://107.22.67.73:8080/api/actividad/${id}`, actividades);
            navigate("/HomeActividad");
        } catch (error) {
            console.error("Error al actualizar la actividad:", error);
        }
    }

    const loadActividad = async () => {
        console.log("ID enviado:", id); // Verifica el ID
        try {
            const result = await axios.get(`http://107.22.67.73:8080/api/actividad/${id}`);
            setActividades(result.data.data); // Asegúrate de que el servidor devuelva los datos correctamente
        } catch (error) {
            console.error("Error al cargar la actividad:", error);
        }
    }

    return <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Editar Actividad</h2>

                <form onSubmit={(e) => onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='AgendaId' className='form-label'>
                            Agenda Id
                        </label>
                        <input type='number' className='form-control' placeholder='Ingrese su id de agenda' name='agendaId' value={agendaId.id || 0} onChange={(e) => onInputChange(e)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>
                            Nombre
                        </label>
                        <input type='text' className='form-control' placeholder='Ingrese nombre de la actividad' name='name' value={name} onChange={(e) => onInputChange(e)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>
                            Descripción
                        </label>
                        <input type='text' className='form-control' placeholder='Ingrese la descripción' name='descripcion' value={descripcion} onChange={(e) => onInputChange(e)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='FechaInicio' className='form-label'>
                            Fecha de la Actividad
                        </label>
                        <input type='date' className='form-control' placeholder='Ingrese la fecha de la actividad' name='fechaActividad' value={fechaActividad} onChange={(e) => onInputChange(e)} />
                    </div>

                    <button type='submit' className='btn btn-outline-primary'>
                        Actualizar
                    </button>
                    <Link className='btn btn-outline-danger mx-2' to="/HomeActividad">
                        Cancelar
                    </Link>
                </form>
            </div>
        </div>
    </div>
}