package com.corhuila.AgendaManager.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "usuario")
public class Usuario extends ABaseEntity {

    @Column(name = "username", nullable = false, length = 20, unique = true)
    @NotBlank(message = "El nombre de usuario no puede estar vacío")
    @Size(max = 20, message = "El nombre de usuario no puede tener más de 20 caracteres")
    private String username;

    @Column(name = "name", nullable = false, length = 50, unique = true)
    @NotBlank(message = "El nombre no puede estar vacío")
    @Size(max = 50, message = "El nombre no puede tener más de 50 caracteres")
    @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$", message = "El nombre solo puede contener letras y espacios")
    private String name;

    @Column(name = "correo", nullable = false, unique = true)
    @NotBlank(message = "El correo no puede estar vacío")
    @Email(message = "El correo debe tener un formato válido")
    private String correo;

    @Column(name = "password", nullable = false)
    @NotBlank(message = "La contraseña no puede estar vacía")
    @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
    private String password;

    @Column(name = "rol", nullable = false, length = 20)
    @NotBlank(message = "El rol no puede estar vacío")
    @Pattern(regexp = "^(PROFESOR)$", message = "El rol debe ser PROFESOR")
    private String rol;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}