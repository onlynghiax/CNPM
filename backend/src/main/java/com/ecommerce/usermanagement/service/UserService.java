package com.ecommerce.usermanagement.service;

import com.ecommerce.usermanagement.dto.UserProfileRequest;
import com.ecommerce.usermanagement.model.User;
import com.ecommerce.usermanagement.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found."));
    }

    public User updateProfile(String email, UserProfileRequest request) {
        User user = getUserByEmail(email);

        // Chi cap nhat cac truong co du lieu gui len.
        if (request.getFullName() != null && !request.getFullName().isBlank()) {
            user.setFullName(request.getFullName());
        }
        if (request.getPhone() != null) {
            user.setPhone(request.getPhone());
        }
        if (request.getAddress() != null) {
            user.setAddress(request.getAddress());
        }

        return userRepository.save(user);
    }
}
