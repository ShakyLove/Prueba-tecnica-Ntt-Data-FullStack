package com.example.prueba.models;

public class ClienteModel {
    private String primerNombre;
    private String segundoNombre;
    private String primerApellido;
    private String segundoApellido;
    private String telefono;
    private String direccion;
    private String ciudadResidencia;

    public ClienteModel(String primerNombre, String segundoNombre, String primerApellido, 
                   String segundoApellido, String telefono, String direccion, String ciudadResidencia) {
        this.primerNombre = primerNombre;
        this.segundoNombre = segundoNombre;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.telefono = telefono;
        this.direccion = direccion;
        this.ciudadResidencia = ciudadResidencia;
    }

    public String getPrimerNombre() {
        return primerNombre;
    }
    public String getSegundoNombre() {
        return segundoNombre;
    }
    public String getPrimerApellido() {
        return primerApellido;
    }
    public String getSegundoApellido() {
        return segundoApellido;
    }
    public String getTelefono() {
        return telefono;
    }
    public String getDireccion() {
        return direccion;
    }
    public String getCiudadResidencia() {
        return ciudadResidencia;
    }
}
