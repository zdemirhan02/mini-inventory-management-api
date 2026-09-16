package inventory_management.service;

import inventory_management.dto.CategoryRequest;
import inventory_management.dto.CategoryResponse;
import inventory_management.exception.CategoryAlreadyExistsException;
import inventory_management.model.Category;
import inventory_management.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryService categoryService;

    private Category category;
    private CategoryRequest categoryRequest;

    @BeforeEach
    void setUp() {
        category = new Category("Elektronik");
        categoryRequest = new CategoryRequest("Elektronik");
    }

    @Test
    void createCategory_Success() {
        when(categoryRepository.existsByName("Elektronik")).thenReturn(false);
        when(categoryRepository.save(any(Category.class))).thenReturn(category);

        CategoryResponse response = categoryService.createCategory(categoryRequest);

        assertNotNull(response);
        assertEquals("Elektronik", response.getName());
        verify(categoryRepository, times(1)).save(any(Category.class));
    }

    @Test
    void createCategory_ThrowsCategoryAlreadyExistsException() {
        when(categoryRepository.existsByName("Elektronik")).thenReturn(true);

        assertThrows(CategoryAlreadyExistsException.class, () -> {
            categoryService.createCategory(categoryRequest);
        });

        verify(categoryRepository, never()).save(any(Category.class));
    }
}