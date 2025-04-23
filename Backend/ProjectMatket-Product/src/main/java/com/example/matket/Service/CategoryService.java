package com.example.matket.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.matket.Entity.Category;
import com.example.matket.Respository.CategoryRespository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRespository categoryRespository;

    // Thêm danh mục mới
    public Category addCategory(Category category) {
        if (category.getCategoryName() == null || category.getCategoryName().isEmpty()) {
            throw new RuntimeException("Tên danh mục không được để trống.");
        }
        return categoryRespository.save(category);
    }

    // Sửa danh mục
    public Category updateCategory(int categoryId, Category categoryDetails) {
        Category existingCategory = categoryRespository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục với ID: " + categoryId));
        
        existingCategory.setCategoryName(categoryDetails.getCategoryName());
        existingCategory.setDescription(categoryDetails.getDescription());
        
        return categoryRespository.save(existingCategory);
    }

    // Xóa danh mục
    public void deleteCategory(int categoryId) {
        Category existingCategory = categoryRespository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục với ID: " + categoryId));
        categoryRespository.delete(existingCategory);
    }

    // Lấy danh sách tất cả danh mục
    public List<Category> getallCategory() {
        return categoryRespository.findAll();
    }

    // Lấy thông tin danh mục theo ID
    public Category getCategoryById(int categoryId) {
        return categoryRespository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục với ID: " + categoryId));
    }

    
}
