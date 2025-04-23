package com.example.MiniSuppermarket.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.MiniSuppermarket.Entity.Bill;
import com.example.MiniSuppermarket.Entity.BillDetail;
import java.util.List;


@Repository
public interface BillDetailRepository extends JpaRepository<BillDetail,Integer> {
    List<BillDetail> findByBill(Bill bill);

    
}
