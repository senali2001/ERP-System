package com.erp.backend.repository;

import com.erp.backend.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryRepository extends JpaRepository<InventoryItem, Long> {

    List<InventoryItem> findByItemNameContainingIgnoreCase(String keyword);

    List<InventoryItem> findByCategoryContainingIgnoreCase(String category);
}
