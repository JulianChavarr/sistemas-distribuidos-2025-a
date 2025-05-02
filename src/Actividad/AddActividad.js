import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function AddActividad() {

    let navigate = useNavigate();

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

    const onSubmit = async (e) => {
        e.preventDefault();

        console.log("Datos enviados al servidor:", actividades);

        await axios.post("http://107.22.67.73:8080/api/actividad", actividades)
        navigate("/HomeActividad");
    }

    return <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Registrar Actividad</h2>

                <form onSubmit={(e) => onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='AgendaId' className='form-label'>
                            Agenda Id
                        </label>
                        <input type='number' className='form-control' placeholder='Ingrese su id de la agenda' name='agendaId' value={agendaId.id || 0} onChange={(e) => onInputChange(e)} />
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
                        <label htmlFor='FechaActividad' className='form-label'>
                            Fecha Actividad
                        </label>
                        <input type='date' className='form-control' placeholder='Ingrese la fecha de la actividad' name='fechaActividad' value={fechaActividad} onChange={(e) => onInputChange(e)} />
                    </div>

                    <button type='submit' className='btn btn-outline-primary'>
                        Registrar
                    </button>
                    <Link className='btn btn-outline-danger mx-2' to="/HomeActividad">
                        Cancelar
                    </Link>
                </form>
            </div>
        </div>
    </div >


}