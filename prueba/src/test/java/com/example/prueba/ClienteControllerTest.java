package com.example.prueba;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.prueba.controllers.ClienteController;
import com.example.prueba.models.ClienteModel;
import com.example.prueba.services.ClienteServices;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ClienteControllerTest {

    @InjectMocks
    private ClienteController clienteController;

    @Mock
    private ClienteServices clienteService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    // Verifica que el controlador devuelva un cliente valido con HTTP 200
    void shouldReturnClienteWhenValidRequest() {
        String tipoDocumento = "C";
        String numeroDocumento = "23445322";
        ClienteModel mockCliente = new ClienteModel(
                "Ana", "Gabriela", "Pérez", "Gómez",
                "3216549870", "Calle 123 #45-67", "Bogotá"
        );

        when(clienteService.obtenerCliente(tipoDocumento, numeroDocumento)).thenReturn(mockCliente);

        ResponseEntity<?> response = clienteController.consultarCliente(tipoDocumento, numeroDocumento);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(mockCliente, response.getBody());
    }

    @Test
    // Verifica que el controlador devuelva un error 400 para un tipo de documento invalido
    void shouldReturnBadRequestForInvalidTipoDocumento() {
        ResponseEntity<?> response = clienteController.consultarCliente("X", "12345678");


        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Tipo de documento inválido.", response.getBody());
    }

    @Test
    // Verifica que el controlador devuelva un error 404 cuando no se encuentra el cliente
    void shouldReturnNotFoundWhenClienteNotExists() {
        String tipoDocumento = "C";
        String numeroDocumento = "11111111";

        when(clienteService.obtenerCliente(tipoDocumento, numeroDocumento)).thenReturn(null);
        ResponseEntity<?> response = clienteController.consultarCliente(tipoDocumento, numeroDocumento);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Cliente no encontrado.", response.getBody());
    }
}
