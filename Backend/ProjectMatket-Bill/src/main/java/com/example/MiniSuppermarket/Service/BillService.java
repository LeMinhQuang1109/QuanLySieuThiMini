package com.example.MiniSuppermarket.Service;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.MiniSuppermarket.DTO.BillRequest;
import com.example.MiniSuppermarket.Entity.Bill;
import com.example.MiniSuppermarket.Entity.BillDetail;
import com.example.MiniSuppermarket.Repository.BillDetailRepository;
import com.example.MiniSuppermarket.Repository.BillRepository;

@Service
public class BillService {

    @Autowired
    private BillDetailRepository billDetailRepository;
    @Autowired
    private BillRepository billRepository;

    public Bill saveBill(Bill bill) {
        return billRepository.save(bill);
    }

    public void saveAllBillDetail(List<BillRequest> billRequests) {
        List<BillDetail> billDetails = new ArrayList<>();
        Bill bill = billRepository.findByBillId(billRequests.get(0).getBillId());

        for (BillRequest billRequest : billRequests) {
            BillDetail billDetail = new BillDetail();
            billDetail.setBill(bill);
            billDetail.setQuantity(billRequest.getQuantity());
            billDetail.setProductId(billRequest.getProductId());
            billDetails.add(billDetail);
        }
        billDetailRepository.saveAll(billDetails);
    }

    public List<BillDetail> getBillDetailsByBillId(int billId) {
        return billDetailRepository.findByBill(billRepository.findByBillId(billId));
    }

    public List<Bill> getBills(int customerId) {
        return billRepository.findByCustomerId(customerId);
    }

    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    // Thống kê
    public List<Double> getMonthlyRevenue(int year) {
        List<Double> monthlyRevenue = new ArrayList<>(Collections.nCopies(12, 0.0));
        DateTimeFormatter formatter = DateTimeFormatter.RFC_1123_DATE_TIME;

        List<Bill> allBills = billRepository.findAll();
        for (Bill bill : allBills) {
            try {
                ZonedDateTime billDate = ZonedDateTime.parse(bill.getDay(), formatter);
                if (billDate.getYear() == year) {
                    int month = billDate.getMonthValue() - 1; // Chuyển về index 0-11
                    monthlyRevenue.set(month, monthlyRevenue.get(month) + bill.getTotalBill());
                }
            } catch (Exception e) {
                // Bỏ qua các bill có ngày không hợp lệ
            }
        }

        return monthlyRevenue;
    }

}
