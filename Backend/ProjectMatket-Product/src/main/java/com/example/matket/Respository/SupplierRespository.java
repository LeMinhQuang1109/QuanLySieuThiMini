package com.example.matket.Respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.matket.Entity.Supplier;

@Repository
public interface SupplierRespository extends JpaRepository<Supplier,Integer> {
    
}
