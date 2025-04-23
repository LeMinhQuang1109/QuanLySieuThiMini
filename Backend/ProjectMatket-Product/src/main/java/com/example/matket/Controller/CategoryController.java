package com.example.matket.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.matket.Entity.Category;
import com.example.matket.Service.CategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/product")
@CrossOrigin(origins = { "http://localhost:4200",
        "http://192.168.0.107:4200" }, allowedHeaders = "*", allowCredentials = "true", methods = {
                RequestMethod.GET, RequestMethod.POST,
                RequestMethod.PUT, RequestMethod.DELETE })
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/get/category")
    public ResponseEntity<List<Category>> getallCategory() {
        List<Category> categories = categoryService.getallCategory();
        return ResponseEntity.ok(categories);
    }

    //Thêm các phương thức GET/POST/PUT/DELETE

      // Lấy danh mục theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable("id") int id) {
        Category category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(category);
    }

    // Thêm mới danh mục
    @PostMapping("/savecategory")
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
        Category newCategory = categoryService.addCategory(category);
        return ResponseEntity.ok(newCategory);
    }

    // Sửa danh mục
    @PostMapping("updateccatetegory/{categoryId}")
    public ResponseEntity<Category> updateCategory(@PathVariable("categoryId") int id, @RequestBody Category categoryDetails) {
        Category updatedCategory = categoryService.updateCategory(id, categoryDetails);
        return ResponseEntity.ok(updatedCategory);
    }

    // Xóa danh mục
    @DeleteMapping("deletecategory/{id}")
    public ResponseEntity<Map<String, String>> deleteCategory(@PathVariable int id) {
        categoryService.deleteCategory(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Xóa thành công");
        return ResponseEntity.ok(response);
    }
}
