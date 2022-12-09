package com.example.cs411_proj2.controller;

import com.example.cs411_proj2.dto.MessageDTO;
import com.example.cs411_proj2.entity.Message;
import com.example.cs411_proj2.entity.User;
import com.example.cs411_proj2.service.MessageService;
import com.example.cs411_proj2.service.UserService;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/messages")
public class MessageController {
    private final MessageService msgservice;
    private final UserService userservice;

    @Autowired
    public MessageController(MessageService msgservice, UserService userservice) {
        this.msgservice = msgservice;
        this.userservice = userservice;
    }

    @GetMapping
    public ResponseEntity<List<Message>> getAll(){
        return ResponseEntity.ok(msgservice.getMessages());
    }


    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Message> getById(@PathVariable int id){
        return ResponseEntity.ok(msgservice.getMessage(id));
    }

    @PostMapping
    public ResponseEntity<?> send(@RequestBody MessageDTO msg){
        User sender = userservice.getUser(msg.getSender());
        User receiver = userservice.getUser(msg.getReceiver());
        if (sender == null || receiver == null) {
            return ResponseEntity.badRequest().body("Sender or receiver does not exist");
        }

        return ResponseEntity.ok(msgservice.sendMessage(sender, receiver, msg.getContent(), msg.getTime()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody String content){
        return ResponseEntity.ok(msgservice.updateMessage(id, content));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        msgservice.deleteMessage(id);
        return ResponseEntity.ok("Message deleted");
    }

    @GetMapping(value = "/from/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Message>> getSentMessagesOfUser(@PathVariable String id){
        return ResponseEntity.ok(userservice.getSentMessages(id));
    }

    @GetMapping(value = "/to/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Message>> getRecievedMessagesOfUser(@PathVariable String id){
        return ResponseEntity.ok(userservice.getRecievedMessages(id));
    }

    @GetMapping(value = "/from/{sender_id}/to/{receiver_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Message>> getBySenderAndReceiver(@PathVariable String sender_id, @PathVariable String receiver_id){
        List<Message> messages = userservice.getSentMessages(sender_id);
        List<Message> messages2 = userservice.getRecievedMessages(receiver_id);
        List<Message> common_messages = messages.stream().filter(messages2::contains).collect(Collectors.toList());

        return ResponseEntity.ok(common_messages);
    }
}
