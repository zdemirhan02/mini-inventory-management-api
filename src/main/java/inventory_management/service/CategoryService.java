package inventory_management.service;

import inventory_management.dto.CategoryRequest;
import inventory_management.dto.CategoryResponse;
import inventory_management.exception.CategoryAlreadyExistsException;
import inventory_management.exception.CategoryNotEmptyException;
import inventory_management.exception.ResourceNotFoundException;
import inventory_management.model.Category;
import inventory_management.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(c -> new CategoryResponse(c.getId(), c.getName()))
                .collect(Collectors.toList());
    }

    public CategoryResponse getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kategori bulunamadı: " + id));
        return new CategoryResponse(category.getId(), category.getName());
    }

    public CategoryResponse createCategory(CategoryRequest request) {
        if (categoryRepository.existsByName(request.getName().trim())) {
            throw new CategoryAlreadyExistsException("Category with name '" + request.getName() + "' already exists.");
        }
        Category category = new Category(request.getName().trim());
        Category saved = categoryRepository.save(category);
        return new CategoryResponse(saved.getId(), saved.getName());
    }

    public CategoryResponse updateCategory(Long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kategori bulunamadı: " + id));

        // Güncellenen isim başka bir kategoriye aitse hata fırlat
        if (!category.getName().equalsIgnoreCase(request.getName().trim()) && categoryRepository.existsByName(request.getName().trim())) {
            throw new CategoryAlreadyExistsException("Category with name '" + request.getName() + "' already exists.");
        }

        category.setName(request.getName().trim());
        Category updated = categoryRepository.save(category);
        return new CategoryResponse(updated.getId(), updated.getName());
    }

    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kategori bulunamadı: " + id));

        if (category.getProducts() != null && !category.getProducts().isEmpty()) {
            throw new CategoryNotEmptyException("İçinde ürün bulunan kategori silinemez!");
        }

        categoryRepository.delete(category);
    }
}