package com.erp.backend.service;

import com.erp.backend.dto.InventoryRequest;
import com.erp.backend.model.InventoryItem;
import com.erp.backend.repository.InventoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public InventoryItem createItem(InventoryRequest request) {
        InventoryItem item = new InventoryItem();
        item.setItemName(request.getItemName());
        item.setCategory(request.getCategory());
        item.setStockQuantity(request.getStockQuantity());
        item.setMinimumStockLevel(request.getMinimumStockLevel());
        item.setBuyingPrice(request.getBuyingPrice());
        item.setSellingPrice(request.getSellingPrice());
        item.setUnitType(request.getUnitType());
        item.setLocation(request.getLocation());

        return inventoryRepository.save(item);
    }

    public List<InventoryItem> getAllItems() {
        return inventoryRepository.findAll();
    }

    public Optional<InventoryItem> getItemById(Long id) {
        return inventoryRepository.findById(id);
    }

    public InventoryItem updateItem(Long id, InventoryRequest request) {
        InventoryItem item = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory item not found"));

        item.setItemName(request.getItemName());
        item.setCategory(request.getCategory());
        item.setStockQuantity(request.getStockQuantity());
        item.setMinimumStockLevel(request.getMinimumStockLevel());
        item.setBuyingPrice(request.getBuyingPrice());
        item.setSellingPrice(request.getSellingPrice());
        item.setUnitType(request.getUnitType());
        item.setLocation(request.getLocation());

        return inventoryRepository.save(item);
    }

    public void deleteItem(Long id) {
        if (!inventoryRepository.existsById(id)) {
            throw new RuntimeException("Inventory item not found");
        }
        inventoryRepository.deleteById(id);
    }

    public List<InventoryItem> searchItems(String keyword) {
        if (keyword == null || keyword.isBlank()) {
            return inventoryRepository.findAll();
        }
        return inventoryRepository.findByItemNameContainingIgnoreCase(keyword);
    }

    public InventoryItem updateStock(Long id, Double newQuantity) {
        InventoryItem item = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory item not found"));

        item.setStockQuantity(newQuantity);
        return inventoryRepository.save(item);
    }
}
