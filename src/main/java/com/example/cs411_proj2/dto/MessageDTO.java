package com.example.cs411_proj2.dto;

import com.example.cs411_proj2.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class MessageDTO {

    @NonNull
    private String sender;
    @NonNull
    private String receiver;
    private String content;
    private String time;
}
