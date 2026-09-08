package inventory_management.dto;

import jakarta.validation.constraints.NotBlank;

public class CategoryRequest {

    @NotBlank(message = "Kategori adı boş olamaz")
    private String name;

    // Jackson'ın JSON'ı Java nesnesine çevirmesi için bu ŞART:
    public CategoryRequest() {
    }

    public CategoryRequest(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}