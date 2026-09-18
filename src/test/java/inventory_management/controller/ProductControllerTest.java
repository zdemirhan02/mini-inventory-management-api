package inventory_management.controller;

import inventory_management.dto.ProductRequest;
import inventory_management.dto.ProductResponse;
import inventory_management.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductControllerTest {

    @Mock
    private ProductService productService;

    @InjectMocks
    private ProductController productController;

    private ProductResponse productResponse;
    private ProductRequest productRequest;

    @BeforeEach
    void setUp() {
        productResponse = new ProductResponse(1L, "Laptop", "High performance laptop", 1500.0, 10, 1L, "Electronics");
        productRequest = new ProductRequest("Laptop", "High performance laptop", 1500.0, 10, 1L);
    }

    @Test
    void getProductById_Success() {
        when(productService.getProductById(1L)).thenReturn(productResponse);

        ResponseEntity<ProductResponse> response = productController.getProductById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Laptop", response.getBody().getName());
    }

    @Test
    void createProduct_Success() {
        when(productService.createProduct(any(ProductRequest.class))).thenReturn(productResponse);

        ResponseEntity<ProductResponse> response = productController.createProduct(productRequest);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Laptop", response.getBody().getName());
    }
}