package com.example.cs411_proj2.dto;

import com.example.cs411_proj2.entity.Message;
import com.example.cs411_proj2.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GroupResponse {
    private Integer id;
    private String name;
    @JsonIgnoreProperties({"password", "name", "sent_messages", "received_messages"})
    private List<User> participants;
    @JsonIgnoreProperties({"sender", "receiver", "content", "time"})
    private List<Message> messages;
}
