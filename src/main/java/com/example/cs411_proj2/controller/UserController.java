package com.example.cs411_proj2.controller;

import com.example.cs411_proj2.entity.User;
import com.example.cs411_proj2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService service;

    @Autowired
    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAll(){
        return ResponseEntity.ok(service.getUsers());
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> getById(@PathVariable String id){
        return ResponseEntity.ok(service.getUser(id));
    }

    @PostMapping
    public ResponseEntity<?> add(@RequestBody User user){
        System.out.println("here");
        return ResponseEntity.ok(service.register(user.getPhone_no(), user.getName(), user.getPassword()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody User user){
        return ResponseEntity.ok(service.update(id, user.getName(), user.getPassword()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.ok("User deleted");
    }

    @CrossOrigin
    @PostMapping("/login/{id}")
    public ResponseEntity<?> login(@PathVariable String id, @RequestBody String password){
        User user = service.login(id, password);
        if (user == null) {
            return ResponseEntity.badRequest().body("Wrong password");
        }
        return ResponseEntity.ok(user);
    }
}
