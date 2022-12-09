package com.example.cs411_proj2.repository;

import com.example.cs411_proj2.entity.Groupchat;
import org.springframework.data.repository.CrudRepository;

public interface GroupRepository extends CrudRepository<Groupchat, Integer> {
    Groupchat findGroupByGroupId(Integer id);
    void deleteGroupByGroupId(Integer id);
}
