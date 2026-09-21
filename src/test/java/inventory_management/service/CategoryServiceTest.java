package inventory_management.service;

import inventory_management.exception.CategoryNotEmptyException;
import inventory_management.model.Category;
import inventory_management.model.Product;
import inventory_management.repository.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryServiceImpl categoryService;

    @Test
    void deleteCategory_whenCategoryHasProducts_throwsConflictException() {
        Category category = new Category("Elektronik");
        category.setId(1L);
        Product product = new Product();
        category.setProducts(List.of(product));

        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));

        assertThrows(CategoryNotEmptyException.class, () -> categoryService.deleteCategory(1L));
    }
}}