package com.erp.backend.service;

import com.erp.backend.model.Customer;
import com.erp.backend.repository.CustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public List<Customer> getTop10Customers() {
        return customerRepository.findTop10ByOrderByTotalSpendingDesc();
    }

    public Optional<Customer> findByPhone(String phone) {
        return customerRepository.findByPhone(phone);
    }

    public Customer createCustomer(Customer customer) {
        if (customer.getPhone() != null && customerRepository.existsByPhone(customer.getPhone())) {
            throw new IllegalArgumentException("Customer with phone " + customer.getPhone() + " already exists.");
        }
        return customerRepository.save(customer);
    }

    public Customer updateCustomer(Long id, Customer updated) {
        Customer existing = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found: " + id));
        existing.setName(updated.getName());
        existing.setPhone(updated.getPhone());
        existing.setEmail(updated.getEmail());
        existing.setAddress(updated.getAddress());
        existing.setBirthday(updated.getBirthday());
        return customerRepository.save(existing);
    }

    @Transactional
    public Customer addPointsAfterPurchase(Long customerId, double purchaseAmount) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found: " + customerId));
        customer.addPointsForPurchase(purchaseAmount);
        return customerRepository.save(customer);
    }

    public long getTotalCount()    { return customerRepository.count(); }
    public long getSilverCount()   { return customerRepository.countSilverMembers(); }
    public long getGoldCount()     { return customerRepository.countGoldMembers(); }
    public long getNewToday()      { return customerRepository.countNewToday(); }
    public long getReturningCount(){ return customerRepository.countReturning(); }
}
