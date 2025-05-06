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
@Table(name = "actividad")
public class Actividad extends ABaseEntity {

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "agenda_id", nullable = false)
    private Agenda agendaId;

    @Column(name = "categoria", nullable = false, length = 50)
    @NotBlank(message = "La categoría no puede estar vacía")
    @Size(max = 50, message = "La categoría no puede tener más de 50 caracteres")
    private String categoria;

    @Column(name = "sub_categoria", nullable = false, length = 50)
    @NotBlank(message = "La subcategoría no puede estar vacía")
    @Size(max = 50, message = "La subcategoría no puede tener más de 50 caracteres")
    private String subCategoria;

    @Column(name = "horas_semanales", nullable = false)
    @Min(value = 1, message = "Las horas semanales deben ser mayores a 0")
    private Integer horasSemanales;

    @Column(name = "horas_semestre", nullable = false)
    @Min(value = 1, message = "Las horas del semestre deben ser mayores a 0")
    private Integer horasSemestre;

    @Column(name = "descripcion", nullable = false, length = 255)
    @NotBlank(message = "La descripción no puede estar vacía")
    @Size(max = 255, message = "La descripción no puede tener más de 255 caracteres")
    private String descripcion;

    @Column(name = "producto", nullable = false, length = 255)
    @NotBlank(message = "El producto no puede estar vacío")
    @Size(max = 255, message = "El producto no puede tener más de 255 caracteres")
    private String producto;

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getSubCategoria() {
        return subCategoria;
    }

    public void setSubCategoria(String subCategoria) {
        this.subCategoria = subCategoria;
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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getProducto() {
        return producto;
    }

    public void setProducto(String producto) {
        this.producto = producto;
    }

    public Agenda getAgendaId() {
        return agendaId;
    }

    public void setAgendaId(Agenda agendaId) {
        this.agendaId = agendaId;
    }
}