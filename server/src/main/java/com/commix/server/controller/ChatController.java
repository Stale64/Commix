package com.commix.server.controller;

import com.commix.server.dto.MessageDTO;
import com.commix.server.model.MessageModel;
import com.commix.server.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ChatService chatService;

    @MessageMapping("/chat/private")
    public void sendMessageToUser(@Payload MessageDTO messageModel) {
        messagingTemplate.convertAndSendToUser(
                messageModel.getReceiver(),   // 👈 USED HERE
                "/queue/private",
                messageModel
        );
        chatService.addMessage(messageModel);
    }

    @GetMapping("/chat")
    public ResponseEntity<List<MessageModel>> getAllMessages(@RequestParam String username, @RequestParam String contact) {
        List<MessageModel> messages = chatService.getAllContactMessages(username, contact);
        return ResponseEntity.ok(messages);
    }
}
