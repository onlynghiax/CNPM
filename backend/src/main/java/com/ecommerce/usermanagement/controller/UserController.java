package com.ecommerce.usermanagement.controller;

import com.ecommerce.usermanagement.dto.UserProfileRequest;
import com.ecommerce.usermanagement.dto.UserProfileResponse;
import com.ecommerce.usermanagement.model.User;
import com.ecommerce.usermanagement.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public UserProfileResponse getProfile(Authentication authentication) {
        // CNPM-8: Lay profile dua tren email trong JWT.
        String email = (String) authentication.getPrincipal();
        User user = userService.getUserByEmail(email);
        return UserProfileResponse.fromUser(user);
    }

    @PutMapping("/profile")
    public UserProfileResponse updateProfile(Authentication authentication,
                                             @RequestBody UserProfileRequest request) {
        // CNPM-8: Cap nhat profile cua user dang dang nhap.
        String email = (String) authentication.getPrincipal();
        User updatedUser = userService.updateProfile(email, request);
        return UserProfileResponse.fromUser(updatedUser);
    }
}
