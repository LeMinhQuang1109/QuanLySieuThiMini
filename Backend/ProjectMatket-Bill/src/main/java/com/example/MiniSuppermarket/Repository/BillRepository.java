package com.example.MiniSuppermarket.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.MiniSuppermarket.Entity.Bill;
import java.util.List;



@Repository
public interface BillRepository extends JpaRepository<Bill,Integer> {
    Bill findByBillId(int billId);

    List<Bill> findByCustomerId(int customerId);
}
