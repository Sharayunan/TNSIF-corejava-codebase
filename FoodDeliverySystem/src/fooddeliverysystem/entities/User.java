package com.fooddeliverysystem.entities;

public class User {
    private String username;
    private String password;
    private String phone;

    public User(String username, String password, String phone) {
        this.username = username;
        this.password = password;
        this.phone = phone;
    }

    // Getters and setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    // ✅ Added: getName() for display purposes
    public String getName() {
        return username;
    }
}
