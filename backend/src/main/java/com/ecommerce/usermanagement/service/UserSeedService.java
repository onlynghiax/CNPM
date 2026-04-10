package com.ecommerce.usermanagement.service;

import com.ecommerce.usermanagement.model.User;
import com.ecommerce.usermanagement.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserSeedService implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserSeedService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        seedAdmin();
        seedUser();
    }

    private void seedAdmin() {
        String adminEmail = "admin@badgenius.com";
        if (!userRepository.existsByEmail(adminEmail)) {
            User admin = new User();
            admin.setFullName("BadGenius Administrator");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println("SEED: Created default ADMIN account (admin@badgenius.com)");
        } else {
            System.out.println("SEED: Admin account already exists.");
        }
    }

    private void seedUser() {
        String userEmail = "user@badgenius.com";
        if (!userRepository.existsByEmail(userEmail)) {
            User user = new User();
            user.setFullName("Generic User");
            user.setEmail(userEmail);
            user.setPassword(passwordEncoder.encode("user123"));
            user.setRole("USER");
            userRepository.save(user);
            System.out.println("SEED: Created default USER account (user@badgenius.com)");
        } else {
            System.out.println("SEED: User account already exists.");
        }
    }
}
