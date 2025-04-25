package com.corhuila.AgendaManager.DTO;
public class ApiResponseDTO<T> {
    private Boolean status;
    private T data;
    private String message;
    public ApiResponseDTO() {
    }
    public ApiResponseDTO(String message, T data, Boolean status) {
        this.message = message;
        this.data = data;
        this.status = status;
    }
    public Boolean getStatus() {
        return status;
    }
    public void setStatus(Boolean status) {
        this.status = status;
    }
    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
}