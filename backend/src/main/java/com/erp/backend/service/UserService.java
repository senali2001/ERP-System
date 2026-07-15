package com.erp.backend.service;

import com.erp.backend.dto.UserDTO;
import com.erp.backend.model.User;
import com.erp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public User createUser(UserDTO dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setFullName(dto.getFullName());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setNic(dto.getNic());
        user.setRole(dto.getRole());
        user.setPassword(dto.getPassword());
        user.setSalary(dto.getSalary());
        user.setJoinDate(dto.getJoinDate());
        user.setStatus(dto.getStatus() != null ? dto.getStatus() : "ACTIVE");
        user.setCreatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    public User updateUser(Long id, UserDTO dto) {
        User user = getUserById(id);
        if (dto.getUsername() != null) user.setUsername(dto.getUsername());
        if (dto.getFullName() != null) user.setFullName(dto.getFullName());
        if (dto.getEmail() != null) user.setEmail(dto.getEmail());
        if (dto.getPhone() != null) user.setPhone(dto.getPhone());
        if (dto.getNic() != null) user.setNic(dto.getNic());
        if (dto.getRole() != null) user.setRole(dto.getRole());
        if (dto.getSalary() != null) user.setSalary(dto.getSalary());
        if (dto.getJoinDate() != null) user.setJoinDate(dto.getJoinDate());
        if (dto.getStatus() != null) user.setStatus(dto.getStatus());
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public void resetPassword(Long id, String newPassword) {
        User user = getUserById(id);
        user.setPassword(newPassword);
        userRepository.save(user);
    }
}
