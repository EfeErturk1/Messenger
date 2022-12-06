package com.example.cs411_proj2.repository;

import com.example.cs411_proj2.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, String> {
}
