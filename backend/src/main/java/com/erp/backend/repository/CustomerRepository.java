package com.erp.backend.repository;

import com.erp.backend.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByPhone(String phone);

    boolean existsByPhone(String phone);

    List<Customer> findTop10ByOrderByTotalSpendingDesc();

    @Query("SELECT COUNT(c) FROM Customer c WHERE c.membershipLevel = 'SILVER'")
    long countSilverMembers();

    @Query("SELECT COUNT(c) FROM Customer c WHERE c.membershipLevel = 'GOLD'")
    long countGoldMembers();

    @Query("SELECT COUNT(c) FROM Customer c WHERE c.registrationDate >= CURRENT_DATE")
    long countNewToday();

    @Query("SELECT COUNT(c) FROM Customer c WHERE c.totalOrders > 1")
    long countReturning();
}
