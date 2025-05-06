package com.corhuila.AgendaManager.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

@Entity
@Table(name = "agenda")
public class Agenda extends ABaseEntity {

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuarioId;

    @Column(name = "name", nullable = false, length = 20)
    @NotBlank(message = "El nombre de la agenda no puede estar vacío")
    @Size(max = 20, message = "El nombre de la agenda no puede tener más de 20 caracteres")
    private String name;

    @Column(name = "facultad", nullable = false, length = 50)
    @NotBlank(message = "La facultad no puede estar vacía")
    @Size(max = 50, message = "La facultad no puede tener más de 50 caracteres")
    private String facultad;

    @Column(name = "programa", nullable = false, length = 50)
    @NotBlank(message = "El programa no puede estar vacío")
    @Size(max = 50, message = "El programa no puede tener más de 50 caracteres")
    private String programa;

    @Column(name = "periodo", nullable = false, length = 50)
    @NotBlank(message = "El periodo no puede estar vacío")
    @Size(max = 50, message = "El periodo no puede tener más de 50 caracteres")
    private String periodo;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin", nullable = false)
    private LocalDate fechaFin;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFacultad() {
        return facultad;
    }

    public void setFacultad(String facultad) {
        this.facultad = facultad;
    }

    public String getPrograma() {
        return programa;
    }

    public void setPrograma(String programa) {
        this.programa = programa;
    }

    public String getPeriodo() {
        return periodo;
    }

    public void setPeriodo(String periodo) {
        this.periodo = periodo;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public Usuario getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Usuario usuarioId) {
        this.usuarioId = usuarioId;
    }
}