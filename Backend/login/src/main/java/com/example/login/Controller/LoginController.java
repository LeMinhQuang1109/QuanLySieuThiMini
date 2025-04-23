package com.example.login.Controller;

import com.example.login.Entity.Login;
import com.example.login.Service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "http://localhost:4200", 
           allowedHeaders = "*", 
           allowCredentials = "true", 
           methods = {RequestMethod.GET, RequestMethod.POST,
                     RequestMethod.PUT, RequestMethod.DELETE})
public class LoginController {
    
    @Autowired
    private LoginService loginService;

    @PostMapping("/authenticate")
    public Login authenticate(@RequestParam String username, 
                            @RequestParam String password) {
        return loginService.login(username, password);
    }
}