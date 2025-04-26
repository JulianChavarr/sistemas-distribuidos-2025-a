import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditAgenda() {

    let navigate = useNavigate();

    const { id } = useParams();

    const [agendas, setAgendas] = useState({
        status: true,
        codeAuth: true,
        usuarioId: {
            id: ""
        },
        name: "",
        fechaInicio: "",
        fechaFin: ""
    });

    const { usuarioId, name, fechaInicio, fechaFin } = agendas;

    const onInputChange = (e) => {
        setAgendas({ ...agendas, [e.target.name]: e.target.value });
    }

    useEffect(() => {

        loadAgenda();

    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos enviados:", agendas); // Verifica los datos
        try {
            await axios.put(`http://localhost:8080/api/agenda/${id}`, agendas);
            navigate("/");
        } catch (error) {
            console.error("Error al actualizar la agenda:", error);
        }
    }

    const loadAgenda = async () => {
        console.log("ID enviado:", id); // Verifica el ID
        try {
            const result = await axios.get(`http://localhost:8080/api/agenda/${id}`);
            setAgendas(result.data.data); // Asegúrate de que el servidor devuelva los datos correctamente
        } catch (error) {
            console.error("Error al cargar el agenda:", error);
        }
    }

    return <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Editar Agenda</h2>

                <form onSubmit={(e) => onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='UsuarioId' className='form-label'>
                            Usuario Id
                        </label>
                        <input type='text' className='form-control' placeholder='Ingrese su id de usuario' name='usuarioId' value={usuarioId} onChange={(e) => onInputChange(e)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>
                            Nombre
                        </label>
                        <input type='text' className='form-control' placeholder='Ingrese su nombre' name='name' value={name} onChange={(e) => onInputChange(e)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='FechaInicio' className='form-label'>
                            Fecha Inicio
                        </label>
                        <input type='date' className='form-control' placeholder='Ingrese la fecha de inicio' name='fechaInicio' value={fechaInicio} onChange={(e) => onInputChange(e)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='FechaFin' className='form-label'>
                            Fecha Fin
                        </label>
                        <input type='date' className='form-control' placeholder='Ingrese la fecha de fin' name='fechaFin' value={fechaFin} onChange={(e) => onInputChange(e)} />
                    </div>

                    <button type='submit' className='btn btn-outline-primary'>
                        Registrar
                    </button>
                    <Link className='btn btn-outline-danger mx-2' to="/">
                        Cancelar
                    </Link>
                </form>
            </div>
        </div>
    </div>
}