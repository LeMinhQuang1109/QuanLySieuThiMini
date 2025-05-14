package com.example.MiniSuppermarket.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.example.MiniSuppermarket.DTO.BillRequest;
import com.example.MiniSuppermarket.Entity.Bill;
import com.example.MiniSuppermarket.Entity.BillDetail;
import com.example.MiniSuppermarket.Service.BillService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@CrossOrigin("http://localhost:4200/")
public class BillController {
    @Autowired
    private BillService billService;

    @PostMapping("/saveBill")
    public Bill saveBill(@RequestBody Bill bill) {
        if (bill.getPaymentMethod() == null) {
            bill.setPaymentMethod("cash");
        }
        return billService.saveBill(bill);
    }

    @PostMapping("/saveAllBillDetail")
    public void saveAllBillDetail(@RequestBody List<BillRequest> billRequests) {
        billService.saveAllBillDetail(billRequests);
    }

    @PostMapping("/getBillDetailByBillId")
    public List<BillDetail> getBillDetailByBillId(@RequestBody BillRequest billRequest) {
        return billService.getBillDetailsByBillId(billRequest.getBillId());
    }

    @PostMapping("/getBillByCustomerId")
    public List<Bill> getBillByCustomerId(@RequestBody Bill bill) {
        return billService.getBills(bill.getCustomerId());
    }

    @GetMapping("/getAllBills")
    public List<Bill> getAllBills() {
        return billService.getAllBills();
    }

    // Thống kê
    @GetMapping("/revenue/monthly")
    public List<Double> getMonthlyRevenue(@RequestParam int year) {
        return billService.getMonthlyRevenue(year);
    }
}
