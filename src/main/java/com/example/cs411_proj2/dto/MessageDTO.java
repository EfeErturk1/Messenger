package com.example.cs411_proj2.dto;

import com.example.cs411_proj2.entity.Groupchat;
import com.example.cs411_proj2.entity.User;
import lombok.*;

@AllArgsConstructor
@Builder
@Getter
@Setter
public class MessageDTO {
    @NonNull
    private String sender;
    private String receiver;
    private Groupchat groupchat;
    private String content;
    private String time;
}
