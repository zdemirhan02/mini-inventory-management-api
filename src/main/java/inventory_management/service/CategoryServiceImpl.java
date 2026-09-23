package inventory_management.service;

import inventory_management.dto.CategoryRequest;
import inventory_management.dto.CategoryResponse;
import inventory_management.exception.CategoryAlreadyExistsException;
import inventory_management.exception.CategoryNotEmptyException;
import inventory_management.exception.ResourceNotFoundException;
import inventory_management.model.Category;
import inventory_management.repository.CategoryRepository;
import inventory_management.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Override
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponse getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kategori bulunamadı: " + id));
        return mapToResponse(category);
    }

    @Override
    @Transactional
    public CategoryResponse createCategory(CategoryRequest request) {
        if (categoryRepository.existsByName(request.getName())) {
            throw new CategoryAlreadyExistsException("Bu isimde bir kategori zaten mevcut: " + request.getName());
        }
        Category category = new Category();
        category.setName(request.getName());
        Category saved = categoryRepository.save(category);
        return mapToResponse(saved);
    }

    @Override
    @Transactional
    public CategoryResponse updateCategory(Long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kategori bulunamadı: " + id));

        if (!category.getName().equalsIgnoreCase(request.getName()) &&
                categoryRepository.existsByName(request.getName())) {
            throw new CategoryAlreadyExistsException("Bu isimde bir kategori zaten mevcut: " + request.getName());
        }

        category.setName(request.getName());
        Category updated = categoryRepository.save(category);
        return mapToResponse(updated);
    }

    @Override
    @Transactional
    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Kategori bulunamadı: " + id);
        }

        if (productRepository.existsByCategoryId(id)) {
            throw new CategoryNotEmptyException("İçinde ürün bulunan kategori silinemez.");
        }

        categoryRepository.deleteById(id);
    }

    private CategoryResponse mapToResponse(Category category) {
        return new CategoryResponse(category.getId(), category.getName());
    }
}