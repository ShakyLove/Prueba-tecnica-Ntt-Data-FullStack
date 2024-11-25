package com.example.prueba.services;

import org.springframework.stereotype.Service;
import com.example.prueba.models.ClienteModel;

@Service
public class ClienteServices {
    public ClienteModel obtenerCliente(String tipoDocumento, String numeroDocumento) {
        if ("C".equalsIgnoreCase(tipoDocumento) && "23445322".equals(numeroDocumento)) {
            return new ClienteModel("Ana", "Gabriela", "Pérez", "Gómez", "3216549870", 
                                "Calle 123 #45-67", "Bogotá");
        }
        return null;
    }
}
