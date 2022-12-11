package com.example.cs411_proj2.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String phone_no;
    @NonNull
    private String name;
    @NonNull
    private String password;
    @OneToMany(mappedBy = "sender", cascade = {CascadeType.ALL})
    @JsonIgnore
    private List<Message> sent_messages;
    @OneToMany(mappedBy = "receiver", cascade = {CascadeType.ALL})
    @JsonIgnore
    private List<Message> received_messages;
    @ManyToMany(mappedBy = "participants")
    @JsonIgnore
    private List<Groupchat> groupchats;

    public User(String phone_no, String name, String password) {
        this.phone_no = phone_no;
        this.name = name;
        this.password = password;
    }

    public User(String phone_no, String name, String password, List<Groupchat> groupchats) {
        this.phone_no = phone_no;
        this.name = name;
        this.password = password;
        this.groupchats = groupchats;
    }

}
