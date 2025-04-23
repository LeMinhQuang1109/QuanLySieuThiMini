package com.example.matket.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.matket.Entity.Supplier;
import com.example.matket.Respository.SupplierRespository;

@Service
public class SupplierService {
    @Autowired
    SupplierRespository supplierRespository;

    // Lấy danh sách tất cả nhà phân phối
    public List<Supplier> getAllSupplier() {
        return supplierRespository.findAll();
    }

    // Thêm mới nhà phân phối
    public Supplier addSupplier(Supplier supplier) {
        return supplierRespository.save(supplier);
    }

    // Cập nhật nhà phân phối
    public Supplier updateSupplier(int id, Supplier supplierDetails) {
        Optional<Supplier> optionalSupplier = supplierRespository.findById(id);
        if (optionalSupplier.isPresent()) {
            Supplier supplier = optionalSupplier.get();
            supplier.setSupplierName(supplierDetails.getSupplierName());
            supplier.setPhoneNumber(supplierDetails.getPhoneNumber());
            supplier.setEmail(supplierDetails.getEmail());
            supplier.setAddress(supplierDetails.getAddress());
            return supplierRespository.save(supplier);
        } else {
            throw new RuntimeException("Supplier not found with ID: " + id);
        }
    }

    // Xóa nhà phân phối
    public void deleteSupplier(int id) {
        if (supplierRespository.existsById(id)) {
            supplierRespository.deleteById(id);
        } else {
            throw new RuntimeException("Supplier not found with ID: " + id);
        }
    }
}
