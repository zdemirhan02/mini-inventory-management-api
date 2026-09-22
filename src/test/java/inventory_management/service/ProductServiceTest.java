package inventory_management.service;

import inventory_management.dto.ProductRequest;
import inventory_management.dto.ProductResponse;
import inventory_management.exception.ResourceNotFoundException;
import inventory_management.model.Category;
import inventory_management.model.Product;
import inventory_management.repository.CategoryRepository;
import inventory_management.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private ProductServiceImpl productService;

    private Category category;
    private Product product;

    @BeforeEach
    void setUp() {
        category = new Category();
        category.setId(1L);
        category.setName("Elektronik");

        product = new Product("Laptop", "İş laptopu", new BigDecimal("15000.00"), 10, category);
        product.setId(1L);
    }

    @Test
    void getProductById_Success() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        ProductResponse response = productService.getProductById(1L);

        assertNotNull(response);
        assertEquals("Laptop", response.getName());
        verify(productRepository, times(1)).findById(1L);
    }

    @Test
    void getProductById_NotFound_ThrowsException() {
        when(productRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> productService.getProductById(1L));
        verify(productRepository, times(1)).findById(1L);
    }

    @Test
    void createProduct_Success() {
        ProductRequest request = new ProductRequest("Laptop", "İş laptopu", new BigDecimal("15000.00"), 10, 1L);

        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(productRepository.save(any(Product.class))).thenReturn(product);

        ProductResponse response = productService.createProduct(request);

        assertNotNull(response);
        assertEquals("Laptop", response.getName());
        verify(productRepository, times(1)).save(any(Product.class));
    }
}