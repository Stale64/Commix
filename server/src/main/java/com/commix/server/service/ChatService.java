package com.commix.server.service;

import com.commix.server.model.common.MessageModel;
import com.commix.server.model.data.ChatModel;
import com.commix.server.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    private String getHash(String a, String b) {
        String hashString = a + b;
        char[] chars = hashString.toCharArray();
        Arrays.sort(chars);
        String sortedHash = new String(chars);
        return passwordEncoder.encode(sortedHash);
    }

    public void addMessage(MessageModel messageModel) {
        String chatHash = getHash(messageModel.getSender(), messageModel.getReceiver());
        ChatModel chatModel = new ChatModel();
        chatModel.setChatHash(chatHash);
        chatModel.setSender(messageModel.getSender());
        chatModel.setMessage(messageModel.getMessage());
        chatModel.setTimestamp(messageModel.getTimestamp());
        chatRepository.save(chatModel);
    }


    public List<ChatModel> getAllContactMessages(String username, String contact) {
        String chatHash = getHash(username, contact);
        return chatRepository.findChatModelsByChatHash(chatHash);
    }
}
