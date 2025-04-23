package com.example.MiniSuppermarket.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.example.MiniSuppermarket.Entity.Customer;
import com.example.MiniSuppermarket.Service.CustomerService;
import org.springframework.web.bind.annotation.RequestMethod;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(origins = { "http://localhost:4200" }, allowedHeaders = "*", allowCredentials = "true", methods = {
        RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @PostMapping("/saveCustomer")
    public Customer saveCustomer(@RequestBody Customer customer) {
        return customerService.saveCustomer(customer);
    }

    @PostMapping("/getCustomer")
    public Customer getCustomer(@RequestBody Customer customer) {
        return customerService.getCustomer(customer.getPhone());
    }

    @PostMapping("/checkcustomer")
    public boolean checkCustomer(@RequestBody Customer customer) {
        System.out.println("Dữ liệu nhận được: " + customer.getPhone());
        boolean checkCustomer = customerService.checkCustomer(customer.getPhone());
        return checkCustomer;
    }

    @PutMapping("/updatepoint/{idCustomer}")
    private ResponseEntity<Customer> UpdatePointCustomer(@PathVariable int idCustomer, @RequestBody Customer customer) {
        Customer updatedCustomer = customerService.UpdatePointCustomer(idCustomer, customer);
        return ResponseEntity.ok(updatedCustomer);
    }

    @GetMapping("/getCustomer/{idCustomer}")
    private ResponseEntity<Customer> getCustomer(@PathVariable int idCustomer) {
        Customer getCustomer = customerService.getCustomerByid(idCustomer);
        return ResponseEntity.ok(getCustomer);
    }

    // CRUD
    @GetMapping("/get/customer")
    public ResponseEntity<List<Customer>> getallCustomer() {
        List<Customer> customers = customerService.getallCustomers();
        return ResponseEntity.ok(customers);
    }

    @PostMapping("/update/{customerId}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable int customerId, @RequestBody Customer customer) {
        Customer updatedCustomer = customerService.updateCustomer(customerId, customer);
        return ResponseEntity.ok(updatedCustomer);
    }

    @DeleteMapping("/delete/{customerId}")
    public ResponseEntity<Map<String,String>> deleteCustomer(@PathVariable int customerId) {
        boolean isDeleted = customerService.deleteCustomer(customerId);
        Map<String,String> res = new HashMap<>();
        res.put("message", "xóa thành công");
        if (isDeleted) {
            return ResponseEntity.ok(res);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

}

