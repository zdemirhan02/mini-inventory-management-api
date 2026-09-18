package inventory_management.service;

import inventory_management.dto.ProductRequest;
import inventory_management.dto.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    Page<ProductResponse> getAllProductsPaged(String name, Long categoryId, Integer minStock, Integer maxStock, Pageable pageable);
    List<ProductResponse> getAllProducts();
    ProductResponse getProductById(Long id);
    List<ProductResponse> getProductsByCategoryId(Long categoryId);
    ProductResponse createProduct(ProductRequest request);
    ProductResponse updateProduct(Long id, ProductRequest request);
    void deleteProduct(Long id);
}