package com.example.matket.Respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.matket.Entity.Product;

import java.util.List;

public interface ProductRespository extends JpaRepository<Product, Integer> {
    List<Product> findByCategory_CategoryId(Integer categoryId);

    List<Product> findByProductNameAndCategory_CategoryId(String productName, Integer categoryId);

    List<Product> findByProductName(String productName);
}
