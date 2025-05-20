import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

// Mueve ExportarExcel FUERA del componente principal
function ExportarExcel({ nombreArchivo, setNombreArchivo, clases, actividades }) {
    const handleExport = async () => {
        const response = await fetch('/Plantilla_Agenda.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(arrayBuffer);
        const worksheet = workbook.getWorksheet(1);

        worksheet.getCell('C2').value = clases[0]?.agendaId.name || '';
        worksheet.getCell('E4').value = `VIGENCIA: ${clases[0]?.agendaId.fechaInicio || ''}`;
        worksheet.getCell('C6').value = clases[0]?.agendaId.usuarioId.name || '';
        worksheet.getCell('B7').value = clases[0]?.agendaId.facultad || '';
        worksheet.getCell('F7').value = clases[0]?.agendaId.programa || '';
        worksheet.getCell('B8').value = clases[0]?.agendaId.fechaFin || '';
        worksheet.getCell('F8').value = clases[0]?.agendaId.periodo || '';

        // Agregar Clases
        const startRowClases = 14;
        const maxClases = 24;

        clases.slice(0, maxClases).forEach((clase, idx) => {
            const row = startRowClases + idx;
            worksheet.getCell(`A${row}`).value = clase?.name || '';
            worksheet.getCell(`C${row}`).value = clase?.programa || '';
            worksheet.getCell(`D${row}`).value = clase?.grupo || '';
            worksheet.getCell(`E${row}`).value = clase?.sede || '';
            worksheet.getCell(`F${row}`).value = clase?.horasSemanales || '';
            worksheet.getCell(`H${row}`).value = clase?.horasSemestre || '';
        });


        // Agregar Actividades
        const startRowActividadesAcadémicas = 29;
        const maxActividadesAcadémicas = 33;

        let actividadRowAcadémicas = startRowActividadesAcadémicas;
        actividades.slice(0, maxActividadesAcadémicas).forEach((actividad) => {
            if (actividad?.categoria === 'ACADÉMICAS') {
                worksheet.getCell(`A${actividadRowAcadémicas}`).value = actividad?.subCategoria || '';
                worksheet.getCell(`D${actividadRowAcadémicas}`).value = actividad?.horasSemanales || '';
                worksheet.getCell(`E${actividadRowAcadémicas}`).value = actividad?.horasSemestre || '';
                worksheet.getCell(`F${actividadRowAcadémicas}`).value = actividad?.descripcion || '';
                worksheet.getCell(`H${actividadRowAcadémicas}`).value = actividad?.producto || '';
                actividadRowAcadémicas++; // Solo avanza si se insertó una actividad válida
            }
        });

        const startRowActividadesFormativas = 35;
        const maxActividadesFormativas = 39;

        let actividadRowFormativas = startRowActividadesFormativas;
        actividades.slice(0, maxActividadesFormativas).forEach((actividad) => {
            if (actividad?.categoria === 'FORMATIVAS') {
                worksheet.getCell(`A${actividadRowFormativas}`).value = actividad?.subCategoria || '';
                worksheet.getCell(`D${actividadRowFormativas}`).value = actividad?.horasSemanales || '';
                worksheet.getCell(`E${actividadRowFormativas}`).value = actividad?.horasSemestre || '';
                worksheet.getCell(`F${actividadRowFormativas}`).value = actividad?.descripcion || '';
                worksheet.getCell(`H${actividadRowFormativas}`).value = actividad?.producto || '';
                actividadRowFormativas++; // Solo avanza si se insertó una actividad válida
            }
        });

        const startRowActividadesCientíficas = 44;
        const maxActividadesCientíficas = 48;

        let actividadRowCientíficas = startRowActividadesCientíficas;
        actividades.slice(0, maxActividadesCientíficas).forEach((actividad) => {
            if (actividad?.categoria === 'CIENTÍFICAS') {
                worksheet.getCell(`A${actividadRowCientíficas}`).value = actividad?.subCategoria || '';
                worksheet.getCell(`D${actividadRowCientíficas}`).value = actividad?.horasSemanales || '';
                worksheet.getCell(`E${actividadRowCientíficas}`).value = actividad?.horasSemestre || '';
                worksheet.getCell(`F${actividadRowCientíficas}`).value = actividad?.descripcion || '';
                worksheet.getCell(`H${actividadRowCientíficas}`).value = actividad?.producto || '';
                actividadRowCientíficas++; // Solo avanza si se insertó una actividad válida
            }
        });

        const startRowActividadesExtensión = 54;
        const maxActividadesExtensión = 58;

        let actividadRowExtensión = startRowActividadesExtensión;
        actividades.slice(0, maxActividadesExtensión).forEach((actividad) => {
            if (actividad?.categoria === 'EXTENSIÓN') {
                worksheet.getCell(`A${actividadRowExtensión}`).value = actividad?.subCategoria || '';
                worksheet.getCell(`D${actividadRowExtensión}`).value = actividad?.horasSemanales || '';
                worksheet.getCell(`E${actividadRowExtensión}`).value = actividad?.horasSemestre || '';
                worksheet.getCell(`F${actividadRowExtensión}`).value = actividad?.descripcion || '';
                worksheet.getCell(`H${actividadRowExtensión}`).value = actividad?.producto || '';
                actividadRowExtensión++; // Solo avanza si se insertó una actividad válida
            }
        });

        const startRowActividadesCulturales = 60;
        const maxActividadesCulturales = 64;

        let actividadRowCulturales = startRowActividadesCulturales;
        actividades.slice(0, maxActividadesCulturales).forEach((actividad) => {
            if (actividad?.categoria === 'CULTURALES') {
                worksheet.getCell(`A${actividadRowCulturales}`).value = actividad?.subCategoria || '';
                worksheet.getCell(`D${actividadRowCulturales}`).value = actividad?.horasSemanales || '';
                worksheet.getCell(`E${actividadRowCulturales}`).value = actividad?.horasSemestre || '';
                worksheet.getCell(`F${actividadRowCulturales}`).value = actividad?.descripcion || '';
                worksheet.getCell(`H${actividadRowCulturales}`).value = actividad?.producto || '';
                actividadRowCulturales++; // Solo avanza si se insertó una actividad válida
            }
        });

        const startRowActividadesAdministrativa = 70;
        const maxActividadesAdministrativa = 79;

        let actividadRowAdministrativa = startRowActividadesAdministrativa;
        actividades.slice(0, maxActividadesAdministrativa).forEach((actividad) => {
            if (actividad?.categoria === 'ADMINISTRATIVA') {
                worksheet.getCell(`A${actividadRowAdministrativa}`).value = actividad?.subCategoria || '';
                worksheet.getCell(`D${actividadRowAdministrativa}`).value = actividad?.horasSemanales || '';
                worksheet.getCell(`E${actividadRowAdministrativa}`).value = actividad?.horasSemestre || '';
                worksheet.getCell(`F${actividadRowAdministrativa}`).value = actividad?.descripcion || '';
                worksheet.getCell(`H${actividadRowAdministrativa}`).value = actividad?.producto || '';
                actividadRowAdministrativa++; // Solo avanza si se insertó una actividad válida
            }
        });

        const buffer = await workbook.xlsx.writeBuffer();
        // Usa el nombre del archivo ingresado, asegurando extensión .xlsx
        let nombreFinal = nombreArchivo.trim();
        if (!nombreFinal.toLowerCase().endsWith('.xlsx')) {
            nombreFinal += '.xlsx';
        }
        saveAs(new Blob([buffer]), nombreFinal);
    };

    return (
        <div className="d-flex align-items-center mb-2">
            <input
                type="text"
                className="form-control me-2"
                style={{ maxWidth: 250 }}
                value={nombreArchivo}
                onChange={e => setNombreArchivo(e.target.value)}
                placeholder="Nombre del archivo"
            />
            <button className="btn btn-success" onClick={handleExport}>
                <i className="fas fa-file-excel"></i> Exportar Excel
            </button>
        </div>
    );
}

export default function HomeFormulario() {
    // Estado para el nombre del archivo
    const [nombreArchivo, setNombreArchivo] = useState('Agenda_Completada.xlsx');

    const navigate = useNavigate();
    const { id } = useParams(); // Obtén el id del usuario y el id de la agenda desde la URL

    // Estados y funciones para HomeClase
    const [clases, setClases] = useState([]);
    const loadClases = useCallback(async () => {
        try {
            const result = await axios.get("http://54.165.104.165:8080/api/clase");
            if (Array.isArray(result.data.data)) {
                // Filtrar clases por usuarioId y agendaId
                const filteredClases = result.data.data.filter(clase => clase.agendaId.id === parseInt(id, 10));
                setClases(filteredClases);
                console.log(filteredClases);
            } else {
                console.error("API did not return an array:", result.data);
                setClases([]); // Fallback to an empty array
            }
        } catch (error) {
            console.error("Error fetching classes:", error);
            setClases([]); // Fallback to an empty array in case of error
        }
    }, [id]);
    const deleteClases = async (claseId) => {
        try {
            await axios.delete(`http://54.165.104.165:8080/api/clase/${claseId}`);
            loadClases();
        } catch (error) {
            console.error("Error al eliminar la clase:", error);
        }
    };

    // Estados y funciones para HomeActividad
    const [actividades, setActividades] = useState([]);
    const loadActividades = useCallback(async () => {
        try {
            const result = await axios.get("http://54.165.104.165:8080/api/actividad");
            if (Array.isArray(result.data.data)) {
                // Filtrar actividades por usuarioId y agendaId
                const filteredActividades = result.data.data.filter(actividad => actividad.agendaId.id === parseInt(id, 10));
                setActividades(filteredActividades);
                console.log(filteredActividades);
            } else {
                console.error("API did not return an array:", result.data);
                setActividades([]); // Fallback to an empty array
            }
        } catch (error) {
            console.error("Error fetching activities:", error);
            setActividades([]); // Fallback to an empty array in case of error
        }
    }, [id]);
    const deleteActividades = async (actividadId) => {
        try {
            await axios.delete(`http://54.165.104.165:8080/api/actividad/${actividadId}`);
            loadActividades();
        } catch (error) {
            console.error("Error al eliminar la actividad:", error);
        }
    };

    useEffect(() => {
        loadClases();
        loadActividades();
    }, [id, loadClases, loadActividades]); // Ejecuta las funciones cuando cambien el id del usuario o el id de la agenda

    return (
        <div className="container">
            <div className="d-flex justify-content-end mt-4 mb-2">
                <ExportarExcel
                    nombreArchivo={nombreArchivo}
                    setNombreArchivo={setNombreArchivo}
                    clases={clases}
                    actividades={actividades}
                />
            </div>
            {/* Tabla de Clases */}
            <div className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3 py-3">
                    <h2 className="mb-0" style={{ color: '#212529', fontWeight: 'bold' }}>
                        <i className="fas fa-chalkboard"></i> Clases
                    </h2>
                    <div>
                        {/* Botón Nueva Clase */}
                        <Link className="btn btn-success me-2" to={`/AddClase/${id}`}>
                            <i className="fas fa-chalkboard-teacher"></i> Nueva Clase
                        </Link>
                        {/* Botón Volver */}
                        <button
                            type='button'
                            className='btn btn-primary mx-2'
                            onClick={() => navigate(`/HomeAgenda/${actividades[0]?.agendaId?.usuarioId?.id || id}`)} // Redirige a HomeAgenda con el id del usuario
                        >
                            <i className="fas fa-arrow-circle-left"></i> Volver
                        </button>
                    </div>
                </div>
                <table className="table table-hover border shadow">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Asignatura</th>
                            <th scope="col">Programa</th>
                            <th scope="col">Grupo</th>
                            <th scope="col">Sede</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clases.map((clase, index) => (
                            <tr key={clase.id || index}>
                                <th scope="row">{index + 1}</th>
                                <td>{clase.id}</td>
                                <td>{clase.name}</td>
                                <td>{clase.programa}</td>
                                <td>{clase.grupo}</td>
                                <td>{clase.sede}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <Link className="btn btn-outline-primary btn-sm mx-1" to={`/ViewClase/${clase.id}`}>
                                        <i className="fas fa-eye"></i> Ver
                                    </Link>
                                    <Link className="btn btn-outline-warning btn-sm mx-1" to={`/EditClase/${clase.id}`}>
                                        <i className="fas fa-edit"></i> Editar
                                    </Link>
                                    <button
                                        className="btn btn-outline-danger btn-sm mx-1"
                                        onClick={() => deleteClases(clase.id)}
                                    >
                                        <i className="fas fa-trash-alt"></i> Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Tabla de Actividades */}
            <div>
                <div className="d-flex justify-content-between align-items-center mb-3 py-3">
                    <h2 className="mb-0" style={{ color: '#212529', fontWeight: 'bold' }}>
                        <i className="fas fa-tasks"></i> Actividades
                    </h2>
                    <div>
                        {/* Botón Nueva Actividad */}
                        <Link className="btn btn-info me-2" to={`/AddActividad/${id}`}>
                            <i className="fas fa-tasks"></i> Nueva Actividad
                        </Link>
                    </div>
                </div>
                <table className="table table-hover border shadow">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Subcategoría</th>
                            <th scope="col">Horas Semanales</th>
                            <th scope="col">Horas Semestre</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {actividades.map((actividad, index) => (
                            <tr key={actividad.id || index}>
                                <th scope="row">{index + 1}</th>
                                <td>{actividad.id}</td>
                                <td>{actividad.categoria}</td>
                                <td>{actividad.subCategoria}</td>
                                <td>{actividad.horasSemanales}</td>
                                <td>{actividad.horasSemestre}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <Link className="btn btn-outline-primary btn-sm mx-1" to={`/ViewActividad/${actividad.id}`}>
                                        <i className="fas fa-eye"></i> Ver
                                    </Link>
                                    <Link className="btn btn-outline-warning btn-sm mx-1" to={`/EditActividad/${actividad.id}`}>
                                        <i className="fas fa-edit"></i> Editar
                                    </Link>
                                    <button
                                        className="btn btn-outline-danger btn-sm mx-1"
                                        onClick={() => deleteActividades(actividad.id)}
                                    >
                                        <i className="fas fa-trash-alt"></i> Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}