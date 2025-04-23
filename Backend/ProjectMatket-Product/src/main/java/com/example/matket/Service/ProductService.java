package com.example.matket.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.matket.Entity.Product;
import com.example.matket.Respository.ProductRespository;

@Service
public class ProductService {
    @Autowired
    private ProductRespository productRespository;

    public List<Product> getallProducts() {
        return productRespository.findAll();

    }

    public List<Product> getProductByCategory(int categoryId) {
        return productRespository.findByCategory_CategoryId(categoryId);
    }

    public List<Product> searchProduct(String productName, Integer categoryId) {
        if (productName != null && categoryId != null) {
            return productRespository.findByProductNameAndCategory_CategoryId(productName, categoryId);
        } else if (productName != null) {
            return productRespository.findByProductName(productName);
        } else if (categoryId != null) {
            return productRespository.findByCategory_CategoryId(categoryId);
        } else {
            return productRespository.findAll();
        }
    }

    public Product SaveProduct(Product product) {
        return productRespository.save(product);
    }

    public Product deleteProduct(int productId) {
        Product product = productRespository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));
        productRespository.delete(product);
        return product;
    }

    public Product updateProduct(int productId, Product productDetails) {
        Optional<Product> productOptional = productRespository.findById(productId);
        if (productOptional.isPresent()) {
            Product existingProduct = productOptional.get();

            existingProduct.setProductName(productDetails.getProductName());
            existingProduct.setCategory(productDetails.getCategory());
            existingProduct.setSupplier(productDetails.getSupplier());
            existingProduct.setPrice(productDetails.getPrice());
            existingProduct.setStockQuantity(productDetails.getStockQuantity());
            existingProduct.setNotes(productDetails.getNotes());
            existingProduct.setImportPrice(productDetails.getImportPrice());
            existingProduct.setImportDate(productDetails.getImportDate());

            return productRespository.save(existingProduct);
        } else {
            throw new RuntimeException("Không tìm thấy sản phẩm với ID: " + productId);
        }
    }

    public Optional<Product> getProductByid(int idProduct){
        return productRespository.findById(idProduct);
    }
}
