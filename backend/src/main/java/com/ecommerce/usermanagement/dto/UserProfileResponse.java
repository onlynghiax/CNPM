package com.ecommerce.usermanagement.dto;

import com.ecommerce.usermanagement.model.User;

public class UserProfileResponse {
    private String fullName;
    private String email;
    private String phone;
    private String address;

    public static UserProfileResponse fromUser(User user) {
        UserProfileResponse response = new UserProfileResponse();
        response.fullName = user.getFullName();
        response.email = user.getEmail();
        response.phone = user.getPhone();
        response.address = user.getAddress();
        return response;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }
}
