import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function ViewActividad() {

    const [actividades, setActividades] = useState({
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
        categoria: "",
        subCategoria: "",
        horasSemanales: 1,
        horasSemestre: 1,
        descripcion: "",
        producto: ""
    });

    const { id } = useParams();

    useEffect(() => {
        loadActividad();
    }, []);

    const loadActividad = async () => {
        const result = await axios.get(`http://54.165.104.165:8080/api/actividad/${id}`);
        setActividades(result.data.data);
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Detalles de la Actividad</h2>
                    <div className='card'>
                        <div className='card-header'>
                            Detalles de la Actividad ID #{id}:
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>Categoria:</b>
                                    {actividades.categoria}
                                </li>
                                <li className='list-group-item'>
                                    <b>Sub Categoria:</b>
                                    {actividades.subCategoria}
                                </li>
                                <li className='list-group-item'>
                                    <b>Horas Semanales:</b>
                                    {actividades.horasSemanales}
                                </li>
                                <li className='list-group-item'>
                                    <b>Horas Semestre:</b>
                                    {actividades.horasSemestre}
                                </li>
                                <li className='list-group-item'>
                                    <b>Descripcion:</b>
                                    {actividades.descripcion}
                                </li>
                                <li className='list-group-item'>
                                    <b>Producto:</b>
                                    {actividades.producto}
                                </li>
                                <li className='list-group-item'>
                                    <b>ID Agenda:</b>
                                    {actividades.agendaId.id}
                                </li>
                                <li className='list-group-item'>
                                    <b>Agenda:</b>
                                    {actividades.agendaId.name}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className='btn btn-primary my-2' to={"/HomeActividad"}>Regresar</Link>
                </div>
            </div>
        </div>
    );
}