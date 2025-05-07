package com.example.login.Service;

import com.example.login.Entity.Login;
import com.example.login.Repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    
    @Autowired
    private LoginRepository loginRepository;
    
    public Login login(String username, String password) {
        Login user = loginRepository.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }
}