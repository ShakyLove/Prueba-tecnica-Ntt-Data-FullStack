package com.example.prueba.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.prueba.models.ClienteModel;
import com.example.prueba.services.ClienteServices;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {
    
    @Autowired
    private ClienteServices clienteService;

    @GetMapping
    public ResponseEntity<?> consultarCliente(@RequestParam String tipoDocumento, @RequestParam String numeroDocumento) {
        if (tipoDocumento == null || numeroDocumento == null || 
            (!"C".equalsIgnoreCase(tipoDocumento) && !"P".equalsIgnoreCase(tipoDocumento))) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tipo de documento inválido.");
        }

        ClienteModel cliente = clienteService.obtenerCliente(tipoDocumento, numeroDocumento);
        if (cliente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente no encontrado.");
        }

        return ResponseEntity.ok(cliente);
    }
}
