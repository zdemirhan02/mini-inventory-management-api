package inventory_management.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CategoryRequest {

    @NotBlank(message = "Kategori adı boş olamaz")
    private String name;

    @Size(max = 500, message = "Kategori açıklaması en fazla 500 karakter olabilir")
    private String description;

    public CategoryRequest() {
    }

    public CategoryRequest(String name) {
        this.name = name;
    }

    public CategoryRequest(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}