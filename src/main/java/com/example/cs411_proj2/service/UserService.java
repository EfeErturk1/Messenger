package com.example.cs411_proj2.service;

import com.example.cs411_proj2.entity.Message;
import com.example.cs411_proj2.entity.User;
import com.example.cs411_proj2.repository.UserRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepo repo;

    public UserService(UserRepo repo) {
        this.repo = repo;
    }

    public User register(String phone_no, String name, String password) {
        return repo.save(new User(phone_no, name, password));
    }

    public User login(String phone_no, String password) {
        User user = repo.findById(phone_no).orElse(null);
        if (user == null) {
            return null;
        }
        if (user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    public User getUser(String phone_no) {
        return repo.findById(phone_no).orElse(null);
    }

    public List<User> getUsers() {
        return repo.findAll();
    }

    public User update(String phone_no, String name, String password) {
        User user = repo.findById(phone_no).orElse(null);
        if (user != null) {
            user.setName(name);
            user.setPassword(password);
            return repo.save(user);
        }
        return null;
    }

    public void delete(String phone_no) {
        repo.deleteById(phone_no);
    }

    public boolean exists(String phone_no) {
        return repo.existsById(phone_no);
    }

    public List<Message> getRecievedMessages(String phone_no){
        User user = repo.findById(phone_no).orElse(null);
        if (user != null) {
            return user.getRecieved_messages();
        }
        return null;
    }

    public List<Message> getSentMessages(String phone_no){
        User user = repo.findById(phone_no).orElse(null);
        if (user != null) {
            return user.getSent_messages();
        }
        return null;
    }
}
