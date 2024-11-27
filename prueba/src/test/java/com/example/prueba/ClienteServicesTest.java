package com.example.prueba;
import org.junit.jupiter.api.Test;

import com.example.prueba.models.ClienteModel;
import com.example.prueba.services.ClienteServices;

import static org.junit.jupiter.api.Assertions.*;

class ClienteServicesTest {

    private final ClienteServices clienteServices = new ClienteServices();

    @Test
    // Verifica que el metodo devuelve un cliente valido
    void shouldReturnClienteWhenValidRequest() {
        String tipoDocumento = "C";
        String numeroDocumento = "23445322";

        ClienteModel cliente = clienteServices.obtenerCliente(tipoDocumento, numeroDocumento);

        assertNotNull(cliente);
        assertEquals("Ana", cliente.getPrimerNombre());
        assertEquals("Gabriela", cliente.getSegundoNombre());
        assertEquals("Pérez", cliente.getPrimerApellido());
        assertEquals("Gómez", cliente.getSegundoApellido());
        assertEquals("3216549870", cliente.getTelefono());
        assertEquals("Calle 123 #45-67", cliente.getDireccion());
        assertEquals("Bogotá", cliente.getCiudadResidencia());
    }

    @Test
    // Verifica que el metodo devuelve null cuando el número de documento no coincide
    void shouldReturnNullWhenInvalidRequest() {
        String tipoDocumento = "C";
        String numeroDocumento = "11111111";

        ClienteModel cliente = clienteServices.obtenerCliente(tipoDocumento, numeroDocumento);

        assertNull(cliente);
    }

    @Test
    // Verifica que el metodo devuelve null cuando el tipo de documento no es válido
    void shouldReturnNullForInvalidTipoDocumento() {
        String tipoDocumento = "X";
        String numeroDocumento = "23445322";

        ClienteModel cliente = clienteServices.obtenerCliente(tipoDocumento, numeroDocumento);

        assertNull(cliente);
    }
}
