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
import java.util.Comparator;
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
        System.out.println(content);
        content = content.substring(1, content.length() - 1);
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
        List<Message> messages3 = userservice.getSentMessages(receiver_id);
        List<Message> messages4 = userservice.getRecievedMessages(sender_id);
        List<Message> common_messages2 = messages3.stream().filter(messages4::contains).collect(Collectors.toList());
        common_messages.addAll(common_messages2);

        common_messages.sort(Comparator.comparing(Message::getMessage_id));

        return ResponseEntity.ok(common_messages);
    }

    @GetMapping(value = "/contacts/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<User>> getContactsOfUser(@PathVariable String id){
        List<Message> messages = userservice.getSentMessages(id);
        List<Message> messages2 = userservice.getRecievedMessages(id);

        List<Message> all_messages = new ArrayList<>();
        all_messages.addAll(messages);
        all_messages.addAll(messages2);

        all_messages.sort(Comparator.comparing(Message::getMessage_id));
        List<User> contacts = new ArrayList<>();
        User user = userservice.getUser(id);

        for (int i = all_messages.size() - 1; i >= 0; i--) {
            Message msg = all_messages.get(i);
            if(msg.getSender().equals(user)){
                // if it is not in the list, add it
                if(!contacts.contains(msg.getReceiver()) && msg.getReceiver() != null){
                    contacts.add(msg.getReceiver());
                }
            }
            else{
                if(!contacts.contains(msg.getSender())){
                    contacts.add(msg.getSender());
                }
            }
        }
        return ResponseEntity.ok(contacts);
    }
}
