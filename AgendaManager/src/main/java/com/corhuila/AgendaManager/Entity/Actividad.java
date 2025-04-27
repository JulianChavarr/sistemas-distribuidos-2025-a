package com.corhuila.AgendaManager.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "actividad")
public class Actividad extends ABaseEntity {

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "agenda_id", nullable = false, unique = true)
    private Agenda agendaId;

    @Column(name = "name", nullable = false , length = 20, unique = true)
    private String name;

    @Column(name = "descripcion", nullable = false , length = 100)
    private String descripcion;

    @Column(name = "fechaActividad", nullable = false)
    private String fechaActividad;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getFechaActividad() {
        return fechaActividad;
    }

    public void setFechaActividad(String fechaActividad) {
        this.fechaActividad = fechaActividad;
    }
    
    public Agenda getAgendaId() {
        return agendaId;
    }

    public void setAgendaId(Agenda agendaId) {
        this.agendaId = agendaId;
    }
}