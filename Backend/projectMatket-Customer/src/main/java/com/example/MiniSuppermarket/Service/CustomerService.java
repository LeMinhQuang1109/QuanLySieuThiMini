package com.example.MiniSuppermarket.Service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.MiniSuppermarket.Entity.Customer;
import com.example.MiniSuppermarket.Repository.CustomerRepository;



@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public Customer getCustomer(String phone) {
        Optional<Customer> Customeropt = customerRepository.findByPhone(phone);
        if (Customeropt.isPresent()) {
            return Customeropt.get();
        }
        throw new RuntimeException("phone not phone");
    }

    public boolean checkCustomer(String phone) {
        Optional<Customer> Customeropt = customerRepository.findByPhone(phone);
        return Customeropt.isPresent();
    }

    public Customer UpdatePointCustomer(int id, Customer customer) {
        Customer customerOpt = customerRepository.findBycustomerId(id);

        customerOpt.setPoint(customer.getPoint());
        return customerRepository.save(customerOpt);
    }

    public Customer getCustomerByid(int idcustomer){
        Customer customerOpt = customerRepository.findBycustomerId(idcustomer);
        return customerOpt;
    }

    //CRUD
    // Lấy danh sách tất cả danh mục
    public List<Customer> getallCustomers() {
        return customerRepository.findAll();
    }

    public Customer updateCustomer(int customerId, Customer customer) {
        Optional<Customer> existingCustomer = customerRepository.findById(customerId);
        if (existingCustomer.isPresent()) {
            Customer customerToUpdate = existingCustomer.get();
            customerToUpdate.setName(customer.getName());
            customerToUpdate.setPhone(customer.getPhone());
            customerToUpdate.setPoint(customer.getPoint());
            return customerRepository.save(customerToUpdate);
        }
        throw new RuntimeException("Không tìm thấy khách hàng với ID: " + customerId);
    }

    public boolean deleteCustomer(int customerId) {
        Optional<Customer> existingCustomer = customerRepository.findById(customerId);
        if (existingCustomer.isPresent()) {
            customerRepository.deleteById(customerId);
            return true;
        }
        return false;
    } 
}
