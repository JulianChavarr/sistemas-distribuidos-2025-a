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
        } else if (name === "usuarioId") {
            const parsedValue = parseInt(value, 10);
            setActividades({
                ...actividades,
                agendaId: {
                    ...actividades.agendaId,
                    usuarioId: {
                        ...actividades.agendaId.usuarioId,
                        id: isNaN(parsedValue) ? 0 : parsedValue,
                    },
                },
            });
        } else {
            setActividades({ ...actividades, [name]: value });
        }
    }

    useEffect(() => {

        loadActividad();

    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos enviados:", actividades); // Verifica los datos
        try {
            await axios.put(`http://54.165.104.165:8080/api/actividad/${id}`, actividades);
            navigate("/HomeActividad");
        } catch (error) {
            console.error("Error al actualizar la actividad:", error);
        }
    }

    const loadActividad = async () => {
        console.log("ID enviado:", id); // Verifica el ID
        try {
            const result = await axios.get(`http://54.165.104.165:8080/api/actividad/${id}`);
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
                        <label htmlFor='Categoria' className='form-label'>
                            Usuario Id
                        </label>
                        <input type='number' className='form-control' placeholder='Ingrese su id de usuario' name='usuarioId' value={agendaId.usuarioId.id || 0} onChange={(e) => onInputChange(e)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Categoria' className='form-label'>
                            Categoria
                        </label>
                        <input type='text' className='form-control' placeholder='Ingrese su categoria' name='categoria' value={categoria} onChange={(e) => onInputChange(e)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='SubCategoria' className='form-label'>
                            Sub Categoria
                        </label>
                        <input type='text' className='form-control' placeholder='Ingrese su sub categoria' name='subCategoria' value={subCategoria} onChange={(e) => onInputChange(e)} />
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
                    <div className='mb-3'>
                        <label htmlFor='Descripcion' className='form-label'>
                            Descripcion
                        </label>
                        <input type='text' className='form-control' placeholder='Ingrese la descripcion' name='descripcion' value={descripcion} onChange={(e) => onInputChange(e)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Producto' className='form-label'>
                            Producto
                        </label>
                        <input type='text' className='form-control' placeholder='Ingrese el producto' name='producto' value={producto} onChange={(e) => onInputChange(e)} />
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