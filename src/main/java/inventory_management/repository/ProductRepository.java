package inventory_management.repository;

import inventory_management.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @EntityGraph(attributePaths = {"category"})
    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);

    @EntityGraph(attributePaths = {"category"})
    List<Product> findByStockQuantityGreaterThan(Integer stockQuantity);

    @EntityGraph(attributePaths = {"category"})
    List<Product> findByCategoryId(Long categoryId);

    // Kategori silinirken N+1 yapmadan hızlı stok/ürün varlık kontrolü için:
    boolean existsByCategoryId(Long categoryId);
}