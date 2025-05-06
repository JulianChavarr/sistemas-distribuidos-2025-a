package com.corhuila.AgendaManager.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "clase")
public class Clase extends ABaseEntity {

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "agenda_id", nullable = false)
    private Agenda agendaId;

    @Column(name = "name", nullable = false, length = 50)
    @NotBlank(message = "El nombre de la clase no puede estar vacío")
    @Size(max = 50, message = "El nombre de la clase no puede tener más de 50 caracteres")
    private String name;

    @Column(name = "programa", nullable = false, length = 50)
    @NotBlank(message = "El programa no puede estar vacío")
    @Size(max = 50, message = "El programa no puede tener más de 50 caracteres")
    private String programa;

    @Column(name = "grupo", nullable = false)
    @Min(value = 1, message = "El grupo debe ser al menos 1")
    private Integer grupo;

    @Column(name = "sede", nullable = false, length = 50)
    @NotBlank(message = "La sede no puede estar vacía")
    @Size(max = 50, message = "La sede no puede tener más de 50 caracteres")
    private String sede;

    @Column(name = "horas_semanales", nullable = false)
    @Min(value = 1, message = "Las horas semanales deben ser mayores a 0")
    private Integer horasSemanales;

    @Column(name = "horas_semestre", nullable = false)
    @Min(value = 1, message = "Las horas del semestre deben ser mayores a 0")
    private Integer horasSemestre;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrograma() {
        return programa;
    }

    public void setPrograma(String programa) {
        this.programa = programa;
    }

    public Integer getGrupo() {
        return grupo;
    }

    public void setGrupo(Integer grupo) {
        this.grupo = grupo;
    }

    public String getSede() {
        return sede;
    }

    public void setSede(String sede) {
        this.sede = sede;
    }

    public Integer getHorasSemanales() {
        return horasSemanales;
    }

    public void setHorasSemanales(Integer horasSemanales) {
        this.horasSemanales = horasSemanales;
    }

    public Integer getHorasSemestre() {
        return horasSemestre;
    }

    public void setHorasSemestre(Integer horasSemestre) {
        this.horasSemestre = horasSemestre;
    }

    public Agenda getAgendaId() {
        return agendaId;
    }

    public void setAgendaId(Agenda agendaId) {
        this.agendaId = agendaId;
    }
}