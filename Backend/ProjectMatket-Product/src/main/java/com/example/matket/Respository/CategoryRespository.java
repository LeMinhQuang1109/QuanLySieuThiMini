package com.example.matket.Respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.matket.Entity.Category;

public interface CategoryRespository extends JpaRepository<Category, Integer> {

}
