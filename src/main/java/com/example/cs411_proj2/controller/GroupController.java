package com.example.cs411_proj2.controller;

import com.example.cs411_proj2.dto.GroupRequest;
import com.example.cs411_proj2.dto.GroupResponse;
import com.example.cs411_proj2.dto.MessageDTO;
import com.example.cs411_proj2.entity.Groupchat;
import com.example.cs411_proj2.entity.Message;
import com.example.cs411_proj2.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/groups")
@RequiredArgsConstructor
public class GroupController {
    private final GroupService groupService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void createGroup(@RequestBody GroupRequest groupRequest) {
        groupService.createGroup(groupRequest);
    }

    @GetMapping("/get-all")
    @ResponseStatus(HttpStatus.OK)
    public List<GroupResponse> getAllGroups() {
        return groupService.getAllGroups();
    }

    @GetMapping("/get")
    @ResponseStatus(HttpStatus.OK)
    public GroupResponse getGroupById(@RequestParam("id") Integer id) {
        return groupService.getGroupById(id);
    }

    @PostMapping("/delete")
    @ResponseStatus(HttpStatus.OK)
    public void deleteGroup(@RequestParam("id") Integer id) {
        groupService.deleteGroup(id);
    }

    @PostMapping("/send-message")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void sendMessage(@RequestParam("id") Integer id,
                            @RequestBody MessageDTO messageRequest) {

        groupService.sendMessage(id, messageRequest);
    }

    @PostMapping("/add-participant")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void addParticipant(@RequestParam("group-id") Integer groupId,
                               @RequestParam("phone-number")  String phoneNumber) {
        groupService.addParticipant(groupId, phoneNumber);
    }

    @PostMapping("/remove-participant")
    public void removeParticipant(@RequestParam("group-id") Integer groupId,
                                  @RequestParam("phone-number") String phoneNumber) {
        groupService.removeParticipant(groupId, phoneNumber);
    }

    @GetMapping(value = "/messages/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Message>> getGroupsById(@PathVariable Integer id){
        return ResponseEntity.ok(groupService.getGroupById(id).getMessages());
    }

}
