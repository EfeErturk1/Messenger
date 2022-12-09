package com.example.cs411_proj2.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int message_id;
    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "sender_phone_no")
    @JsonIgnoreProperties({"password", "sent_messages", "received_messages", "name"})
    private User sender;
    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "receiver_phone_no")
    @JsonIgnoreProperties({"password", "sent_messages", "received_messages", "name"})
    private User receiver;
    private String content;
    private String time;
    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "groups_id")
    private Groupchat groupchat;

    public Message(User sender, User receiver, String content) {
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
    }

    public Message(User sender, User receiver, String content, Groupchat groupchat) {
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.groupchat = groupchat;
    }

}
