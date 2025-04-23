package com.example.MiniSuppermarket.Service;

import java.util.ArrayList;
// import java.util.ArrayList;
import java.util.List;

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
}
