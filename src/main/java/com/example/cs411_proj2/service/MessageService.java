package com.example.cs411_proj2.service;

import com.example.cs411_proj2.entity.Message;
import com.example.cs411_proj2.entity.User;
import com.example.cs411_proj2.repository.MessageRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    private final MessageRepo repo;

    public MessageService(MessageRepo repo) {
        this.repo = repo;
    }

    public Message sendMessage(User sender, User receiver, String content, String time) {

        return repo.save(new Message(sender, receiver, content, time));
    }

    public Message getMessage(int message_id) {
        return repo.findById(message_id).orElse(null);
    }

    public void deleteMessage(int message_id) {
        repo.deleteById(message_id);
    }

    public boolean exists(int message_id) {
        return repo.existsById(message_id);
    }

    public Message updateMessage(int message_id, String content) {
        Message message = repo.findById(message_id).orElse(null);
        if (message != null) {
            message.setContent(content);
            message.setEdited(Boolean.TRUE);
            return repo.save(message);
        }
        return null;
    }

    public List<Message> getMessages() {
        return repo.findAll();
    }
}
