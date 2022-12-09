package com.example.cs411_proj2.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Groupchat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer groupId;
    @NonNull
    private String name;
    @ManyToMany(cascade={CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name="participant_phone_numbers")
    @JsonIgnoreProperties({"password", "name", "sent_messages", "received_messages"})
    @NonNull
    @ToString.Exclude
    private List<User> participants;
    @OneToMany(cascade={CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name="message_ids")
    @JsonIgnoreProperties({"sender", "receiver", "content", "time"})
    @ToString.Exclude
    private List<Message> messages;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Groupchat groupchat = (Groupchat) o;
        return groupId != null && Objects.equals(groupId, groupchat.groupId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
