package com.example.matket.Controller;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.matket.Entity.Product;
import com.example.matket.Service.ProductService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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

public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/get/product")
    public ResponseEntity<List<Product>> getProduct() {
        List<Product> Productall = productService.getallProducts();
        return ResponseEntity.ok(Productall);
    }

    @GetMapping("/get/product/{categoryId}")
    public ResponseEntity<List<Product>> getProductByCategory(@PathVariable int categoryId) {
        List<Product> Productall = productService.getProductByCategory(categoryId);
        return ResponseEntity.ok(Productall);
    }

    @GetMapping("/search/product")
    public List<Product> searchProduct(
            @RequestParam(required = false) String productName,
            @RequestParam(required = false) Integer categoryId) {
        return productService.searchProduct(productName, categoryId);
    }

    @PostMapping("/saveproduct")
    public ResponseEntity<Product> SaveProduct(@RequestBody Product product) {
        Product products = productService.SaveProduct(product);
        return ResponseEntity.ok(products);
    }

    @DeleteMapping("/delete/{idproduct}")
    public ResponseEntity<Map<String, String>> deleteProduct(@PathVariable int idproduct) {
        productService.deleteProduct(idproduct);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Xóa thành công");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/update/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable int productId, @RequestBody Product productDetails) {
        Product updatedProduct = productService.updateProduct(productId, productDetails);
        return ResponseEntity.ok(updatedProduct);
    }

    @GetMapping("/getproductByid/{idproduct}")
    public Optional<Product> getProductByid(@PathVariable int idproduct){
        Optional<Product> getProductByid = productService.getProductByid(idproduct);
        if(getProductByid.isPresent()){
            return getProductByid;
        }
        return null;
    }

}
