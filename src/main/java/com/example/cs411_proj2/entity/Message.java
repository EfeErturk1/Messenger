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
    @JsonIgnoreProperties({"password", "sent_messages", "received_messages"})
    private User sender;
    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "receiver_phone_no")
    @JsonIgnoreProperties({"password", "sent_messages", "received_messages", "name"})
    private User receiver;
    private String content;
    private String time;
    private Boolean edited;
    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "groups_id")
    @JsonIgnoreProperties({"participants", "messages"})
    private Groupchat groupchat;

    public Message(User sender, User receiver, String content, String time) {
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.time = time;
        this.edited = false;
    }

    public Message(User sender, User receiver, String content, Groupchat groupchat, String time) {
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.groupchat = groupchat;
        this.time = time;
        this.edited = false;
    }

}
