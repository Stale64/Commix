package com.commix.server.controller;

import com.commix.server.model.common.MessageModel;
import com.commix.server.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ChatService chatService;

    @MessageMapping("chat/private")
    public void sendMessageToUser(@Payload MessageModel messageModel) {
        messagingTemplate.convertAndSendToUser(
                messageModel.getReceiver(),   // 👈 USED HERE
                "/queue/private",
                messageModel
        );
        chatService.addMessage(messageModel);
    }
}
