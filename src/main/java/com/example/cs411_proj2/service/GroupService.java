package com.example.cs411_proj2.service;

import com.example.cs411_proj2.dto.GroupRequest;
import com.example.cs411_proj2.dto.GroupResponse;
import com.example.cs411_proj2.dto.MessageDTO;
import com.example.cs411_proj2.entity.Groupchat;
import com.example.cs411_proj2.entity.Message;
import com.example.cs411_proj2.entity.User;
import com.example.cs411_proj2.repository.GroupRepository;
import com.example.cs411_proj2.repository.MessageRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class GroupService {
    private final GroupRepository groupRepository;
    private final UserService userService;

    private final MessageRepo messageRepository;

    public void createGroup(GroupRequest groupRequest) {
        List<User> participants = new ArrayList<>();
        List<User> p = groupRequest.getParticipants();
        for (int i = 0; i < p.size(); i++) {
            participants.add( userService.getUser(p.get(i).getPhone_no()));
        }

        Groupchat groupchat = Groupchat.builder()
                .name(groupRequest.getName())
                .participants(participants)
                .messages(groupRequest.getMessages())
                .build();
        groupRepository.save(groupchat);
        log.info("Group {} is saved", groupchat.getGroupId());
    }

    public List<GroupResponse> getAllGroups() {
        List<Groupchat> groupchats = (List<Groupchat>) groupRepository.findAll();
        log.info("Queried all groups");
        return groupchats.stream().map(this::mapGroupToResponse).collect(Collectors.toList());
    }

    private GroupResponse mapGroupToResponse(Groupchat groupchat) {
        return GroupResponse.builder()
                .id(groupchat.getGroupId())
                .name(groupchat.getName())
                .participants(groupchat.getParticipants())
                .messages(groupchat.getMessages())
                .build();
    }

    public GroupResponse getGroupById(Integer id) {
        Groupchat groupchat = groupRepository.findGroupByGroupId(id);
        log.info("Group {} is found", groupchat.getGroupId());
        return mapGroupToResponse(groupchat);
    }

    public void deleteGroup(Integer id) {
        groupRepository.deleteGroupByGroupId(id);
        log.info("Group {} is deleted", id);
    }

    public void sendMessage(Integer id, MessageDTO messageRequest) {
        Groupchat groupchat = groupRepository.findGroupByGroupId(id);
        Message message = mapRequestToMessage(messageRequest);
        message.setGroupchat(groupchat);

        List<Message> messages = groupchat.getMessages();
        messages.add(message);
        groupchat.setMessages(messages);

        messageRepository.save(message);

        log.info("Message {} is added to group {}", message.getMessage_id(), groupchat.getGroupId());
    }

    private Message mapRequestToMessage(MessageDTO messageRequest) {
        return Message.builder()
                .sender(userService.getUser(messageRequest.getSender()))
                .groupchat(messageRequest.getGroupchat())
                .content(messageRequest.getContent())
                .time(messageRequest.getTime())
                .build();
    }

    public void addParticipant(Integer groupId, String phoneNumber) {
        Groupchat groupchat = groupRepository.findGroupByGroupId(groupId);
        User user = userService.getUser(phoneNumber);

        List<User> participants = groupchat.getParticipants();
        participants.add(user);
        groupchat.setParticipants(participants);

        log.info("User {} is added to group {}", user.getPhone_no(), groupchat.getGroupId());
    }

    public void removeParticipant(Integer groupId, String phoneNumber) {
        Groupchat groupchat = groupRepository.findGroupByGroupId(groupId);
        User user = userService.getUser(phoneNumber);

        List<User> participants = groupchat.getParticipants();
        participants.remove(user);
        groupchat.setParticipants(participants);

        log.info("User {} is removed from the group {}", user.getPhone_no(), groupchat.getGroupId());
    }
}
