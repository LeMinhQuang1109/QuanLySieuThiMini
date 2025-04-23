package com.example.MiniSuppermarket.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "bill")
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int billId;
    private int customerId;
    private int totalBill;
    private String day;
    public int getbillId() {
        return billId;
    }
    public void setCbillId(int billId) {
        this.billId = billId;
    }
    public int getCustomerId() {
        return customerId;
    }
    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }
    public int getTotalBill() {
        return totalBill;
    }
    public void setTotalBill(int totalBill) {
        this.totalBill = totalBill;
    }
    public String getDay() {
        return day;
    }
    public void setDay(String day) {
        this.day = day;
    }

}
