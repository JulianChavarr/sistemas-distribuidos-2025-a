import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function ViewAgenda() {

    const [agendas, setAgendas] = useState({
        status: true,
        codeAuth: true,
        usuarioId: {
            id: 0,
            status: true,
            codeAuth: true
        },
        name: "",
        fechaInicio: "",
        fechaFin: ""
    });

    const { id } = useParams();

    useEffect(() => {
        loadAgenda();
    }, []);

    const loadAgenda = async () => {
        const result = await axios.get(`http://localhost:8080/api/agenda/${id}`);
        setAgendas(result.data.data);
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Detalles de la Agenda</h2>
                    <div className='card'>
                        <div className='card-header'>
                            Detalles de la Agenda ID #{id}:
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>Nombre:</b>
                                    {agendas.name}
                                </li>
                                <li className='list-group-item'>
                                    <b>Creación:</b>
                                    {agendas.fechaInicio}
                                </li>
                                <li className='list-group-item'>
                                    <b>Finalización:</b>
                                    {agendas.fechaFin}
                                </li>
                                <li className='list-group-item'>
                                    <b>ID Usuario:</b>
                                    {agendas.usuarioId.id}
                                </li>
                                <li className='list-group-item'>
                                    <b>Usuario:</b>
                                    {agendas.usuarioId.name}
                                </li>
                                <li className='list-group-item'>
                                    <b>Rol:</b>
                                    {agendas.usuarioId.rol}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className='btn btn-primary my-2' to={"/HomeAgenda"}>Regresar</Link>
                </div>
            </div>
        </div>
    );
}
