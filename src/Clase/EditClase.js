import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditClase() {

    let navigate = useNavigate();

    const { id } = useParams();

    const [clases, setClases] = useState({
        status: true,
        codeAuth: true,
        agendaId: {
            id: 0,
            status: true,
            codeAuth: true,
            usuarioId: {
                id: 0,
                status: true,
                codeAuth: true
            }
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
        } else if (name === "usuarioId") {
            const parsedValue = parseInt(value, 10);
            setClases({
                ...clases,
                agendaId: {
                    ...clases.agendaId,
                    usuarioId: {
                        ...clases.agendaId.usuarioId,
                        id: isNaN(parsedValue) ? 0 : parsedValue,
                    },
                },
            });
        } else {
            setClases({ ...clases, [name]: value });
        }
    }

    useEffect(() => {

        loadClase();

    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos enviados:", clases);
        try {
            await axios.put(`http://54.165.104.165:8080/api/clase/${id}`, clases);
            navigate("/HomeClase");
        } catch (error) {
            console.error("Error al actualizar la clase:", error);
        }
    }

    const loadClase = async () => {
        console.log("ID enviado:", id);
        try {
            const result = await axios.get(`http://54.165.104.165:8080/api/clase/${id}`);
            setClases(result.data.data);
        } catch (error) {
            console.error("Error al cargar la clase:", error);
        }
    }

    return <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Editar Clase</h2>

                <form onSubmit={(e) => onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='AgendaId' className='form-label'>
                            Agenda Id
                        </label>
                        <input type='number' className='form-control' placeholder='Ingrese su id de agenda' name='agendaId' value={agendaId.id || 0} onChange={(e) => onInputChange(e)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Categoria' className='form-label'>
                            Usuario Id
                        </label>
                        <input type='number' className='form-control' placeholder='Ingrese su id de usuario' name='usuarioId' value={agendaId.usuarioId.id || 0} onChange={(e) => onInputChange(e)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>
                            Nombre de la Clase
                        </label>
                        <input type='text' className='form-control' placeholder='Ingrese nombre de la clase' name='name' value={name} onChange={(e) => onInputChange(e)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Programa' className='form-label'>
                            Programa
                        </label>
                        <input type='text' className='form-control' placeholder='Ingrese el programa' name='programa' value={programa} onChange={(e) => onInputChange(e)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Grupo' className='form-label'>
                            Grupo
                        </label>
                        <input type='number' className='form-control' placeholder='Ingrese el grupo' name='grupo' value={grupo} onChange={(e) => onInputChange(e)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Sede' className='form-label'>
                            Sede
                        </label>
                        <input type='text' className='form-control' placeholder='Ingrese la sede' name='sede' value={sede} onChange={(e) => onInputChange(e)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='HorasSemanales' className='form-label'>
                            Horas Semanales
                        </label>
                        <input type='number' className='form-control' placeholder='Ingrese las horas semanales' name='horasSemanales' value={horasSemanales} onChange={(e) => onInputChange(e)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='HorasSemestre' className='form-label'>
                            Horas Semestre
                        </label>
                        <input type='number' className='form-control' placeholder='Ingrese las horas semestre' name='horasSemestre' value={horasSemestre} onChange={(e) => onInputChange(e)} />
                    </div>

                    <button type='submit' className='btn btn-outline-primary'>
                        Actualizar
                    </button>
                    <Link className='btn btn-outline-danger mx-2' to="/HomeClase">
                        Cancelar
                    </Link>
                </form>
            </div>
        </div>
    </div>
}