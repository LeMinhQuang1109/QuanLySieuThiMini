package com.example.matket.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.matket.Entity.Supplier;
import com.example.matket.Service.SupplierService;

@RestController
@RequestMapping("/api/product")
@CrossOrigin(origins = { "http://localhost:4200",
        "http://192.168.0.107:4200" }, allowedHeaders = "*", allowCredentials = "true", methods = {
                RequestMethod.GET, RequestMethod.POST,
                RequestMethod.PUT, RequestMethod.DELETE })
public class SupplierController {
    @Autowired
    private SupplierService supplierService;

    // Lấy tất cả nhà phân phối
    @GetMapping("/get/supplier")
    public ResponseEntity<List<Supplier>> getallSupplier() {
        List<Supplier> suppliers = supplierService.getAllSupplier();
        return ResponseEntity.ok(suppliers);
    }

    // Thêm mới nhà phân phối
    @PostMapping("/savesupplier")
    public Supplier addSupplier(@RequestBody Supplier supplier) {
        return supplierService.addSupplier(supplier);
    }

    // Cập nhật nhà phân phối
    @PutMapping("/updateSupplier/{id}")
    public Supplier updateSupplier(@PathVariable int id, @RequestBody Supplier supplierDetails) {
        return supplierService.updateSupplier(id, supplierDetails);
    }

    // Xóa nhà phân phối
    @DeleteMapping("/deleteSupplier/{id}")
    public ResponseEntity<Map<String, String>> deleteSupplier(@PathVariable int id) {
        supplierService.deleteSupplier(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Xóa thành công");
        return ResponseEntity.ok(response);
    }
}
