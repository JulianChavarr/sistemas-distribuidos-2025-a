import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function ViewClase() {

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

    const { id } = useParams();

    useEffect(() => {
        loadClase();
    }, []);

    const loadClase = async () => {
        const result = await axios.get(`http://localhost:8080/api/clase/${id}`);
        setClases(result.data.data);
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Detalles de la Clase</h2>
                    <div className='card'>
                        <div className='card-header'>
                            Detalles de la Clase ID #{id}:
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>Asignatura:</b>
                                    {clases.name}
                                </li>
                                <li className='list-group-item'>
                                    <b>Programa:</b>
                                    {clases.programa}
                                </li>
                                <li className='list-group-item'>
                                    <b>Grupo:</b>
                                    {clases.grupo}
                                </li>
                                <li className='list-group-item'>
                                    <b>Sede:</b>
                                    {clases.sede}
                                </li>
                                <li className='list-group-item'>
                                    <b>Horas Semanales:</b>
                                    {clases.horasSemanales}
                                </li>
                                <li className='list-group-item'>
                                    <b>Horas Semestre:</b>
                                    {clases.horasSemestre}
                                </li>
                                <li className='list-group-item'>
                                    <b>ID Agenda:</b>
                                    {clases.agendaId.id}
                                </li>
                                <li className='list-group-item'>
                                    <b>Agenda:</b>
                                    {clases.agendaId.name}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className='btn btn-primary my-2' to={"/HomeClase"}>Regresar</Link>
                </div>
            </div>
        </div>
    );
}