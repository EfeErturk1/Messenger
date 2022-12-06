package com.example.cs411_proj2.repository;

import com.example.cs411_proj2.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepo extends JpaRepository<Message, Integer> {
}
